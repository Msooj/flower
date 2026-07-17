import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { useCurrency, CurrencySelector } from './CurrencyConverter';

const ProductModal = ({ product, isOpen, onClose, onAddToCart, onToggleWishlist, isInWishlist }) => {
  if (!product) return null;

  const { formatPrice } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-pink-400/20 via-pink-500/30 to-pink-600/20 backdrop-blur-md z-[60] flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl z-[70] overflow-hidden max-w-4xl w-full max-h-[90vh] md:max-h-[85vh] flex flex-col border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
              <div className="flex items-center gap-2">
                <CurrencySelector />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Image Section */}
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.badge && (
                      <Badge className={`absolute top-4 left-4 ${getBadgeColor(product.badge)}`}>
                        {product.badge}
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                      onClick={() => onAddToCart(product)}
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-full ${isInWishlist(product.id)
                        ? 'bg-pink-500 text-white hover:bg-pink-600 border-pink-500'
                        : 'border-pink-200 text-pink-500 hover:bg-pink-50'
                      }`}
                      onClick={() => onToggleWishlist(product)}
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  {/* Product Info */}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-2xl font-bold text-pink-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description || 
                        `Beautiful ${product.name} perfect for any occasion. Handcrafted with fresh, premium flowers and arranged by our expert florists. This stunning bouquet is designed to bring joy and elegance to your special moments.`
                      }
                    </p>
                  </div>

                  {/* Product Features */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Features & Benefits</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Truck className="w-5 h-5 text-pink-500" />
                        <span>Same-day delivery available in Nairobi</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Shield className="w-5 h-5 text-pink-500" />
                        <span>100% fresh flowers guaranteed</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Product Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium text-gray-800 capitalize">
                          {product.category || 'Flowers'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Availability:</span>
                        <span className="font-medium text-green-600">In Stock</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery:</span>
                        <span className="font-medium text-gray-800">Same-day available</span>
                      </div>
                    </div>
                  </div>

                  {/* Care Instructions */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Care Instructions</h3>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Trim stems at an angle before placing in water</li>
                      <li>• Change water every 2 days</li>
                      <li>• Keep away from direct sunlight and heat</li>
                      <li>• Remove wilted petals to maintain freshness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Helper function for badge colors
const getBadgeColor = (badge) => {
  switch (badge?.toLowerCase()) {
    case 'new':
      return 'bg-green-500 text-white';
    case 'sale':
      return 'bg-red-500 text-white';
    case 'popular':
      return 'bg-orange-500 text-white';
    case 'limited':
      return 'bg-purple-500 text-white';
    default:
      return 'bg-blue-500 text-white';
  }
};

export default ProductModal;
