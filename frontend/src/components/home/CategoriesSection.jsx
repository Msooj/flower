import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../../data/mock';

const CategoriesSection = () => {
  return (
    <section className="py-8 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-medium mb-2 md:mb-4"
          >
            Browse Categories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-4"
          >
            Shop by Occasion
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:block text-gray-600 max-w-2xl mx-auto text-sm md:text-base"
          >
            Find the perfect arrangement for every special moment
          </motion.p>
        </div>

        {/* Mobile Horizontal Scroll / Desktop Grid */}
        <div className="flex md:grid md:grid-cols-6 lg:grid-cols-7 gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 w-20 md:w-auto"
            >
              <Link
                to={`/flowers/${category.slug}`}
                className="group block"
              >
                <div className="relative rounded-full md:rounded-2xl overflow-hidden aspect-square mb-2 border-2 border-transparent group-hover:border-pink-500 transition-all duration-300 shadow-sm">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 via-transparent to-transparent" />
                </div>
                <h3 className="text-center font-medium text-[10px] md:text-sm text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-1">
                  {category.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
