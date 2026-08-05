import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "./components/ui/sonner";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import CurrencyProvider from "./components/ui/CurrencyConverter";
import HomePage from "./pages/HomePage";
import FlowersPage from "./pages/FlowersPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AdminPage from "./pages/AdminPage";
import OrdersPage from "./pages/OrdersPage";
import AboutPage from "./pages/AboutPage";
import FloristKenyaPage from "./pages/FloristKenyaPage";
import DeliveryPage from "./pages/DeliveryPage";
import FaqPage from "./pages/FaqPage";
import BlogPage from "./pages/BlogPage";
import ArticlePage from "./pages/ArticlePage";
import NeighborhoodPage from "./pages/NeighborhoodPage";
import SameDayDeliveryPage from "./pages/SameDayDeliveryPage";
import MoneyBouquetPage from "./pages/MoneyBouquetPage";
import CorporateGiftsPage from "./pages/CorporateGiftsPage";
import WhatsAppButton from "./components/common/WhatsAppButton";
import GoogleAnalytics from "./components/seo/GoogleAnalytics";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuthCallback } from "./hooks/useAuthCallback";
import { neighborhoods } from "./data/neighborhoodData";

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
          <CurrencyProvider>
            <HelmetProvider>
              <BrowserRouter>
                <ScrollToTop />
                <GoogleAnalytics />
                <AuthWrapper>
                  <Routes>
                    <Route path="/" element={<HomePage isMobile={isMobile} />} />
                    <Route path="/flowers" element={<FlowersPage isMobile={isMobile} />} />
                    <Route path="/florist-kenya" element={<FloristKenyaPage />} />
                    <Route path="/delivery" element={<DeliveryPage />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<ArticlePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/admin" element={<AdminPage />} />

                    {/* Neighborhood local SEO pages */}
                    {neighborhoods.map((n) => (
                      <Route
                        key={n.slug}
                        path={n.route}
                        element={<NeighborhoodPage data={n} />}
                      />
                    ))}

                    {/* Topical authority pages */}
                    <Route path="/same-day-flower-delivery-nairobi" element={<SameDayDeliveryPage />} />
                    <Route path="/money-bouquet-nairobi" element={<MoneyBouquetPage />} />
                    <Route path="/corporate-flower-gifts-nairobi" element={<CorporateGiftsPage />} />

                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </AuthWrapper>
              </BrowserRouter>
            </HelmetProvider>
            <WhatsAppButton />
            <Toaster position="top-right" richColors />
          </CurrencyProvider>
        </WishlistProvider>
      </CartProvider>
    </div>
  );
}

export default App;
