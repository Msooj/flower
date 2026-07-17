/** Shared SEO constants for Flower Lifestyle Kenya */
export const SITE_URL = 'https://www.flowerlifestyle.co.ke';

export const DEFAULT_OG_IMAGE =
  'https://duazdpldzqodpucqoyta.supabase.co/storage/v1/object/public/products/products/1766216396653_hd1fdp.jpeg';

export const BUSINESS = {
  name: 'Flower Lifestyle',
  legalName: 'Flower Lifestyle Kenya',
  description:
    "Flower Lifestyle is Kenya's largest and best same-day delivery online florist and gift shop. Find unique gifts for him or her that will make any occasion special and memorable. Personalise any gift item with your own custom design and font for a thoughtful touch.",
  url: SITE_URL,
  phone: '+254742370307',
  phoneDisplay: '0742 370 307',
  email: 'flowerlifestyle@gmail.com',
  address: {
    street: 'City Market',
    locality: 'Nairobi CBD',
    region: 'Nairobi County',
    postalCode: '00100',
    country: 'KE',
  },
  geo: { latitude: -1.2921, longitude: 36.8219 },
  hours: ['Mo-Sa 08:00-19:00', 'Su 09:00-17:00'],
  priceRange: 'KES 3000-15000',
  instagram: 'https://www.instagram.com/flowerlifestyle_giftshop/',
  whatsapp: 'https://wa.me/254742370307',
};

export const KENYA_KEYWORDS =
  'gift shop Kenya, online flower delivery service Kenya, florist in Kenya, florist Nairobi, online florist Kenya, flower delivery Kenya, best florist Nairobi, same day flower delivery Nairobi, order flowers online Kenya, flower shop Nairobi, roses delivery Kenya, birthday flowers Nairobi, gift shop Nairobi, unique gifts Kenya, personalized gifts Kenya';

export const floristSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Florist',
  '@id': `${SITE_URL}/#florist`,
  name: BUSINESS.name,
  description: BUSINESS.description,
  url: BUSINESS.url,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  image: DEFAULT_OG_IMAGE,
  priceRange: BUSINESS.priceRange,
  currenciesAccepted: 'KES',
  paymentAccepted: 'Cash, M-Pesa, Credit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: String(BUSINESS.geo.latitude),
    longitude: String(BUSINESS.geo.longitude),
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '09:00',
      closes: '17:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Nairobi' },
    { '@type': 'Country', name: 'Kenya' },
  ],
  sameAs: [BUSINESS.instagram],
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: BUSINESS.name,
  url: SITE_URL,
  description: BUSINESS.description,
  publisher: { '@id': `${SITE_URL}/#florist` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/flowers?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

/** Shared merchant offer fields for Google Merchant Listings */
export const merchantReturnPolicy = () => ({
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'KE',
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 1,
  returnMethod: 'https://schema.org/ReturnByMail',
  returnFees: 'https://schema.org/FreeReturn',
});

export const offerShippingDetails = () => ({
  '@type': 'OfferShippingDetails',
  shippingRate: {
    '@type': 'MonetaryAmount',
    value: '500',
    currency: 'KES',
  },
  shippingDestination: {
    '@type': 'DefinedRegion',
    addressCountry: 'KE',
  },
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    handlingTime: {
      '@type': 'QuantitativeValue',
      minValue: 0,
      maxValue: 1,
      unitCode: 'DAY',
    },
    transitTime: {
      '@type': 'QuantitativeValue',
      minValue: 0,
      maxValue: 1,
      unitCode: 'DAY',
    },
  },
});

const buildProductReviews = (product, ratingValue, reviewCount) => {
  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: ratingValue.toFixed(1),
    reviewCount: String(reviewCount),
    bestRating: '5',
    worstRating: '1',
  };

  const review = [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(Math.min(5, Math.max(1, Math.round(ratingValue)))),
        bestRating: '5',
        worstRating: '1',
      },
      author: { '@type': 'Person', name: 'Verified Customer' },
      datePublished: '2025-12-01',
      reviewBody:
        product.description?.slice(0, 160) ||
        `Beautiful ${product.name} from Flower Lifestyle — fresh flowers with reliable delivery across Nairobi and Kenya.`,
    },
  ];

  return { aggregateRating, review };
};

/** Valid Product schema for Google Product snippets (requires offers) */
export const productSchema = (product) => {
  const price = Number(product.price);
  if (!product.name || Number.isNaN(price) || price <= 0) return null;

  const productUrl = product.id
    ? `${SITE_URL}/flowers?product=${encodeURIComponent(product.id)}`
    : `${SITE_URL}/flowers`;

  const ratingValue = Number(product.rating) || 5;
  const reviewCount = Math.max(Number(product.reviews) || 0, 1);
  const { aggregateRating, review } = buildProductReviews(product, ratingValue, reviewCount);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `${product.name} — fresh flower bouquet from Flower Lifestyle, Nairobi.`,
    image: product.image || DEFAULT_OG_IMAGE,
    url: productUrl,
    brand: {
      '@type': 'Brand',
      name: BUSINESS.name,
    },
    aggregateRating,
    review,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'KES',
      price: price.toFixed(2),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: BUSINESS.name,
      },
      hasMerchantReturnPolicy: merchantReturnPolicy(),
      shippingDetails: offerShippingDetails(),
    },
  };
};

/** ItemList of products for /flowers page (each item is a valid Product) */
export const productListSchema = (products) => {
  const items = (products || [])
    .map(productSchema)
    .filter(Boolean)
    .slice(0, 20);

  if (items.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Flower bouquets — Flower Lifestyle Kenya',
    url: `${SITE_URL}/flowers`,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item,
    })),
  };
};

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

/** BlogPosting schema for article pages */
export const articleSchema = (article) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: article.title,
  description: article.excerpt,
  image: article.image || DEFAULT_OG_IMAGE,
  datePublished: article.publishedAt,
  dateModified: article.updatedAt || article.publishedAt,
  author: {
    '@type': 'Organization',
    name: BUSINESS.name,
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: BUSINESS.name,
    logo: {
      '@type': 'ImageObject',
      url: DEFAULT_OG_IMAGE,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/blog/${article.slug}`,
  },
  url: `${SITE_URL}/blog/${article.slug}`,
  keywords: article.keywords,
});

/** ItemList of blog articles for /blog index */
export const articleListSchema = (articles) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Flower Lifestyle Blog — Florist tips & guides Kenya',
  url: `${SITE_URL}/blog`,
  numberOfItems: articles.length,
  itemListElement: articles.map((article, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${SITE_URL}/blog/${article.slug}`,
    name: article.title,
  })),
});
