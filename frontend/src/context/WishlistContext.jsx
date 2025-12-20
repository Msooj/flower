import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const WishlistContext = createContext();

export const useWishlist = () => {
    return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const savedWishlist = localStorage.getItem('flower_wishlist');
            return savedWishlist ? JSON.parse(savedWishlist) : [];
        } catch (e) {
            console.error("Failed to parse wishlist from storage", e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('flower_wishlist', JSON.stringify(wishlist));
        } catch (e) {
            console.error("Failed to save wishlist to storage", e);
        }
    }, [wishlist]);

    const addToWishlist = (product) => {
        if (wishlist.some(item => item.id === product.id)) {
            toast.info(`${product.name} is already in your wishlist`);
            return;
        }
        setWishlist([...wishlist, product]);
        toast.success(`${product.name} added to wishlist!`);
    };

    const removeFromWishlist = (productId) => {
        setWishlist(wishlist.filter(item => item.id !== productId));
        toast.info('Item removed from wishlist');
    };

    const toggleWishlist = (product) => {
        if (wishlist.some(item => item.id === product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                isInWishlist,
                clearWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
