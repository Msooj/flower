import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Cake, Truck, Star, Phone, MessageCircle, ArrowRight, CheckCircle, Gift, Heart
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { Button } from '../components/ui/button';
import {
  SITE_URL, BUSINESS, PAGE_KEYWORDS, floristSchema, breadcrumbSchema, faqSchema,
} from '../data/seoConfig';

const BIRTHDAY_FAQS = [
  {
    question: 'Can you deliver birthday flowers on the same day in Nairobi?',
    answer:
      'Yes. Place your order before 2 PM Monday–Saturday and we will deliver within Nairobi the same day. We cover CBD, Westlands, Karen, Kilimani, Lavington, Kasarani, Thika Road, and many more neighbourhoods. WhatsApp us at 0742 370 307 for urgent requests.',
  },
  {
    question: 'What are the most popular birthday flower arrangements in Nairobi?',
    answer:
      'Our most-requested birthday bouquets are: vibrant mixed gerbera and lily arrangements (great for photos), classic red or pink rose collections, money bouquets for a practical-yet-beautiful gift, and flower-plus-gift combos that include chocolates, balloons, or a plush toy.',
  },
  {
    question: 'How much do birthday flowers cost in Nairobi?',
    answer:
      'Birthday bouquets at Flower Lifestyle start from KES 3,000 for compact, colourful arrangements and go up to KES 12,000+ for large premium rose collections with balloon or chocolate add-ons. All prices are clearly displayed in the online shop.',
  },
  {
    question: 'Can I add a personalised birthday message to the flowers?',
    answer:
      'Absolutely. You can include a custom message card at checkout at no extra charge. If you want a specific card design or handwritten note, mention it in the order comments or message us on WhatsApp.',
  },
  {
    question: 'Do you deliver birthday flowers to workplaces and offices in Nairobi?',
    answer:
      'Yes! We regularly deliver birthday bouquets to offices, co-working spaces, hospitals, universities, and homes across Nairobi. Just provide the recipient\'s building name, floor, and phone number at checkout.',
  },
];

const ARRANGEMENTS = [
  {
    emoji: '🌹',
    name: 'Classic Red Roses',
    desc: 'Timeless and romantic — a dozen premium red roses that make any birthday unforgettable.',
    price: 'From KES 4,500',
  },
  {
    emoji: '🌸',
    name: 'Mixed Gerbera Burst',
    desc: 'Vibrant, colourful, and cheerful — perfect for a friend, colleague, or anyone who loves bold colour.',
    price: 'From KES 3,000',
  },
  {
    emoji: '💐',
    name: 'Lily & Rose Elegance',
    desc: 'Sophisticated white lilies paired with pink or red roses for a premium birthday statement.',
    price: 'From KES 5,500',
  },
  {
    emoji: '💵',
    name: 'Money Bouquet',
    desc: 'Banknotes folded into flower shapes — a unique, practical, and stunning birthday gift.',
    price: 'Custom pricing',
  },
  {
    emoji: '🎁',
    name: 'Flower + Gift Combo',
    desc: 'Fresh bouquet paired with chocolates, a balloon, or a plush toy for a complete birthday surprise.',
    price: 'From KES 5,000',
  },
  {
    emoji: '🌻',
    name: 'Sunflower & Mixed',
    desc: 'Bright, positive energy — sunflowers mixed with seasonal blooms for the free-spirited birthday person.',
    price: 'From KES 3,500',
  },
];

const BirthdayFlowersPage = () => {
  const canonical = `${SITE_URL}/birthday-flowers-nairobi`;

  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Birthday Flowers Nairobi | Same-Day Birthday Flower Delivery"
        description="Order birthday flowers in Nairobi with same-day delivery. Fresh roses, mixed bouquets, money bouquets & gift combos for any birthday. Pay with M-Pesa. Order before 2 PM for same-day delivery across Nairobi."
        keywords={PAGE_KEYWORDS.birthday}
        canonicalUrl={canonical}
      />
      <StructuredData
        data={[
          floristSchema(),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Birthday Flowers Nairobi', url: canonical },
          ]),
          faqSchema(BIRTHDAY_FAQS),
        ]}
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-pink-600 via-rose-500 to-pink-400 text-white overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: 80 + i * 30,
                  height: 80 + i * 30,
                  top: `${10 + i * 10}%`,
                  left: `${5 + i * 12}%`,
                }}
              />
            ))}
          </div>
          <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-5xl">
            <nav className="text-pink-200 text-sm mb-6 flex items-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Birthday Flowers Nairobi</span>
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <Cake className="w-4 h-4" />
                Same-Day Birthday Delivery Nairobi
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Birthday Flowers in Nairobi
              </h1>
              <p className="text-lg md:text-xl text-pink-100 max-w-2xl mb-8 leading-relaxed">
                Handcrafted birthday bouquets delivered fresh across Nairobi — same day when you order before 2 PM.
                Roses, mixed arrangements, money bouquets, and gift combos prepared daily at our City Market workshop.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-pink-600 hover:bg-pink-50 font-semibold shadow-lg"
                >
                  <Link to="/flowers?category=birthday">
                    Shop Birthday Flowers <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Order
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-pink-50 border-b border-pink-100">
          <div className="container mx-auto px-4 py-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: Truck, label: 'Same-Day Delivery', color: 'text-pink-500' },
                { icon: Star, label: '4.8★ Google Rating', color: 'text-amber-500' },
                { icon: CheckCircle, label: 'M-Pesa Accepted', color: 'text-green-500' },
                { icon: Gift, label: 'Free Message Card', color: 'text-pink-500' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 py-2">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="text-xs font-semibold text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 max-w-5xl">

          {/* Why flowers for birthdays */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why send birthday flowers in Nairobi?
            </h2>
            <div className="prose prose-pink max-w-none text-gray-600 space-y-4">
              <p>
                Birthday flowers are one of the most thoughtful gifts you can send in Nairobi — they arrive fresh,
                smell beautiful, and immediately brighten any room. Unlike physical gifts, a handcrafted bouquet shows
                personal effort: you chose the flowers, the colours, and the message, and had them delivered to
                exactly where the birthday person is.
              </p>
              <p>
                At <strong>Flower Lifestyle</strong>, we prepare every birthday arrangement fresh on the day of
                delivery at our <strong>City Market workshop in Nairobi CBD</strong>. We source blooms daily from
                Kenya's leading flower farms, ensuring your birthday flowers look and smell at their very best when
                they arrive — not a petal out of place.
              </p>
              <p>
                Whether you're surprising a partner at work in Westlands, a friend in Kilimani, a parent in Karen, or
                a colleague along Thika Road, our riders deliver across all major Nairobi neighbourhoods. Order by
                2 PM for same-day delivery, or schedule delivery for a specific time by messaging us on WhatsApp.
              </p>
            </div>
          </motion.section>

          {/* Arrangements grid */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Popular birthday flower arrangements
            </h2>
            <p className="text-gray-600 mb-6">Hand-prepared fresh every day at our City Market florist</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {ARRANGEMENTS.map((item) => (
                <Link
                  key={item.name}
                  to="/flowers?category=birthday"
                  className="group rounded-2xl border border-pink-100 bg-pink-50/40 p-5 hover:shadow-md hover:border-pink-300 transition-all duration-200"
                >
                  <span className="text-4xl block mb-3">{item.emoji}</span>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.desc}</p>
                  <span className="text-xs font-semibold text-pink-600">{item.price}</span>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Budget guide */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Birthday flower budget guide — Nairobi prices
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  tier: 'Thoughtful',
                  range: 'KES 3,000 – 4,999',
                  includes: ['Compact mixed bouquet', 'Single-type arrangement', 'Message card included'],
                  accent: 'border-pink-200 bg-pink-50/40',
                },
                {
                  tier: 'Premium',
                  range: 'KES 5,000 – 7,999',
                  includes: ['Large rose or lily bouquet', 'Add balloon or chocolates', 'Priority same-day delivery'],
                  accent: 'border-pink-400 bg-pink-50 shadow-md',
                  badge: 'Most popular',
                },
                {
                  tier: 'Luxury',
                  range: 'KES 8,000+',
                  includes: ['100-stem rose displays', 'Flower + wine + chocolate combo', 'Custom wrapping & ribbon'],
                  accent: 'border-rose-300 bg-rose-50/40',
                },
              ].map(({ tier, range, includes, accent, badge }) => (
                <div key={tier} className={`rounded-2xl border p-6 ${accent} relative`}>
                  {badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {badge}
                    </span>
                  )}
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{tier}</h3>
                  <p className="text-pink-600 font-semibold text-sm mb-4">{range}</p>
                  <ul className="space-y-2">
                    {includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* How to order */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              How to order birthday flowers in Nairobi
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: 'Browse & Choose',
                  desc: 'Pick your birthday arrangement online — roses, mixed bouquets, money bouquets, or a full gift combo.',
                },
                {
                  step: '2',
                  title: 'Pay via M-Pesa or Card',
                  desc: 'Complete checkout in minutes. M-Pesa, Visa, and Mastercard all accepted. Fully secure.',
                },
                {
                  step: '3',
                  title: 'We Deliver',
                  desc: 'Your fresh bouquet is prepared at City Market and delivered to your Nairobi address — same day if ordered before 2 PM.',
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Flower care tip teaser */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 rounded-2xl bg-pink-50 border border-pink-100 p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              Tip: Help birthday flowers last longer
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Keep cut flowers in a clean vase with fresh, cool water. Re-cut the stems at an angle every 2 days,
              remove any leaves sitting below the waterline, and keep arrangements away from direct sunlight and
              ripening fruit. Done right, birthday roses from Flower Lifestyle will stay beautiful for 7–10 days.
            </p>
            <Link to="/blog/flower-care-tips-nairobi" className="text-pink-600 font-medium text-sm hover:underline">
              Read our full flower care guide →
            </Link>
          </motion.section>

          {/* FAQ */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently asked questions — birthday flowers Nairobi
            </h2>
            <div className="space-y-4">
              {BIRTHDAY_FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-gray-200 bg-gray-50/50 p-5 open:bg-white open:shadow-sm transition-all"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-pink-500 group-open:rotate-180 transition-transform ml-4 flex-shrink-0">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </motion.section>

          {/* Related pages */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Explore more from Flower Lifestyle</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Red Roses Delivery', href: '/roses-delivery-nairobi' },
                { label: 'Anniversary Flowers', href: '/anniversary-flowers-nairobi' },
                { label: 'Money Bouquets', href: '/money-bouquet-nairobi' },
                { label: 'Same-Day Delivery', href: '/same-day-flower-delivery-nairobi' },
                { label: 'Florist in Nairobi', href: '/florist-kenya' },
                { label: 'Corporate Flowers', href: '/corporate-flower-gifts-nairobi' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-sm font-medium hover:bg-pink-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.section>

          {/* CTA Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 text-white p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Order birthday flowers in Nairobi today
            </h2>
            <p className="text-pink-100 mb-8 max-w-lg mx-auto">
              Fresh bouquets, same-day delivery, M-Pesa accepted. Order before 2 PM — delivered across Nairobi by evening.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold">
                <Link to="/flowers?category=birthday">Shop Birthday Flowers <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp {BUSINESS.phoneDisplay}
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-pink-100 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              <a href={`tel:${BUSINESS.phone}`} className="underline">{BUSINESS.phoneDisplay}</a>
              · {BUSINESS.email}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BirthdayFlowersPage;
