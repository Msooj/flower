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
import { supabase } from '../lib/supabase';
import PageMetaTags from '../components/seo/PageMetaTags';

import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'sonner';
import { useEffect } from 'react';

const FlowersPage = ({ isMobile = false }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [gridSize, setGridSize] = useState('large');
  const [showFilters, setShowFilters] = useState(false);
  const [dbProducts, setDbProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Products fetch error:', error);
          setDbProducts([]);
          return;
        }

        if (data && data.length > 0) {
          // Ensure all products have required fields
          const normalizedProducts = data.map(p => ({
            id: p.id,
            name: p.name,
            price: parseFloat(p.price) || 0,
            originalPrice: p.original_price ? parseFloat(p.original_price) : null,
            image: p.image || '',
            category: p.category || 'roses',
            badge: p.badge || null,
            rating: parseFloat(p.rating) || 5.0,
            reviews: parseInt(p.reviews) || 0,
            stock: parseInt(p.stock) || 0,
            description: p.description || ''
          }));
          setDbProducts(normalizedProducts);
        } else {
          setDbProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setDbProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Keep searchQuery in sync with ?search= in URL
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    setSearchQuery(urlSearch);
  }, [searchParams]);

  // Get active category from URL or default to 'all'
  const activeCategory = searchParams.get('category') || 'all';

  // State for mobile category dropdown
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);

  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    let products = [...dbProducts];

    // Filter by category
    if (activeCategory && activeCategory !== 'all') {
      products = products.filter(p => p.category === activeCategory);
    }

    // Filter by search
    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }


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

    return products;
  }, [dbProducts, activeCategory, searchQuery, sortBy]);

  const formatPrice = (price) => `KSh ${price.toLocaleString()}`;

  const getBadgeColor = (badge) => {
    switch (badge) {
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

  const getCategoryContent = (categorySlug) => {
    const categoryContent = {
      'birthday': {
        title: 'Birthday Flowers Nairobi | Same Day Delivery',
        description: 'Celebrate birthdays with beautiful flower bouquets delivered same day in Nairobi. Fresh birthday flowers, cake combos, and special arrangements.',
        keywords: 'birthday flowers Nairobi, birthday flower delivery, birthday bouquets Kenya, same day birthday flowers',
        content: 'Make their birthday unforgettable with our stunning birthday flower collection. From vibrant roses to elegant lilies, each bouquet is hand-crafted with fresh blooms and delivered with care throughout Nairobi.',
        h1: 'Birthday Flowers in Nairobi'
      },
      'romance': {
        title: 'Romantic Flowers Nairobi | Anniversary & Love Bouquets',
        description: 'Express your love with romantic flowers in Nairobi. Red roses, romantic bouquets, anniversary flowers with same-day delivery.',
        keywords: 'romantic flowers Nairobi, red roses delivery, anniversary flowers, romantic bouquets Kenya',
        content: 'Ignite romance with our collection of passionate red roses and romantic arrangements. Perfect for anniversaries, date nights, or when you want to say "I love you" with flowers.',
        h1: 'Romantic Flowers & Roses'
      },
      'roses': {
        title: 'Roses Delivery Nairobi | Red Roses & Premium Rose Bouquets',
        description: 'Premium roses delivery in Nairobi. Red roses, pink roses, white roses with same-day delivery. Fresh rose bouquets for every occasion.',
        keywords: 'roses delivery Nairobi, red roses Nairobi, rose bouquets Kenya, fresh roses delivery',
        content: 'Experience the timeless elegance of roses. Our premium rose collection features the freshest blooms in stunning arrangements, from classic red roses to delicate pink and white varieties.',
        h1: 'Premium Roses Collection'
      },
      'anniversary': {
        title: 'Anniversary Flowers Nairobi | Wedding Anniversary Bouquets',
        description: 'Celebrate your anniversary with beautiful flowers in Nairobi. Anniversary bouquets, romantic arrangements, same-day delivery.',
        keywords: 'anniversary flowers Nairobi, anniversary bouquets, wedding anniversary flowers, romantic anniversary gifts',
        content: 'Mark your special milestone with anniversary flowers that capture your love story. Our anniversary collection features elegant arrangements that symbolize your enduring commitment.',
        h1: 'Anniversary Flowers'
      },
      'combos': {
        title: 'Flower Combos Nairobi | Flowers with Cakes & Gifts',
        description: 'Flower combos in Nairobi with cakes, chocolates, and gifts. Perfect flower and gift combinations for every occasion.',
        keywords: 'flower combos Nairobi, flowers with cake, flower gift sets, flower and chocolate combos',
        content: 'Elevate your gifting with our exclusive flower combinations. From flowers with cakes to gift sets with chocolates, our combos create unforgettable moments.',
        h1: 'Flower Combos & Gift Sets'
      }
    };

    return categoryContent[categorySlug] || {
      title: 'Order Flowers Online Nairobi | Fresh Flower Delivery',
      description: 'Browse fresh flowers in Nairobi. Birthday flowers, anniversary bouquets, romance arrangements, roses, and combos. Same-day delivery available.',
      keywords: 'order flowers online Nairobi, fresh flowers Nairobi, flower delivery Nairobi, nairobi florist',
      content: 'Browse our stunning collection of handcrafted floral arrangements, perfect for any occasion.',
      h1: 'All Flowers'
    };
  };

  const currentCategoryContent = getCategoryContent(activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <PageMetaTags 
        title={currentCategoryContent.title}
        description={currentCategoryContent.description}
        keywords={currentCategoryContent.keywords}
        canonicalUrl={`https://www.flowerlifestyle.co.ke/flowers${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`}
      />
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-6 md:mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4"
          >
            {currentCategoryContent.h1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed"
          >
            {currentCategoryContent.content}
          </motion.p>

          {/* Mobile Category Dropdown */}
          {isMobile && (
            <div className="mt-4 mb-6">
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  handleCategoryChange(value);
                }}
              >
                <SelectTrigger className="w-full rounded-xl border-pink-200">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.slug} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
          {/* Sidebar - Categories (Hidden on mobile as we have the dropdown at the top) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-pink-500" />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeCategory === 'all'
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-700 hover:bg-pink-50'
                    }`}
                >
                  All Flowers
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeCategory === cat.slug
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-700 hover:bg-pink-50'
                      }`}
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

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
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
              <div className={`grid gap-4 md:gap-6 ${gridSize === 'large'
                ? 'grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-2 lg:grid-cols-4'
                }`}>
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
                          <Button
                            size="icon"
                            className={`rounded-full shadow-lg h-9 w-9 ${isInWishlist(product.id)
                              ? 'bg-pink-500 text-white hover:bg-pink-600'
                              : 'bg-white text-pink-500 hover:bg-pink-500 hover:text-white'
                              }`}
                            onClick={() => toggleWishlist(product)}
                          >
                            <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                          </Button>

                          <Button size="icon" className="bg-pink-500 text-white hover:bg-pink-600 rounded-full shadow-lg h-9 w-9" onClick={() => {
                            addToCart(product);
                          }}>
                            <ShoppingBag className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">

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
