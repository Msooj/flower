import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, Grid3X3, LayoutGrid, Heart, ShoppingBag, Star, Eye, ChevronDown, X } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import ProductModal from '../components/ui/ProductModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { categories } from '../data/mock';
import PageMetaTags from '../components/seo/PageMetaTags';
import { useProducts } from '../hooks/useProducts';
import StructuredData from '../components/seo/StructuredData';
import { SITE_URL, productListSchema, breadcrumbSchema } from '../data/seoConfig';

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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products: dbProducts, isLoading, loadError, dataSource, retry } = useProducts({
    limit: 50,
    fallbackToMock: true,
  });

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
    let products = dbProducts;

    // Early return if no products
    if (!products || products.length === 0) return [];

    // Filter by category
    if (activeCategory && activeCategory !== 'all') {
      products = products.filter(p => p.category === activeCategory);
    }

    // Filter by search (optimized)
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower)
      );
    }

    // Sort (optimized with stable sort)
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        default:
          return 0; // Featured - keep original order
      }
    });
  }, [dbProducts, activeCategory, searchQuery, sortBy]);

  const formatPrice = (price) => `KSh ${price.toLocaleString()}`;

  // Product view handlers
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (product) => {
    toggleWishlist(product);
    toast.success(
      isInWishlist(product.id)
        ? `${product.name} removed from wishlist!`
        : `${product.name} added to wishlist!`
    );
  };

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
      'girlfriends-day': {
        title: "Girlfriend's Day Flowers Nairobi | Romantic Bouquets & Gifts",
        description: "Surprise your girlfriend with fresh flowers on Girlfriend's Day in Nairobi. Red roses, premium bouquets, and special gifts. Same-day delivery available.",
        keywords: "girlfriends day flowers Nairobi, flowers for girlfriend, romantic bouquets Nairobi, same day delivery flowers",
        content: "Celebrate Girlfriend's Day with our special flower arrangements. Handcrafted bouquets, premium roses, and thoughtful gifts to make her feel cherished.",
        h1: "Girlfriend's Day Flowers"
      },
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
        title: 'Anniversary Flowers Nairobi | Wedding Anniversary Bouquets & Gifts',
        description: 'Celebrate your wedding anniversary with beautiful flowers in Nairobi. Romantic anniversary bouquets, red roses, and special gifts with same-day delivery.',
        keywords: 'anniversary flowers Nairobi, anniversary bouquets, wedding anniversary flowers, romantic anniversary gifts, anniversary roses',
        content: 'Celebrate your love story with our stunning anniversary flower collection. From romantic red roses to elegant mixed bouquets, each arrangement is handcrafted to symbolize your enduring commitment. Perfect for 1st, 5th, 10th, 25th, and 50th anniversaries.',
        h1: 'Anniversary Flowers'
      },
      'combos': {
        title: 'Flower Combos Nairobi | Flowers with Cakes & Gifts',
        description: 'Flower combos in Nairobi with cakes, chocolates, and gifts. Perfect flower and gift combinations for every occasion.',
        keywords: 'flower combos Nairobi, flowers with cake, flower gift sets, flower and chocolate combos',
        content: 'Elevate your gifting with our exclusive flower combinations. From flowers with cakes to gift sets with chocolates, our combos create unforgettable moments.',
        h1: 'Flower Combos & Gift Sets'
      },
      'mothers-day': {
        title: "Mother's Day Flowers Kenya | Bouquets for Mum | Nairobi Delivery",
        description: "Beautiful Mother's Day flowers in Kenya. Surprise mum with fresh bouquets, roses & gift combos. Same-day delivery in Nairobi.",
        keywords: "Mother's Day flowers Kenya, Mother's Day bouquets Nairobi, flowers for mum Kenya",
        content: "Celebrate Mum with elegant Mother's Day bouquets crafted by our Nairobi florists. Fresh flowers delivered across Kenya with love.",
        h1: "Mother's Day Flowers"
      },
      'money-bouquet': {
        title: 'Money Bouquet Nairobi Kenya | Creative Cash Flower Gifts',
        description: 'Order stunning money bouquets in Nairobi & Kenya. Creative cash flower arrangements for birthdays, graduations & celebrations.',
        keywords: 'money bouquet Nairobi, money bouquet Kenya, cash bouquet flowers, graduation money bouquet',
        content: 'Make celebrations unforgettable with our signature money bouquets — artistic arrangements that combine fresh flowers with thoughtful cash gifting.',
        h1: 'Money Bouquet Collection'
      }
    };

    return categoryContent[categorySlug] || {
      title: 'Florist in Nairobi | Flower Delivery in Nairobi | Same Day Delivery',
      description: 'Nairobi flower shop with flower delivery Nairobi and same day flower delivery Nairobi. Shop birthday flowers Nairobi, wedding flowers Nairobi, sympathy flowers Nairobi, roses & bouquets for every occasion.',
      keywords: 'florist in Nairobi, Nairobi flower shop, flower delivery Nairobi, same day flower delivery Nairobi, birthday flowers Nairobi, wedding flowers Nairobi, sympathy flowers Nairobi, nairobi florist',
      content: 'Browse handcrafted floral arrangements from our Nairobi flower shop—perfect for birthdays, weddings, sympathy moments, and romantic gestures. Order online for delivery across Nairobi and same day flower delivery Nairobi when available.',
      h1: 'Flower Delivery in Nairobi'
    };
  };

  const currentCategoryContent = getCategoryContent(activeCategory);

  // Check if this is a product UUID URL (should not be indexed)
  const productParam = searchParams.get('product');
  const isProductUuidUrl = productParam && productParam.length > 10;

  const flowersCanonical = `${SITE_URL}/flowers${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`;
  const structuredDataBlocks = useMemo(() => {
    const list = productListSchema(filteredProducts);
    const crumbs = breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Shop Flowers', url: `${SITE_URL}/flowers` },
      ...(activeCategory !== 'all'
        ? [{ name: currentCategoryContent.h1, url: flowersCanonical }]
        : []),
    ]);
    return list ? [crumbs, list] : [crumbs];
  }, [filteredProducts, activeCategory, flowersCanonical, currentCategoryContent.h1]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <PageMetaTags 
        title={currentCategoryContent.title}
        description={currentCategoryContent.description}
        keywords={currentCategoryContent.keywords}
        canonicalUrl={flowersCanonical}
        noindex={isProductUuidUrl}
      />
      <StructuredData data={structuredDataBlocks} />
      <Header />

      {dataSource === 'fallback' && loadError && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 max-w-7xl">
            <p className="text-sm text-amber-900">
              Live catalog temporarily unavailable. Showing cached items — tap retry for fresh stock.
            </p>
            <Button type="button" variant="outline" size="sm" onClick={retry} className="shrink-0 border-amber-300">
              Retry loading
            </Button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 max-w-7xl">
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
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 mb-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Search */}
            <div className="lg:col-span-2 relative">
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
              <SelectTrigger className="w-full rounded-xl border-pink-200">
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
            <div className="hidden lg:flex items-center gap-2 border-l border-pink-200 pl-4 justify-center">
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

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Sidebar - Categories (Hidden on mobile as we have the dropdown at the top) */}
          <aside className="hidden lg:block w-64 shrink-0 mx-auto">
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
              <div className="text-center py-16 bg-white rounded-2xl border border-pink-100 max-w-md mx-auto">
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
              <div className={`grid gap-4 md:gap-6 justify-items-center ${gridSize === 'large'
                ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4'
                }`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.02, 0.5) }} // Reduced delay, capped at 0.5s
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-pink-100">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy" // Add lazy loading for images
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
                        
                        {/* Product Description */}
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description || 
                            `Beautiful ${product.name} perfect for any occasion. Handcrafted with fresh flowers.`
                          }
                        </p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-bold text-pink-600">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        
                        {/* View Details Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-pink-200 text-pink-600 hover:bg-pink-50 mb-2"
                          onClick={() => handleViewProduct(product)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
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

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={isInWishlist}
      />
    </div>
  );
};

export default FlowersPage;
