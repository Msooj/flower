import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [cart, setCart] = useState([]);

    // Get current user and listen for auth changes
    useEffect(() => {
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUserId(session?.user?.id || 'anonymous');
        };

        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUserId(session?.user?.id || 'anonymous');
        });

        return () => subscription.unsubscribe();
    }, []);

    // Load cart when userId changes
    useEffect(() => {
        if (!userId) return;

        try {
            const savedCart = localStorage.getItem(`flower_cart_${userId}`);
            // If we're logging in from anonymous to a real user, we might want to merge carts
            // For now, just load the user's specific cart
            setCart(savedCart ? JSON.parse(savedCart) : []);

            // If we just logged in, check if there's an anonymous cart to merge
            if (userId !== 'anonymous') {
                const anonCart = localStorage.getItem('flower_cart_anonymous');
                if (anonCart) {
                    const parsedAnon = JSON.parse(anonCart);
                    if (parsedAnon.length > 0) {
                        setCart(prev => {
                            const newCart = [...prev];
                            parsedAnon.forEach(anonItem => {
                                const existing = newCart.find(item => item.id === anonItem.id);
                                if (existing) {
                                    existing.quantity += anonItem.quantity;
                                } else {
                                    newCart.push(anonItem);
                                }
                            });
                            return newCart;
                        });
                        localStorage.removeItem('flower_cart_anonymous');
                        toast.success('Your persistent cart has been merged');
                    }
                }
            }
        } catch (e) {
            console.error("Failed to parse cart from storage", e);
            setCart([]);
        }
    }, [userId]);

    // Save cart whenever it changes
    useEffect(() => {
        if (!userId) return;
        try {
            localStorage.setItem(`flower_cart_${userId}`, JSON.stringify(cart));
            // Backup for legacy compatibility (though we should avoid it)
            localStorage.setItem('flower_cart', JSON.stringify(cart));
        } catch (e) {
            console.error("Failed to save cart to storage", e);
        }
    }, [cart, userId]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id);
            if (existing) {
                toast.success(`Added another ${product.name} to cart`);
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            toast.success(`${product.name} added to cart`);
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        toast.info('Item removed from cart');
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        if (userId) {
            localStorage.removeItem(`flower_cart_${userId}`);
        }
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
    const cartCount = cart.reduce((count, item) => count + (item.quantity || 0), 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
