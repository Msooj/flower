import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Menu, X, Heart, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { navLinks, contactInfo } from '../../data/mock';

import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { supabase } from '../../lib/supabase';

const Header = () => {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getInitialUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) fetchProfile(user.id);
    };

    getInitialUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id);
      } else {
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setUserProfile(data);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-pink-600 text-white py-2 px-4 text-center text-sm">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          <span>We deliver country wide! | Call us: {contactInfo.phone}</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'glass-effect shadow-lg border-b border-pink-100'
          : 'bg-white'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3"
              >
                <img 
                  src="/WhatsApp_Image_2025-12-21_at_6.52.59_PM.png" 
                  alt="Flower Lifestyle Logo" 
                  className="h-12 w-auto"
                />
                <span className="text-2xl md:text-3xl font-bold tracking-tight">
                  <span className="text-pink-600">Flower</span>
                  <span className="text-pink-400">Lifestyle</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-pink-600 ${location.pathname === link.href ||
                    (link.href !== '/' && location.pathname.startsWith(link.href.split('?')[0]))
                    ? 'text-pink-600'
                    : 'text-gray-700'
                    }`}
                >
                  {link.name}
                  {(location.pathname === link.href ||
                    (link.href !== '/' && location.pathname.startsWith(link.href.split('?')[0]))) && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-500 rounded-full"
                      />
                    )}
                </Link>
              ))}
              {user && (
                <Link
                  to="/orders"
                  className={`relative text-sm font-medium transition-colors hover:text-pink-600 ${location.pathname === '/orders' ? 'text-pink-600' : 'text-gray-700'}`}
                >
                  My Orders
                </Link>
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-gray-700 hover:text-pink-600 hover:bg-pink-50 relative"
                onClick={() => navigate('/wishlist')}
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                onClick={() => navigate('/cart')}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-2">
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      Welcome, <span className="text-pink-600 font-semibold">{userProfile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-pink-200 text-pink-600 hover:bg-pink-50"
                      onClick={async () => {
                        await supabase.auth.signOut();
                        toast.success('Logged out successfully');
                        navigate('/');
                      }}
                    >
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                    <Button
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                      onClick={() => navigate('/signup')}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>


        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-pink-100 bg-white"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="relative max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="Search for flowers, bouquets, gifts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const q = searchTerm.trim();
                        if (q) {
                          navigate(`/flowers?search=${encodeURIComponent(q)}`);
                        } else {
                          navigate('/flowers');
                        }
                        setIsSearchOpen(false);
                      }
                    }}
                    className="w-full px-4 py-3 pl-12 rounded-full border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                    autoFocus
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-pink-100 bg-white"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname === link.href
                        ? 'bg-pink-50 text-pink-600'
                        : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="border-t border-pink-100 my-2 pt-2 flex flex-col gap-2">
                    {user ? (
                      <>
                        <div className="px-4 py-2 text-sm text-gray-600">
                          Welcome, <span className="text-pink-600 font-semibold">{userProfile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full border-pink-300 text-pink-600 hover:bg-pink-50"
                          onClick={async () => {
                            await supabase.auth.signOut();
                            toast.success('Logged out successfully');
                            setIsMobileMenuOpen(false);
                            navigate('/');
                          }}
                        >
                          Log Out
                        </Button>
                      </>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 border-pink-300 text-pink-600 hover:bg-pink-50"
                          onClick={() => navigate('/login')}
                        >
                          Login
                        </Button>
                        <Button
                          className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                          onClick={() => navigate('/signup')}
                        >
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header >
    </>
  );
};

export default Header;
