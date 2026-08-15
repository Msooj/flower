import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gift, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const PromoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Promo Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-400 to-pink-600 p-8 md:p-10"
          >
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-sm mb-4">
                <Gift className="w-4 h-4" />
                Special Offer
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Free Same Day Delivery
              </h3>
              <p className="text-white/90 mb-6 max-w-sm">
                Order before 2 PM for same day delivery within Nairobi. Express your love faster!
              </p>
              <a
                href="/flowers"
                className="bg-white text-pink-600 hover:bg-pink-50 rounded-full group inline-flex items-center justify-center text-center font-medium py-3 px-8 transition-colors"
              >
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full" />
          </motion.div>

          {/* Promo Card 2 — Shop by Occasion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            <img
              src="https://images.unsplash.com/photo-1531058240690-006c446962d8?w=800"
              alt="Florist at work"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/85 via-pink-900/50 to-transparent" />
            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end min-h-[300px]">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-sm mb-4 w-fit">
                <Gift className="w-4 h-4" />
                Shop by Occasion
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Find the Perfect Bouquet
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { label: '🎂 Birthday', href: '/flowers/birthday' },
                  { label: '💍 Anniversary', href: '/flowers/anniversary' },
                  { label: '❤️ Romance', href: '/flowers/romance' },
                  { label: '🎁 Gift Combos', href: '/flowers/combos' },
                ].map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-full transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
              <a
                href="/flowers"
                className="w-fit border border-white text-white hover:bg-white hover:text-pink-600 rounded-full group inline-flex items-center justify-center text-center font-medium py-3 px-8 transition-colors"
              >
                Browse All Flowers
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
