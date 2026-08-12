import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Menu, X, Heart, Phone, MapPin, ChevronDown } from 'lucide-react';
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
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isMobileDeliveryOpen, setIsMobileDeliveryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const deliveryRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const DELIVERY_AREAS = [
    { label: 'Westlands', href: '/flower-delivery-westlands' },
    { label: 'Kilimani', href: '/flower-delivery-kilimani' },
    { label: 'Karen', href: '/flower-delivery-karen' },
    { label: 'Lavington', href: '/flower-delivery-lavington' },
    { label: 'Gigiri', href: '/flower-delivery-gigiri' },
    { label: 'Kasarani', href: '/flower-delivery-kasarani' },
  ];

  // Close delivery dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (deliveryRef.current && !deliveryRef.current.contains(e.target)) {
        setIsDeliveryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      <div className="bg-pink-600 text-white py-2 px-4 text-center text-xs sm:text-sm overflow-hidden">
        <div className="container mx-auto flex items-center justify-center gap-2 min-w-0">
          <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">
            We deliver country wide! | Call us:{' '}
            <a href="tel:+254742370307" className="font-semibold hover:underline">
              {contactInfo.phone}
            </a>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${isScrolled
          ? 'glass-effect shadow-lg border-b border-pink-100'
          : 'bg-white'
          }`}
      >
        <div className="container mx-auto px-3 sm:px-4 max-w-full">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2"
              >
                <img
                  src="/WhatsApp_Image_2025-12-21_at_6.52.59_PM__1_-removebg-preview.png"
                  alt="Flower Lifestyle Logo"
                  className="h-10 xl:h-12 w-auto flex-shrink-0"
                />
                <span className="text-lg xl:text-2xl font-bold tracking-tight flex-shrink-0">
                  <span className="text-pink-600">Flower</span>
                  <span className="text-pink-400">Lifestyle</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-6 flex-shrink-0">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-xs xl:text-sm font-semibold transition-colors hover:text-pink-600 ${location.pathname === link.href ||
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
                  className={`relative text-xs xl:text-sm font-semibold transition-colors hover:text-pink-600 ${location.pathname === '/orders' ? 'text-pink-600' : 'text-gray-700'}`}
                >
                  My Orders
                </Link>
              )}

              {/* Delivery Areas Dropdown */}
              <div className="relative" ref={deliveryRef}>
                <button
                  id="delivery-areas-menu"
                  onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                  className={`flex items-center gap-1 text-xs xl:text-sm font-semibold transition-colors hover:text-pink-600 ${DELIVERY_AREAS.some((a) => location.pathname === a.href) ? 'text-pink-600' : 'text-gray-700'
                    }`}
                  aria-expanded={isDeliveryOpen}
                  aria-haspopup="true"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Delivery Areas
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDeliveryOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isDeliveryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-pink-100 py-2 z-50"
                      role="menu"
                    >
                      <p className="px-4 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Nairobi Delivery</p>
                      {DELIVERY_AREAS.map((area) => (
                        <Link
                          key={area.href}
                          to={area.href}
                          onClick={() => setIsDeliveryOpen(false)}
                          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-pink-50 hover:text-pink-600 ${location.pathname === area.href ? 'text-pink-600 bg-pink-50' : 'text-gray-700'
                            }`}
                          role="menuitem"
                        >
                          <MapPin className="w-3.5 h-3.5 text-pink-400" />
                          {area.label}
                        </Link>
                      ))}
                      <div className="border-t border-pink-100 mt-1 pt-1">
                        <Link
                          to="/florist-kenya"
                          onClick={() => setIsDeliveryOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-pink-600 hover:bg-pink-50 transition-colors"
                          role="menuitem"
                        >
                          All Kenya Delivery →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/blog"
                className={`relative text-xs xl:text-sm font-semibold transition-colors hover:text-pink-600 ${location.pathname.startsWith('/blog') ? 'text-pink-600' : 'text-gray-700'}`}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className={`relative text-xs xl:text-sm font-semibold transition-colors hover:text-pink-600 ${location.pathname === '/about' ? 'text-pink-600' : 'text-gray-700'}`}
              >
                About Us
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 xl:gap-3 flex-shrink-0">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-pink-600 hover:bg-pink-50 w-8 h-8 xl:w-9 xl:h-9"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle search bar"
              >
                <Search className="w-4 h-4 xl:w-5 xl:h-5" />
              </Button>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-gray-700 hover:text-pink-600 hover:bg-pink-50 relative w-8 h-8 xl:w-9 xl:h-9"
                onClick={() => navigate('/wishlist')}
                aria-label="View wishlist"
              >
                <Heart className="w-4 h-4 xl:w-5 xl:h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>

              {/* Cart */}
              <motion.div
                key={`cart-icon-${cartCount}`}
                initial={{ scale: 1 }}
                animate={cartCount > 0 ? { scale: [1, 1.4, 1], rotate: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-gray-700 hover:text-pink-600 hover:bg-pink-50 w-8 h-8 xl:w-9 xl:h-9"
                  onClick={() => navigate('/cart')}
                  aria-label="View shopping cart"
                >
                  <ShoppingBag className="w-4 h-4 xl:w-5 xl:h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[9px] rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </motion.div>

              {/* Auth Buttons */}
              <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
                {user ? (
                  <div className="flex items-center gap-2 xl:gap-3">
                    <span className="text-xs xl:text-sm font-medium text-gray-700 max-w-[100px] truncate">
                      Hi, <span className="text-pink-600 font-semibold">{userProfile?.full_name?.split(' ')[0] || user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}</span>
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-pink-200 text-pink-600 hover:bg-pink-50 text-xs px-2 h-8"
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
                      size="sm"
                      className="text-gray-700 hover:text-pink-600 hover:bg-pink-50 text-xs px-2 h-8"
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                    <Button
                      size="sm"
                      className="bg-pink-500 hover:bg-pink-600 text-white text-xs px-3 h-8"
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
                aria-label="Toggle main menu"
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
                    placeholder="Search Flowerlifestyle giftshop..."
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
                  {/* Mobile Delivery Areas */}
                  <div>
                    <button
                      onClick={() => setIsMobileDeliveryOpen(!isMobileDeliveryOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-pink-400" />
                        Delivery Areas
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isMobileDeliveryOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isMobileDeliveryOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 flex flex-col gap-1 mt-1"
                        >
                          {DELIVERY_AREAS.map((area) => (
                            <Link
                              key={area.href}
                              to={area.href}
                              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${location.pathname === area.href
                                ? 'bg-pink-50 text-pink-600'
                                : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                                }`}
                            >
                              <MapPin className="w-3.5 h-3.5 text-pink-300" />
                              {area.label}
                            </Link>
                          ))}
                          <Link
                            to="/florist-kenya"
                            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-pink-600 hover:bg-pink-50 transition-colors"
                          >
                            All Kenya →
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    to="/blog"
                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname.startsWith('/blog')
                      ? 'bg-pink-50 text-pink-600'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                      }`}
                  >
                    Blog
                  </Link>
                  <Link
                    to="/about"
                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname === '/about'
                      ? 'bg-pink-50 text-pink-600'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                      }`}
                  >
                    About Us
                  </Link>
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
