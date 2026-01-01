import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';
import PromoSection from '../components/home/PromoSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

const HomePage = ({ isMobile }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection isMobile={isMobile} />
        <CategoriesSection isMobile={isMobile} />
        <FeaturedProducts isMobile={isMobile} />
        <WhyChooseUs isMobile={isMobile} />
        <TestimonialsSection isMobile={isMobile} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
