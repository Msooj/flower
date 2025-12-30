import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "./components/ui/sonner";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import HomePage from "./pages/HomePage";
import FlowersPage from "./pages/FlowersPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AdminPage from "./pages/AdminPage";
import OrdersPage from "./pages/OrdersPage";
import CustomOrderPage from "./pages/CustomOrderPage";
import WhatsAppButton from "./components/common/WhatsAppButton";
import { useAuthCallback } from "./hooks/useAuthCallback";

// Wrapper component to use hooks that need Router context
const AuthWrapper = ({ children }) => {
  useAuthCallback();
  return <>{children}</>;
};

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AuthWrapper>
              <Routes>
                <Route path="/" element={<HomePage isMobile={isMobile} />} />
                <Route path="/flowers" element={<FlowersPage isMobile={isMobile} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/custom-order" element={<CustomOrderPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </AuthWrapper>
          </BrowserRouter>
          <WhatsAppButton />
          <Toaster position="top-right" richColors />
        </WishlistProvider>
      </CartProvider>
    </div>
  );
}

export default App;
