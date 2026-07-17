import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, Flower2 } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PageMetaTags
        title="Page Not Found | Flower Lifestyle Kenya"
        description="The page you are looking for could not be found. Browse our beautiful flower and gift collections."
        noindex={true}
      />
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg mx-auto"
        >
          {/* Decorative flower */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="flex justify-center mb-6"
          >
            <Flower2 className="w-24 h-24 text-pink-300" />
          </motion.div>

          <h1 className="text-8xl font-bold text-pink-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Oops! This page has wilted away
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let us help you find something beautiful instead.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-full transition-colors shadow-md"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              to="/flowers"
              className="inline-flex items-center justify-center gap-2 border border-pink-300 text-pink-600 hover:bg-pink-50 font-medium px-6 py-3 rounded-full transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Flowers
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-pink-100">
            <p className="text-sm text-gray-400 mb-3">Popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: 'Birthday Flowers', href: '/flowers?category=birthday' },
                { label: 'Romance', href: '/flowers?category=romance' },
                { label: 'Roses', href: '/flowers?category=roses' },
                { label: 'Gift Combos', href: '/flowers?category=combos' },
                { label: 'About Us', href: '/about' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-xs px-3 py-1.5 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
