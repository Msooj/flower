import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageMetaTags = ({ title, description, keywords, canonicalUrl, imageUrl }) => {
  const defaultTitle = "Flower Delivery Nairobi | Same Day Florist Services | Online Flower Shop Kenya";
  const defaultDescription = "Order flowers online in Nairobi with same-day delivery. Birthday flowers, anniversary bouquets, funeral wreaths, red roses delivery. Trusted florist in Nairobi with fresh flowers and premium arrangements.";
  const defaultKeywords = "flower delivery Nairobi, florist in Nairobi, online flower shop Kenya, birthday flowers Nairobi, anniversary bouquets Kenya, funeral wreaths Nairobi, same day flower delivery Nairobi, order flowers online Nairobi, red roses delivery Nairobi, lilies and carnations Kenya";
  const defaultImage = "https://duazdpldzqodpucqoyta.supabase.co/storage/v1/object/public/products/products/1766216396653_hd1fdp.jpeg";

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || "https://www.flowerlifestyle.co.ke/"} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl || "https://www.flowerlifestyle.co.ke/"} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={imageUrl || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Flower Lifestyle Kenya" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl || "https://www.flowerlifestyle.co.ke/"} />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={imageUrl || defaultImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="country" content="Kenya" />
      <meta name="geo.region" content="KE-NB" />
      <meta name="geo.placename" content="Nairobi" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
    </Helmet>
  );
};

export default PageMetaTags;
