import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [dbStatus, setDbStatus] = useState('Checking database connection...');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('status_checks').select('id').limit(1);
        if (error) {
          setDbStatus(`Database connection issue: ${error.message}`);
        } else {
          setDbStatus('✅ Database connected');
        }
      } catch (err) {
        setDbStatus(`Database connection failed: ${err.message}`);
      }
    };
    checkConnection();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      toast.error('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    // Clear any previous session info to start fresh
    try {
      const { data: { session: existingSession } } = await supabase.auth.getSession();
      if (existingSession) {
        toast.info('You are already signed in. Redirecting...');
        navigate('/flowers');
        return;
      }
    } catch (e) {
      console.warn('Silent session check failed');
    }

    try {
      const result = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (result.error) {
        console.error('Supabase Auth Error:', result.error);

        // This is a known browser/Supabase sync issue
        if (result.error.message && result.error.message.includes('body stream')) {
          toast.loading('Syncing session, please wait...');

          // Wait and check session multiple times
          for (let i = 0; i < 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
              const { data: profile } = await supabase.from('user_profiles').select('role').eq('id', session.user.id).single();
              if (profile?.role === 'admin') {
                await supabase.auth.signOut();
                toast.dismiss();
                toast.error('Admin accounts must log in via the Admin portal.');
                setIsLoading(false);
                return;
              }
              toast.dismiss();
              toast.success('Login confirmed! Welcome.');
              navigate('/flowers');
              return;
            }
          }

          toast.dismiss();
          toast.info('Completing login, please wait...');
          setTimeout(() => window.location.reload(), 1000);
          return;
        }

        toast.error(result.error.message || 'Failed to login');
        setIsLoading(false);
        return;
      }

      if (result.data?.user) {
        // Small delay to ensure session is fully established in the client
        await new Promise(resolve => setTimeout(resolve, 300));

        // Fetch user profile to check role
        let profile = null;
        let profileError = null;

        // Attempt to get profile with retries for "body stream" error
        for (let i = 0; i < 3; i++) {
          try {
            const { data, error } = await supabase
              .from('user_profiles')
              .select('role')
              .eq('id', result.data.user.id)
              .single();

            if (error && (error.message?.includes('body stream') || error.message?.includes('Failed to execute'))) {
              console.warn(`Profile fetch attempt ${i + 1} failed with stream error, retrying...`);
              await new Promise(r => setTimeout(r, 1000));
              continue;
            }

            profile = data;
            profileError = error;
            break;
          } catch (e) {
            if (e.message?.includes('body stream') || e.message?.includes('Failed to execute')) {
              console.warn(`Profile fetch catch ${i + 1} failed with stream error, retrying...`);
              await new Promise(r => setTimeout(r, 1000));
              continue;
            }
            profileError = e;
            break;
          }
        }

        // Auto-create profile if missing
        if (profileError && profileError.code === 'PGRST116') {
          console.log('Profile missing, creating default profile...');
          const { error: insertError } = await supabase
            .from('user_profiles')
            .insert([{
              id: result.data.user.id,
              email: result.data.user.email,
              full_name: result.data.user.user_metadata?.full_name || '',
              role: 'customer'
            }]);

          if (!insertError) {
            const { data: newProfile } = await supabase
              .from('user_profiles')
              .select('role')
              .eq('id', result.data.user.id)
              .single();
            profile = newProfile;
          }
        }

        if (profile?.role === 'admin') {
          // Log out immediately if they are an admin
          await supabase.auth.signOut();
          toast.error('Admins must use the Admin Portal at /admin to log in.');
          setIsLoading(false);
          return;
        }

        toast.success('Login successful! Welcome back.');
        setTimeout(() => navigate('/flowers'), 500);
      } else {
        // Fallback for edge cases where data is returned but session is missing in the object
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // Check role in fallback too
          const { data: profile } = await supabase.from('user_profiles').select('role').eq('id', session.user.id).single();
          if (profile?.role === 'admin') {
            await supabase.auth.signOut();
            toast.error('Admins must use the Admin Portal.');
            setIsLoading(false);
            return;
          }
          toast.success('Login successful!');
          navigate('/flowers');
        } else {
          toast.error('Login failed - session not established');
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Fatal Login error:', error);
      if (error.message && error.message.includes('body stream')) {
        toast.loading('Retrying connection...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          toast.dismiss();
          toast.success('Login successful!');
          navigate('/flowers');
          return;
        }
        toast.dismiss();
        toast.error('Connection interrupted. Please refresh and try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/flowers`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(error.message || 'Failed to start Google login');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200"
          alt="Beautiful flowers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/80 to-pink-500/60" />
        <div className="absolute inset-0 flex flex-col justify-center px-12">
          <Link to="/" className="absolute top-8 left-8 flex items-center gap-2">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/30">
              <span className="text-2xl">🌸</span>
            </div>
            <span className="text-2xl font-bold text-white">
              Flower<span className="text-pink-200">Lifestyle</span>
            </span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Welcome back to<br />Flower Lifestyle
            </h1>
            <p className="text-pink-100 text-lg max-w-md">
              Sign in to access your account, track orders, and discover beautiful blooms crafted just for you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-b from-pink-50 to-white">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden block mb-8 text-center">
            <div className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌸</span>
              </div>
              <span className="text-2xl font-bold">
                <span className="text-pink-600">Flower</span>
                <span className="text-pink-400">Lifestyle</span>
              </span>
            </div>
          </Link>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Welcome back! Please enter your details.</p>
            <p className={`mt-2 text-xs ${dbStatus.includes('✅') ? 'text-emerald-500' : 'text-amber-500'}`}>
              {dbStatus}
            </p>
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="outline"
            className="w-full mb-6 py-6 rounded-xl border-gray-300 hover:bg-gray-50"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-b from-pink-50 to-white text-gray-500">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="#" className="text-sm text-pink-600 hover:text-pink-700 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full py-6 bg-pink-500 hover:bg-pink-600 text-white rounded-xl group"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-pink-600 hover:text-pink-700 font-semibold">
              Sign up for free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
