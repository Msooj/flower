import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, Grid3X3, LayoutGrid, Heart, ShoppingBag, Star, Eye, ChevronDown } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { allProducts, categories } from '../data/mock';

<<<<<<< HEAD
import { useCart } from '../context/CartContext';

const FlowersPage = () => {
  const { addToCart } = useCart();
=======
const FlowersPage = () => {
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [gridSize, setGridSize] = useState('large');
  const [showFilters, setShowFilters] = useState(false);
<<<<<<< HEAD

=======
  
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
  const activeCategory = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];
<<<<<<< HEAD

=======
    
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
    // Filter by category
    if (activeCategory && activeCategory !== 'all') {
      products = products.filter(p => p.category === activeCategory);
    }
<<<<<<< HEAD

    // Filter by search
    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

=======
    
    // Filter by search
    if (searchQuery) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
    // Sort
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }
<<<<<<< HEAD

=======
    
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
    return products;
  }, [activeCategory, searchQuery, sortBy]);

  const formatPrice = (price) => `KSh ${price.toLocaleString()}`;

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Bestseller': return 'bg-pink-500 text-white';
      case 'New': return 'bg-emerald-500 text-white';
      case 'Sale': return 'bg-red-500 text-white';
      case 'Premium': return 'bg-amber-500 text-white';
      case 'Popular': return 'bg-blue-500 text-white';
      case 'Gift': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <Header />
<<<<<<< HEAD

=======
      
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
<<<<<<< HEAD
            {activeCategory === 'all' ? 'All Flowers' :
=======
            {activeCategory === 'all' ? 'All Flowers' : 
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
              categories.find(c => c.slug === activeCategory)?.name || 'Shop Flowers'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Browse our stunning collection of handcrafted floral arrangements
          </motion.p>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search flowers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 rounded-xl border-pink-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            {/* Grid Toggle */}
            <div className="hidden lg:flex items-center gap-2 border-l border-pink-200 pl-4">
              <Button
                variant={gridSize === 'large' ? 'default' : 'ghost'}
                size="icon"
                className={gridSize === 'large' ? 'bg-pink-500' : ''}
                onClick={() => setGridSize('large')}
              >
                <LayoutGrid className="w-5 h-5" />
              </Button>
              <Button
                variant={gridSize === 'small' ? 'default' : 'ghost'}
                size="icon"
                className={gridSize === 'small' ? 'bg-pink-500' : ''}
                onClick={() => setGridSize('small')}
              >
                <Grid3X3 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-pink-500" />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('all')}
<<<<<<< HEAD
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeCategory === 'all'
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-700 hover:bg-pink-50'
                    }`}
=======
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-700 hover:bg-pink-50'
                  }`}
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
                >
                  All Flowers
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
<<<<<<< HEAD
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeCategory === cat.slug
                        ? 'bg-pink-500 text-white'
                        : 'text-gray-700 hover:bg-pink-50'
                      }`}
=======
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeCategory === cat.slug
                        ? 'bg-pink-500 text-white'
                        : 'text-gray-700 hover:bg-pink-50'
                    }`}
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">
                Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-pink-100">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button
                  className="mt-4 bg-pink-500 hover:bg-pink-600"
                  onClick={() => {
                    setSearchQuery('');
                    handleCategoryChange('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
<<<<<<< HEAD
              <div className={`grid gap-4 md:gap-6 ${gridSize === 'large'
                  ? 'grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-2 lg:grid-cols-4'
                }`}>
=======
              <div className={`grid gap-4 md:gap-6 ${
                gridSize === 'large' 
                  ? 'grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-2 lg:grid-cols-4'
              }`}>
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-pink-100">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.badge && (
                          <Badge className={`absolute top-3 left-3 ${getBadgeColor(product.badge)}`}>
                            {product.badge}
                          </Badge>
                        )}
                        {product.originalPrice && (
                          <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" className="bg-white text-pink-500 hover:bg-pink-500 hover:text-white rounded-full shadow-lg h-9 w-9">
                            <Heart className="w-4 h-4" />
                          </Button>
<<<<<<< HEAD
                          <Button size="icon" className="bg-pink-500 text-white hover:bg-pink-600 rounded-full shadow-lg h-9 w-9" onClick={() => addToCart(product)}>
=======
                          <Button size="icon" className="bg-pink-500 text-white hover:bg-pink-600 rounded-full shadow-lg h-9 w-9">
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
                            <ShoppingBag className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
<<<<<<< HEAD

=======
                      
>>>>>>> 95c321e5e3ac7dac9ec57a2f518f7623cc96f764
                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-center gap-1 mb-2">
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
                          <span className="text-sm text-gray-500">({product.reviews})</span>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
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
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FlowersPage;
