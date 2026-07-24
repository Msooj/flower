import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';
import PromoSection from '../components/home/PromoSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ArticlesSection from '../components/home/ArticlesSection';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { SITE_URL, KENYA_KEYWORDS, floristSchema, websiteSchema } from '../data/seoConfig';

const HomePage = ({ isMobile }) => {
  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Flowerlifestyle Giftshop | Same-Day Flower Delivery Nairobi"
        description="Kenya's best online florist & gift shop. Fresh flowers & personalized gifts with same-day delivery in Nairobi. Order now!"
        keywords={KENYA_KEYWORDS}
        canonicalUrl={`${SITE_URL}/`}
      />
      <StructuredData data={[floristSchema(), websiteSchema()]} />

      <Header />
      <main>
        <HeroSection isMobile={isMobile} />
        <CategoriesSection isMobile={isMobile} />
        <FeaturedProducts isMobile={isMobile} />
        <WhyChooseUs isMobile={isMobile} />
        <PromoSection isMobile={isMobile} />
        <ArticlesSection />
        <TestimonialsSection isMobile={isMobile} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
