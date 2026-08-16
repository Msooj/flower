import React, { useState, useMemo } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, Grid3X3, LayoutGrid, Heart, ShoppingBag, Star, Eye, ChevronDown, X } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import ProductModal from '../components/ui/ProductModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useCurrency } from '../components/ui/CurrencyConverter';
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
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const { category: categoryParam } = useParams(); // from /flowers/:category
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const productParam = searchParams.get('product');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [gridSize, setGridSize] = useState('large');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products: dbProducts, isLoading, loadError, retry } = useProducts({
    limit: 50,
  });

  // --- Clean URL priority: route param > query param (backward compat) ---
  // If user hits /flowers?category=birthday, redirect to /flowers/birthday
  const legacyQueryCategory = searchParams.get('category');
  useEffect(() => {
    if (legacyQueryCategory && !categoryParam) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('category');
      const qs = newParams.toString();
      navigate(`/flowers/${legacyQueryCategory}${qs ? `?${qs}` : ''}`, { replace: true });
    }
  }, [legacyQueryCategory, categoryParam]);

  // Determine active category: prefer route param, fall back to 'all'
  const activeCategory = categoryParam || 'all';

  // Keep searchQuery in sync with ?search= in URL
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    setSearchQuery(urlSearch);
  }, [searchParams]);

  // Sync selectedProduct with ?product= in URL
  useEffect(() => {
    if (productParam && dbProducts && dbProducts.length > 0) {
      const product = dbProducts.find(p => String(p.id) === String(productParam));
      if (product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
      }
    }
  }, [productParam, dbProducts]);

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

  // Product view handlers
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    searchParams.set('product', product.id);
    setSearchParams(searchParams);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    searchParams.delete('product');
    setSearchParams(searchParams);
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

  // Navigate to clean /flowers/:category URL
  const handleCategoryChange = (category) => {
    const qs = searchParams.toString().replace(/category=[^&]*/g, '').replace(/^&|&$/g, '');
    if (category === 'all') {
      navigate(`/flowers${qs ? `?${qs}` : ''}`);
    } else {
      navigate(`/flowers/${category}${qs ? `?${qs}` : ''}`);
    }
  };

  const getCategoryContent = (categorySlug) => {
    const categoryContent = {
      'girlfriends-day': {
        title: "Girlfriend's Day Flowers Nairobi | Romantic Bouquets & Gifts",
        description: "Surprise your girlfriend with fresh flowers on Girlfriend's Day in Nairobi. Red roses, premium bouquets, and special gifts. Same-day delivery available.",
        keywords: "girlfriends day flowers Nairobi, flowers for girlfriend, romantic bouquets Nairobi, same day delivery flowers",
        content: "Celebrate Girlfriend's Day with something truly special from Flower Lifestyle. Our Girlfriend's Day collection features handcrafted bouquets of premium red roses, pink peonies, and mixed seasonal blooms — all freshly sourced and beautifully arranged. Whether you want a classic dozen roses, an elegant box arrangement, or a luxurious flower and gift combo, we have the perfect option to make her feel cherished. Every bouquet is prepared the same day and delivered across Nairobi, including Westlands, Kilimani, Karen, Lavington, and the CBD. Add a personalised message card to make it even more meaningful. Order before 2 PM for same-day delivery in Nairobi.",
        h1: "Girlfriend's Day Flowers in Nairobi"
      },
      'birthday': {
        title: 'Birthday Flowers Nairobi | Same Day Birthday Bouquet Delivery',
        description: 'Celebrate birthdays with beautiful flower bouquets delivered same day in Nairobi. Fresh birthday flowers, cake combos, and special arrangements from KES 2,500.',
        keywords: 'birthday flowers Nairobi, birthday flower delivery, birthday bouquets Kenya, same day birthday flowers, birthday roses Nairobi',
        content: "Make their birthday truly unforgettable with our stunning birthday flower collection. From vibrant sunflower arrangements to elegant mixed roses and lilies, every bouquet is hand-crafted with the freshest blooms sourced daily at City Market, Nairobi CBD. We offer a wide range of birthday flowers — from single-stem roses to grand floral towers — as well as flower and cake combos that turn a birthday into a full celebration. Our expert florists add thoughtful personal touches to every order, including custom message cards and premium wrapping. We deliver same-day to all major Nairobi neighbourhoods including Westlands, Kilimani, Karen, Lavington, Kasarani, and Gigiri. Prices start from KES 2,500. Order before 2 PM for same-day delivery.",
        h1: 'Birthday Flowers in Nairobi'
      },
      'romance': {
        title: 'Romantic Flowers Nairobi | Red Roses & Love Bouquets | Same Day',
        description: 'Express your love with romantic flowers in Nairobi. Red roses, romantic bouquets, and anniversary flowers with same-day delivery across Nairobi from KES 2,500.',
        keywords: 'romantic flowers Nairobi, red roses delivery Nairobi, romantic bouquets Kenya, love flowers Nairobi, Valentine flowers Nairobi',
        content: "Ignite romance with our exquisite collection of love flowers and passionate red rose arrangements. Whether you're celebrating Valentine's Day, a anniversary, a first date, or simply want to say 'I love you', our romantic bouquets are designed to leave a lasting impression. Choose from classic dozen red rose bouquets, premium mixed arrangements with lilies and peonies, or our signature luxury romance packages complete with chocolates and a scented candle. All arrangements are handcrafted by our skilled Nairobi florists using the freshest flowers available. We offer same-day delivery across Nairobi to Westlands, Kilimani, Karen, Lavington, Gigiri, Kasarani, and the CBD. Order by 2 PM for same-day delivery. Prices start from KES 2,500.",
        h1: 'Romantic Flowers & Red Roses in Nairobi'
      },
      'roses': {
        title: 'Roses Delivery Nairobi | Red, Pink & White Roses | Same Day',
        description: 'Premium rose bouquet delivery in Nairobi. Red roses, pink roses, white roses with same-day delivery. Fresh rose arrangements from KES 2,500. Order online now.',
        keywords: 'roses delivery Nairobi, red roses Nairobi, rose bouquets Kenya, fresh roses delivery, buy roses Nairobi, pink roses Kenya',
        content: "Experience the timeless elegance of our premium rose collection. We stock a wide variety of fresh roses daily — classic red roses, romantic pink roses, pure white roses, and colourful mixed varieties — all sourced fresh every morning to guarantee lasting beauty. Our rose bouquets range from a simple single-stem presentation to grand 50-rose arrangements, suitable for every occasion and budget. Roses are Kenya's most popular flower gift, and Flower Lifestyle is Nairobi's trusted rose delivery specialist. Each bouquet is hand-tied by our expert florists, wrapped in premium paper, and delivered in protective packaging to ensure the blooms arrive in perfect condition. We deliver same-day across Nairobi including Westlands, Kilimani, Karen, Lavington, Gigiri, Kasarani, and Upper Hill. Prices start from KES 2,500.",
        h1: 'Premium Roses Delivery in Nairobi'
      },
      'anniversary': {
        title: 'Anniversary Flowers Nairobi | Wedding Anniversary Bouquets & Gifts',
        description: 'Celebrate your wedding anniversary with beautiful flowers in Nairobi. Romantic anniversary bouquets, red roses, and special gifts with same-day delivery from KES 3,000.',
        keywords: 'anniversary flowers Nairobi, anniversary bouquets Kenya, wedding anniversary flowers, romantic anniversary gifts, anniversary roses Nairobi',
        content: "Celebrate every chapter of your love story with our curated anniversary flower collection. Whether it's your 1st, 5th, 10th, 25th, or 50th anniversary, we have the perfect arrangement to honour the occasion. Our anniversary bouquets feature luxurious red roses, elegant white lilies, and premium mixed blooms — all handcrafted by our Nairobi florists with meticulous care. Pair a bouquet with our anniversary gift combos, which include champagne, chocolates, and personalised keepsakes for a truly memorable gift. We understand that anniversaries are milestone moments, which is why we treat every order with special attention to detail. Same-day delivery is available across Nairobi to Westlands, Karen, Kilimani, Lavington, Gigiri, Kasarani, and the CBD. Prices start from KES 3,000. Order before 2 PM for same-day delivery.",
        h1: 'Anniversary Flowers in Nairobi'
      },
      'combos': {
        title: 'Flower Gift Combos Nairobi | Flowers with Cake, Chocolate & Gifts',
        description: 'Order flower gift combos in Nairobi — flowers with cakes, chocolates, and premium gifts. Same-day delivery available. Perfect for birthdays & anniversaries.',
        keywords: 'flower combos Nairobi, flowers with cake Nairobi, gift combos Kenya, flower and chocolate gift, birthday flower combo Nairobi',
        content: "Elevate your gifting with our exclusive flower and gift combination packages. Our combos are designed to make a bigger impact than flowers alone — pairing stunning fresh bouquets with premium extras like custom celebration cakes, artisan chocolates, scented candles, soft toys, and luxury gift wrapping. Our flower combos are perfect for birthdays, anniversaries, graduations, Mother's Day, Girlfriend's Day, and any celebration where you want to go the extra mile. Available in a range of sizes from a 'Standard Combo' to our spectacular 'Mega Celebration Package', there's an option for every budget. All combos are assembled on the day of delivery to ensure freshness and are delivered across Nairobi including Westlands, Kilimani, Karen, Lavington, Kasarani, and the CBD. Prices start from KES 4,500.",
        h1: 'Flower Gift Combos in Nairobi'
      },
      'mothers-day': {
        title: "Mother's Day Flowers Kenya | Bouquets for Mum | Nairobi Delivery",
        description: "Beautiful Mother's Day flowers in Kenya. Surprise mum with fresh bouquets, roses & gift combos. Same-day delivery in Nairobi from KES 2,500. Order online.",
        keywords: "Mother's Day flowers Kenya, Mother's Day bouquets Nairobi, flowers for mum Kenya, mothers day roses Nairobi",
        content: "Show Mum just how much she means to you with an exquisitely crafted Mother's Day bouquet from Flower Lifestyle. Our Mother's Day collection is designed to reflect a mother's elegance and warmth, featuring the freshest pink and white roses, cheerful gerberas, soft carnations, and lush mixed seasonal blooms. Choose from a simple yet heartfelt bouquet to a grand arrangement paired with chocolates and a personalised card. Our Nairobi florists prepare every order with love and care, ensuring the highest quality blooms are used in each arrangement. We offer same-day delivery across Nairobi including Westlands, Kilimani, Karen, Lavington, Gigiri, Kasarani, and the CBD. Don't leave it too late — order early to guarantee same-day delivery. Prices start from KES 2,500.",
        h1: "Mother's Day Flowers in Nairobi & Kenya"
      },
      'money-bouquet': {
        title: 'Money Bouquet Nairobi | Creative Cash Flower Gifts | Same Day',
        description: 'Order creative money bouquets in Nairobi & Kenya. Cash flower arrangements for birthdays, graduations & celebrations. Same-day delivery. Pay via M-Pesa.',
        keywords: 'money bouquet Nairobi, money bouquet Kenya, cash bouquet flowers Nairobi, graduation money bouquet, money roses Kenya',
        content: "Surprise someone with a truly unique gift — a Flower Lifestyle Money Bouquet. Our signature money bouquets artistically combine fresh flowers with cash notes, creating a stunning arrangement that is as generous as it is beautiful. Ideal for graduations, 21st birthdays, farewell gifts, or any occasion where cash is the perfect present, our money bouquets are handcrafted to impress. Available in a range of denominations to suit your budget, each money bouquet is assembled with fresh blooms including roses and seasonal fillers, then finished with premium ribbon and wrapping. We deliver same-day across Nairobi to Westlands, Kilimani, Karen, Lavington, Kasarani, Gigiri, and the CBD. Payment is accepted via M-Pesa, Visa, and Mastercard. Order before 2 PM for same-day delivery in Nairobi.",
        h1: 'Money Bouquet Delivery in Nairobi'
      }
    };

    return categoryContent[categorySlug] || {
      title: 'Florist in Nairobi | Flower Delivery in Nairobi | Same Day Delivery',
      description: 'Nairobi flower shop with same-day flower delivery across Nairobi. Shop birthday flowers, anniversary bouquets, romantic roses, gift combos & money bouquets. Order online, pay via M-Pesa.',
      keywords: 'florist in Nairobi, Nairobi flower shop, flower delivery Nairobi, same day flower delivery Nairobi, birthday flowers Nairobi, roses Nairobi, nairobi florist, buy flowers online Kenya',
      content: 'Browse our full collection of handcrafted floral arrangements from Flower Lifestyle — Nairobi\'s trusted online florist and gift shop based at City Market, Nairobi CBD. We specialise in same-day flower delivery across all major Nairobi neighbourhoods including Westlands, Kilimani, Karen, Lavington, Kasarani, and Gigiri. Whether you need birthday flowers, anniversary roses, romantic bouquets, money bouquets, or complete gift combos, our skilled florists craft every arrangement with fresh blooms sourced daily. We also deliver flowers countrywide across Kenya. All orders can be paid via M-Pesa, Visa, or Mastercard. Prices start from KES 2,500.',
      h1: 'Flower Delivery in Nairobi — Same Day'
    };
  };

  const currentCategoryContent = getCategoryContent(activeCategory);

  // Dynamic meta title based on active product or category
  const pageMetaTitle = useMemo(() => {
    if (productParam && selectedProduct) {
      return `${selectedProduct.name} | Flowerlifestyle Giftshop`;
    }
    return currentCategoryContent.title;
  }, [productParam, selectedProduct, currentCategoryContent.title]);

  // Dynamic meta description based on active product or category
  const pageMetaDescription = useMemo(() => {
    if (productParam && selectedProduct) {
      return selectedProduct.description || `${selectedProduct.name} — Beautiful handcrafted flowers from Flowerlifestyle Giftshop. Same day delivery in Nairobi.`;
    }
    return currentCategoryContent.description;
  }, [productParam, selectedProduct, currentCategoryContent.description]);

  // Clean canonical URL — uses /flowers/:category format (no query params)
  // Product modal overlay points canonical back to the category page to avoid duplicates.
  const pageCanonicalUrl = useMemo(() => {
    const base = activeCategory !== 'all'
      ? `${SITE_URL}/flowers/${activeCategory}`
      : `${SITE_URL}/flowers`;
    // ?product= is UI-only — canonical always points to the category page
    return base;
  }, [activeCategory]);

  const structuredDataBlocks = useMemo(() => {
    const list = productListSchema(filteredProducts);
    const crumbs = breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Flower Delivery Nairobi', url: `${SITE_URL}/flowers` },
      ...(activeCategory !== 'all'
        ? [{ name: currentCategoryContent.h1, url: pageCanonicalUrl }]
        : []),
    ]);
    return list ? [crumbs, list] : [crumbs];
  }, [filteredProducts, activeCategory, pageCanonicalUrl, currentCategoryContent.h1]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-x-hidden">
      <PageMetaTags
        title={pageMetaTitle}
        description={pageMetaDescription}
        keywords={currentCategoryContent.keywords}
        canonicalUrl={pageCanonicalUrl}
        noindex={!!productParam}
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
                placeholder="Search Flowerlifestyle giftshop..."
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
              <div className={`grid gap-4 md:gap-6 justify-items-center ${
                gridSize === 'large'
                  ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4'
              }`}>
                {Array.from({ length: gridSize === 'large' ? 6 : 8 }).map((_, i) => (
                  <div key={i} className="w-full animate-pulse">
                    <div className="bg-gray-200 rounded-2xl aspect-square mb-3" />
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                  </div>
                ))}
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
                            aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                          </Button>

                          <Button
                            size="icon"
                            className="bg-pink-500 text-white hover:bg-pink-600 rounded-full shadow-lg h-9 w-9"
                            onClick={() => {
                              addToCart(product);
                            }}
                            aria-label="Add to cart"
                          >
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
