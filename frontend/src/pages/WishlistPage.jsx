import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, X, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import PageMetaTags from '../components/seo/PageMetaTags';

const WishlistPage = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
        // Optional: Remove from wishlist after adding to cart
        // removeFromWishlist(product.id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
            <PageMetaTags 
                title="Wishlist"
                description="Your saved flower favorites"
                canonicalUrl="https://www.flowerlifestyle.co.ke/wishlist"
                robots="noindex, nofollow"
            />
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Your Wishlist
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600"
                    >
                        {wishlist.length === 0 ? 'Your wishlist is empty' : `You have ${wishlist.length} items in your wishlist`}
                    </motion.p>
                </div>

                {wishlist.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-pink-100 shadow-sm max-w-2xl mx-auto">
                        <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8 text-pink-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-8">Save items you love to your wishlist and review them here later.</p>
                        <Link to="/flowers">
                            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 rounded-xl text-lg">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {wishlist.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-pink-100 group relative"
                            >
                                {/* Remove Button */}
                                <button
                                    onClick={() => removeFromWishlist(product.id)}
                                    className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white text-gray-500 hover:text-red-500 transition-colors"
                                    title="Remove from wishlist"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                {/* Image */}
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {product.originalPrice && (
                                        <span className="absolute bottom-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            Sale
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-pink-600 transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-lg font-bold text-pink-600">
                                            KSh {product.price.toLocaleString()}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through">
                                                KSh {product.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white gap-2"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <ShoppingBag className="w-4 h-4" />
                                            Add to Cart
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                            onClick={() => removeFromWishlist(product.id)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default WishlistPage;
