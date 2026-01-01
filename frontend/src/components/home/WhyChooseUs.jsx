import React from 'react';
import { motion } from 'framer-motion';
import { Flower2, Truck, Sparkles, ShieldCheck } from 'lucide-react';
import { whyChooseUs } from '../../data/mock';

const iconMap = {
  Flower2: Flower2,
  Truck: Truck,
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck
};

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            The Flower Lifestyle Promise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            We're committed to delivering not just flowers, but moments of joy and memories that last
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-4 md:p-6 text-center border border-pink-100 hover:shadow-lg hover:border-pink-200 transition-all duration-300">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-xl md:rounded-2xl bg-pink-100 flex items-center justify-center group-hover:bg-pink-500 transition-colors duration-300">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-pink-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-[10px] md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
