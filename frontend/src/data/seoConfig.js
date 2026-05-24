/** Shared SEO constants for Flower Lifestyle Kenya */
export const SITE_URL = 'https://www.flowerlifestyle.co.ke';

export const DEFAULT_OG_IMAGE =
  'https://duazdpldzqodpucqoyta.supabase.co/storage/v1/object/public/products/products/1766216396653_hd1fdp.jpeg';

export const BUSINESS = {
  name: 'Flower Lifestyle',
  legalName: 'Flower Lifestyle Kenya',
  description:
    "Kenya's trusted online florist for fresh bouquets, same-day flower delivery in Nairobi, and nationwide gifting. Birthday flowers, roses, anniversary bouquets, funeral wreaths, and gift combos.",
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
  'florist in Kenya, florist Nairobi, online florist Kenya, flower delivery Kenya, best florist Nairobi, same day flower delivery Nairobi, order flowers online Kenya, flower shop Nairobi, roses delivery Kenya, birthday flowers Nairobi';

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
