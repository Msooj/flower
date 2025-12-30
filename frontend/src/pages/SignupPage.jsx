import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      const result = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            phone: formData.phone
          }
        }
      });

      if (result.error) {
        console.error('Signup error:', result.error);
        if (result.error.message && result.error.message.includes('body stream')) {
          toast.loading('Syncing your account...');

          for (let i = 0; i < 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
              toast.dismiss();
              toast.success('Account created! Welcome.');
              setTimeout(() => navigate('/flowers'), 1000);
              return;
            }
          }

          toast.dismiss();
          toast.info('Signup processing... refreshing to shop.');
          setTimeout(() => window.location.reload(), 1500);
          return;
        }

        toast.error(result.error.message || 'Failed to sign up');
        setIsLoading(false);
        return;
      }

      if (result.data?.session) {
        toast.success('Account created and logged in! Welcome.');
        setTimeout(() => {
          navigate('/flowers');
        }, 2000);
      } else if (result.data?.user) {
        toast.success('Account created! Please log in.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.success('Account created!');
        setTimeout(() => {
          navigate('/flowers');
        }, 2000);
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.message && error.message.includes('body stream')) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          toast.success('Account created! Welcome.');
          setTimeout(() => navigate('/flowers'), 2000);
          return;
        }
        toast.error('Connection issue - please try again');
      } else {
        toast.error(error.message || 'Failed to sign up');
      }
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/flowers`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        throw error;
      }

      // OAuth redirect will happen automatically
      const redirectUrl = `${window.location.origin}/flowers`;
      console.log('Google Auth Redirect URL:', redirectUrl);
      toast.loading(`Redirecting to Google... (Return URL: ${redirectUrl})`);

    } catch (error) {
      console.error('Google signup error:', error);
      toast.error(error.message || 'Failed to start Google signup');
      setIsLoading(false);
    }
  };

  const benefits = [
    'Exclusive member discounts',
    'Track your orders easily',
    'Save your favorite flowers',
    'Get personalized recommendations'
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-b from-pink-50 to-white">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden block mb-8 text-center">
            <div className="inline-flex items-center gap-3">
              <img
                src="/WhatsApp_Image_2025-12-21_at_6.52.59_PM.png"
                alt="Flower Lifestyle Logo"
                className="h-12 w-auto"
              />
              <span className="text-2xl md:text-3xl font-bold tracking-tight">
                <span className="text-pink-600">Flower</span>
                <span className="text-pink-400">Lifestyle</span>
              </span>
            </div>
          </Link>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join us and start your flower journey today!</p>
          </div>

          {/* Google Sign Up */}
          {/* Google Sign Up Removed per user request */}

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                  autoComplete="off"
                  required
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

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
                  autoComplete="off"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254 7XX XXX XXX"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                  autoComplete="off"
                  required
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                  placeholder="Create a password"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                  autoComplete="off"
                  required
                  minLength={8}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <Link to="#" className="text-pink-600 hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="#" className="text-pink-600 hover:underline">Privacy Policy</Link>
              </label>
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
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-600 hover:text-pink-700 font-semibold">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1599215966323-88d801b84771?w=1200"
          alt="Beautiful peony flowers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-pink-600/80 to-pink-500/60" />
        <div className="absolute inset-0 flex flex-col justify-center px-12">
          <Link to="/" className="absolute top-8 right-8 flex items-center gap-3">
            <img
              src="/WhatsApp_Image_2025-12-21_at_6.52.59_PM.png"
              alt="Flower Lifestyle Logo"
              className="h-12 w-auto"
            />
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
              Join Our<br />Flower Family
            </h1>
            <p className="text-pink-100 text-lg mb-8 max-w-md">
              Create an account and unlock exclusive benefits
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-white"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
