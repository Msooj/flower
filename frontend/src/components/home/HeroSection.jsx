import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, Award, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { supabase } from '../../lib/supabase';

const HeroSection = ({ isMobile = false }) => {
  const navigate = useNavigate();
  const [petaSonataImage, setPetaSonataImage] = useState('https://duazdpldzqodpucqoyta.supabase.co/storage/v1/object/public/products/products/1766216396653_hd1fdp.jpeg');

  useEffect(() => {
    const fetchPetaSonata = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('image')
          .eq('id', 'petal-sonata')
          .single();

        if (!error && data?.image) {
          setPetaSonataImage(data.image);
        }
      } catch (err) {
        console.error('Error fetching Petal Sonata image:', err);
      }
    };

    fetchPetaSonata();
  }, []);

  return (
    <section className={`relative overflow-hidden ${isMobile ? '' : 'bg-gradient-to-br from-pink-50 via-white to-pink-100'}`}>
      {/* Background Image for Mobile */}
      {isMobile && (
        <div className="absolute inset-0 z-0">
          <img
            src={petaSonataImage}
            alt="Flower delivery Nairobi - Petal Sonata bouquet with pink and red roses for same day delivery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/20" />
        </div>
      )}

      {/* Decorative Elements - Hidden on mobile background mode for cleanliness */}
      {!isMobile && (
        <>
          <div className="absolute top-10 left-5 w-48 h-48 md:top-20 md:left-10 md:w-72 md:h-72 bg-pink-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 md:bottom-20 md:right-10 md:w-96 md:h-96 bg-pink-300 rounded-full blur-3xl opacity-20" />
        </>
      )}

      <div className={`container mx-auto px-4 relative z-20 ${isMobile ? 'py-12' : 'py-16 md:py-24'}`}>
        <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 items-center ${isMobile ? 'max-w-md mx-auto' : ''}`}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            {!isMobile && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4 md:mb-6"
              >
                Fresh Flowers Delivered Daily
              </motion.span>
            )}

            <h1 className={`${isMobile ? 'text-3xl text-center' : 'text-4xl md:text-5xl lg:text-5xl'} font-bold text-gray-900 leading-tight mb-4 md:mb-6`}>
              Fresh Flower Delivery in Nairobi | Same Day Florist Services by <span className="text-gradient">FlowerLifestyle</span>
            </h1>

            <p className={`text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-lg leading-relaxed ${isMobile ? 'text-center' : ''}`}>
              Experience the luxury of hand-crafted bouquets with same-day delivery throughout Nairobi.
            </p>

            <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 ${isMobile ? 'mb-8 justify-center' : 'mb-12'}`}>
              <Button
                size={isMobile ? "lg" : "lg"}
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-10 group shadow-lg"
                onClick={() => navigate('/flowers')}
              >
                Shop Now
              </Button>
              <Button
                size={isMobile ? "lg" : "lg"}
                variant="outline"
                className="border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full px-10 bg-white/50 backdrop-blur-sm"
                onClick={() => navigate('/flowers?category=romance')}
              >
                Valentine's
              </Button>
            </div>

            {/* Trust Badges */}
            <div className={`flex flex-wrap gap-4 md:gap-6 ${isMobile ? 'justify-center' : ''}`}>
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-white/80 shadow-sm flex items-center justify-center`}>
                  <Truck className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-pink-500`} />
                </div>
                <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>Same Day</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-white/80 shadow-sm flex items-center justify-center`}>
                  <Award className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-pink-500`} />
                </div>
                <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>100% Fresh</span>
              </div>
            </div>
          </motion.div>

          {/* Image - Hidden on Mobile since it's background now */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={petaSonataImage}
                    alt="Flower delivery Nairobi - Petal Sonata bouquet with pink and red roses for same day delivery"
                    className="h-[500px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent" />
                </div>

                {/* Rating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 z-20"
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
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
