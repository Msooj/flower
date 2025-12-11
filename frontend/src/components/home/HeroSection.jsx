import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, Award, Heart } from 'lucide-react';
import { Button } from '../ui/button';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20" />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-6"
            >
              Fresh Flowers Delivered Daily
            </motion.span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Beautiful Blooms for
              <span className="block text-gradient">Every Occasion</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Discover handcrafted floral arrangements that speak from the heart. 
              From romantic roses to celebration bouquets, we deliver joy right to your doorstep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 group"
                onClick={() => navigate('/flowers')}
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full px-8"
                onClick={() => navigate('/flowers?category=romance')}
              >
                Valentine's Collection
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-pink-500" />
                </div>
                <span className="text-sm font-medium">Same Day Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-pink-500" />
                </div>
                <span className="text-sm font-medium">100% Fresh Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-500" />
                </div>
                <span className="text-sm font-medium">Crafted with Love</span>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1712258093579-190d48841a93?w=800"
                  alt="Beautiful pink roses bouquet"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 md:p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1599215966323-88d801b84771?w=200"
                      alt="Peony bouquet"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bestseller</p>
                    <p className="font-semibold text-gray-800">Pink Peony Bliss</p>
                    <p className="text-pink-500 font-bold">KSh 6,800</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Rating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-semibold text-gray-800">4.9</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">500+ Happy Customers</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
