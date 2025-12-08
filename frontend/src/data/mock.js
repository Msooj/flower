// Mock data for Flower Lifestyle website

export const categories = [
  { id: 1, name: "Birthday", image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400", slug: "birthday" },
  { id: 2, name: "Roses", image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400", slug: "roses" },
  { id: 3, name: "Romance", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400", slug: "romance" },
  { id: 4, name: "Anniversary", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400", slug: "anniversary" },
  { id: 5, name: "Combos", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400", slug: "combos" },
  { id: 6, name: "Sympathy", image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400", slug: "sympathy" }
];

export const featuredProducts = [
  {
    id: 1,
    name: "Pink Rose Elegance",
    price: 4500,
    originalPrice: 5200,
    image: "https://images.unsplash.com/photo-1712258093579-190d48841a93?w=500",
    category: "roses",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Blush Peony Bouquet",
    price: 6800,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1599215966323-88d801b84771?w=500",
    category: "birthday",
    badge: "New",
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "Romance Rose Box",
    price: 7200,
    originalPrice: 8500,
    image: "https://images.unsplash.com/photo-1712258091779-48b46ad77437?w=500",
    category: "romance",
    badge: "Sale",
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Luxury Vase Arrangement",
    price: 9600,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1722289702402-2bbd33f3e328?w=500",
    category: "anniversary",
    badge: null,
    rating: 5.0,
    reviews: 45
  }
];

export const allProducts = [
  ...featuredProducts,
  {
    id: 5,
    name: "Sweet Pink Tulips",
    price: 3200,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500",
    category: "birthday",
    badge: null,
    rating: 4.6,
    reviews: 78
  },
  {
    id: 6,
    name: "Romantic Red & Pink Mix",
    price: 5500,
    originalPrice: 6200,
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500",
    category: "romance",
    badge: "Popular",
    rating: 4.8,
    reviews: 203
  },
  {
    id: 7,
    name: "Celebration Combo",
    price: 8900,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500",
    category: "combos",
    badge: null,
    rating: 4.5,
    reviews: 67
  },
  {
    id: 8,
    name: "Garden Fresh Bouquet",
    price: 4200,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500",
    category: "birthday",
    badge: null,
    rating: 4.7,
    reviews: 91
  },
  {
    id: 9,
    name: "Eternal Love Roses",
    price: 11500,
    originalPrice: 13000,
    image: "https://images.unsplash.com/photo-1518882605630-8eb578d60a6d?w=500",
    category: "anniversary",
    badge: "Premium",
    rating: 4.9,
    reviews: 134
  },
  {
    id: 10,
    name: "Pastel Dreams",
    price: 5800,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
    category: "roses",
    badge: null,
    rating: 4.6,
    reviews: 56
  },
  {
    id: 11,
    name: "White Lily Sympathy",
    price: 6500,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=500",
    category: "sympathy",
    badge: null,
    rating: 4.8,
    reviews: 42
  },
  {
    id: 12,
    name: "Chocolate & Roses Combo",
    price: 7800,
    originalPrice: 8900,
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500",
    category: "combos",
    badge: "Gift",
    rating: 4.9,
    reviews: 178
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Nairobi",
    rating: 5,
    comment: "Absolutely stunning flowers! The pink roses were fresh and beautifully arranged. Delivery was on time too!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
  },
  {
    id: 2,
    name: "James K.",
    location: "Mombasa",
    rating: 5,
    comment: "My wife loved the anniversary bouquet. The quality exceeded my expectations. Will definitely order again!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
  },
  {
    id: 3,
    name: "Grace W.",
    location: "Nairobi",
    rating: 5,
    comment: "Best flower delivery service! The arrangements are always gorgeous and the customer service is excellent.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
  }
];

export const whyChooseUs = [
  {
    id: 1,
    title: "Fresh Flowers Daily",
    description: "We source the freshest blooms every morning to ensure lasting beauty",
    icon: "Flower2"
  },
  {
    id: 2,
    title: "Same Day Delivery",
    description: "Order before 2PM for same day delivery within Nairobi",
    icon: "Truck"
  },
  {
    id: 3,
    title: "Expert Florists",
    description: "Our skilled florists create stunning arrangements with love and care",
    icon: "Sparkles"
  },
  {
    id: 4,
    title: "Satisfaction Guaranteed",
    description: "Not happy? We'll make it right or give you a full refund",
    icon: "ShieldCheck"
  }
];

export const contactInfo = {
  phone: "+254 712 345 678",
  whatsapp: "+254 712 345 678",
  email: "hello@flowerlifestyle.co.ke",
  address: "123 Flower Lane, Westlands, Nairobi",
  hours: "Mon - Sat: 8AM - 7PM, Sun: 9AM - 5PM"
};

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/flowers" },
  { name: "Birthday", href: "/flowers?category=birthday" },
  { name: "Romance", href: "/flowers?category=romance" },
  { name: "Combos", href: "/flowers?category=combos" }
];
