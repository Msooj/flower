import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { featuredProducts } from '../../data/mock';

<<<<<<< HEAD
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
=======
const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764

  const formatPrice = (price) => {
    return `KSh ${price.toLocaleString()}`;
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Bestseller':
        return 'bg-pink-500 text-white';
      case 'New':
        return 'bg-emerald-500 text-white';
      case 'Sale':
        return 'bg-red-500 text-white';
      case 'Premium':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-pink-100">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
<<<<<<< HEAD

=======
          
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge className={getBadgeColor(product.badge)}>
                {product.badge}
              </Badge>
            </div>
          )}
<<<<<<< HEAD

=======
          
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-red-500 text-white">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </Badge>
            </div>
          )}
<<<<<<< HEAD

=======
          
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
          {/* Quick Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              className="bg-white text-pink-500 hover:bg-pink-500 hover:text-white rounded-full shadow-lg"
            >
              <Heart className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              className="bg-white text-pink-500 hover:bg-pink-500 hover:text-white rounded-full shadow-lg"
            >
              <Eye className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              className="bg-pink-500 text-white hover:bg-pink-600 rounded-full shadow-lg"
<<<<<<< HEAD
              onClick={() => addToCart(product)}
=======
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
            >
              <ShoppingBag className="w-5 h-5" />
            </Button>
          </div>
        </div>
<<<<<<< HEAD

=======
        
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
        {/* Content */}
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
<<<<<<< HEAD
                  className={`w-4 h-4 ${i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                    }`}
=======
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
<<<<<<< HEAD

=======
          
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
          {/* Name */}
          <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
<<<<<<< HEAD

=======
          
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-pink-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4"
            >
              Featured Collection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Bestselling Bouquets
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="outline"
              className="border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full mt-4 md:mt-0"
              onClick={() => navigate('/flowers')}
            >
              View All Products
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
