import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, DEFAULT_OG_IMAGE, KENYA_KEYWORDS } from '../../data/seoConfig';

const PageMetaTags = ({
  title,
  description,
  keywords,
  canonicalUrl,
  imageUrl,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  noindex = false,
}) => {
  const defaultTitle =
    'Flowerlifestyle Giftshop | Same-Day Flower Delivery Nairobi';
  const defaultDescription =
    "Kenya's best online florist & gift shop. Fresh flowers & personalized gifts with same-day delivery in Nairobi. Order now!";
  const robotsContent = noindex ? 'noindex, nofollow' : robots;

  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || KENYA_KEYWORDS;
  const canonical = canonicalUrl || `${SITE_URL}/`;
  const image = imageUrl || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <html lang="en-KE" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_KE" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Flower Lifestyle Kenya" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />

      <meta name="language" content="English" />
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Nairobi, Kenya" />
      <meta name="ICBM" content="-1.2921,36.8219" />
    </Helmet>
  );
};

export default PageMetaTags;
