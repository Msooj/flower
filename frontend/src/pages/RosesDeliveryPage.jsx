import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, Truck, Star, Phone, MessageCircle, ArrowRight, CheckCircle, Leaf
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { Button } from '../components/ui/button';
import {
  SITE_URL, BUSINESS, PAGE_KEYWORDS, floristSchema, breadcrumbSchema, faqSchema,
} from '../data/seoConfig';

const ROSES_FAQS = [
  {
    question: 'Which red roses are best for delivery in Nairobi?',
    answer:
      'We stock premium long-stem Kenyan roses sourced from local flower farms — the same export-quality roses Kenya is famous for worldwide. For delivery, long-stem varieties (50–60 cm) hold up best in transit and last longer in a vase. Our florists select only firm, fully-budded stems for every order.',
  },
  {
    question: 'How many roses should I send for Valentine\'s Day in Kenya?',
    answer:
      'A dozen (12) red roses is the classic romantic gesture and remains our most popular Valentine\'s order. For a stronger impression, 24 or 50 roses are increasingly popular. On special milestones — a proposal, a significant anniversary — 100-stem displays make a spectacular statement. Our shop shows all size options with pricing.',
  },
  {
    question: 'What is the difference between red, pink, and white roses in Kenya?',
    answer:
      'Red roses signify deep love and passion — ideal for romantic occasions, Valentine\'s Day, and proposals. Pink roses express admiration, sweetness, and gratitude — perfect for mothers, close friends, or early-stage relationships. White roses represent purity and new beginnings — often chosen for weddings, sympathy, and anniversaries. We can mix colours in a single bouquet on request.',
  },
  {
    question: 'Can you deliver red roses same day in Nairobi?',
    answer:
      'Yes. Order before 2 PM on weekdays and we will deliver fresh red roses the same day to any address in Nairobi — including CBD, Westlands, Kilimani, Karen, Lavington, Kasarani, Thika Road, and more. WhatsApp us at 0742 370 307 for urgent or after-hours requests.',
  },
  {
    question: 'How do I keep my roses fresh after delivery?',
    answer:
      'When your roses arrive: re-cut the stems at a 45° angle under running water, place them in a clean vase with fresh cool water, add the flower food sachet if included, and keep away from direct sunlight and ripening fruit. Change the water every 2 days. Properly cared for, our roses last 7–10 days.',
  },
];

const ROSE_COLOURS = [
  {
    colour: 'Red',
    emoji: '🌹',
    meaning: 'Deep love, passion & romance',
    best: 'Valentine\'s Day, proposals, anniversaries, apologies',
    bg: 'bg-red-50 border-red-200',
    accent: 'text-red-600',
  },
  {
    colour: 'Pink',
    emoji: '🌸',
    meaning: 'Admiration, sweetness & gratitude',
    best: 'Mother\'s Day, birthdays, close friendships, new relationships',
    bg: 'bg-pink-50 border-pink-200',
    accent: 'text-pink-600',
  },
  {
    colour: 'White',
    emoji: '🤍',
    meaning: 'Purity, new beginnings & respect',
    best: 'Weddings, sympathy, new jobs, formal occasions',
    bg: 'bg-gray-50 border-gray-200',
    accent: 'text-gray-600',
  },
  {
    colour: 'Yellow',
    emoji: '🌼',
    meaning: 'Friendship, joy & warmth',
    best: 'Get-well wishes, congratulations, friendship gestures',
    bg: 'bg-yellow-50 border-yellow-200',
    accent: 'text-yellow-700',
  },
];

const RosesDeliveryPage = () => {
  const canonical = `${SITE_URL}/roses-delivery-nairobi`;

  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Red Roses Delivery Nairobi | Buy Roses Online Kenya | Flower Lifestyle"
        description="Order red roses delivery in Nairobi with same-day service from Flower Lifestyle. Premium long-stem Kenyan roses for Valentine's Day, anniversaries & romantic occasions. Pay with M-Pesa."
        keywords={PAGE_KEYWORDS.roses}
        canonicalUrl={canonical}
      />
      <StructuredData
        data={[
          floristSchema(),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Red Roses Delivery Nairobi', url: canonical },
          ]),
          faqSchema(ROSES_FAQS),
        ]}
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-red-600 via-rose-500 to-pink-500 text-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {['🌹', '🌹', '🌹', '🌹', '🌹', '🌹'].map((r, i) => (
              <span
                key={i}
                className="absolute text-4xl opacity-20"
                style={{ top: `${15 + i * 12}%`, left: `${5 + i * 16}%`, transform: `rotate(${-20 + i * 8}deg)` }}
              >
                {r}
              </span>
            ))}
          </div>
          <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-5xl">
            <nav className="text-red-200 text-sm mb-6 flex items-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Red Roses Delivery Nairobi</span>
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />
                Premium Kenyan Roses — Same-Day Delivery
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Red Roses Delivery in Nairobi
              </h1>
              <p className="text-lg md:text-xl text-red-100 max-w-2xl mb-8 leading-relaxed">
                Kenya grows some of the world's finest roses — and we deliver them fresh to your door.
                Long-stem premium roses, beautifully arranged and hand-delivered across Nairobi on the same day.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50 font-semibold shadow-lg">
                  <Link to="/flowers?category=roses">
                    Shop Roses <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Custom Order via WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-red-50 border-b border-red-100">
          <div className="container mx-auto px-4 py-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: Truck, label: 'Same-Day Delivery', color: 'text-red-500' },
                { icon: Star, label: '4.8★ Google Rating', color: 'text-amber-500' },
                { icon: CheckCircle, label: 'M-Pesa Accepted', color: 'text-green-500' },
                { icon: Leaf, label: 'Farm-Fresh Kenyan Roses', color: 'text-green-600' },
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

          {/* Why Kenya roses */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Kenyan roses are world-class
            </h2>
            <div className="prose prose-pink max-w-none text-gray-600 space-y-4">
              <p>
                Kenya is one of the world's top rose exporters — accounting for over 35% of roses sold in the European
                Union. The combination of equatorial highland altitude, rich volcanic soil, and cool nights around Lake
                Naivasha and the Rift Valley produces roses with <strong>exceptionally long stems, vivid colours, and
                extended vase life</strong> compared to roses grown in cooler climates.
              </p>
              <p>
                At <strong>Flower Lifestyle</strong>, we source fresh Kenyan roses directly and arrange them daily at
                our <strong>City Market workshop in Nairobi CBD</strong>. This means when you order red roses for
                delivery in Nairobi, you receive the same export-quality blooms that reach European markets — except
                they never travel further than across the city, so they arrive at peak freshness.
              </p>
              <p>
                Whether you need a classic dozen for a romantic gesture, a 50-stem display for a special proposal, or
                a mixed-colour arrangement for a wedding table, our florists handcraft every order with care. We offer
                same-day delivery across Nairobi and can accommodate custom stem counts, packaging preferences, and
                personalised message cards on request.
              </p>
            </div>
          </motion.section>

          {/* Rose colour guide */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Rose colour guide — what each colour means
            </h2>
            <p className="text-gray-600 mb-6">Choose the right rose colour for your occasion</p>
            <div className="grid sm:grid-cols-2 gap-5">
              {ROSE_COLOURS.map(({ colour, emoji, meaning, best, bg, accent }) => (
                <div key={colour} className={`rounded-2xl border p-6 ${bg}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{emoji}</span>
                    <h3 className={`font-bold text-lg ${accent}`}>{colour} Roses</h3>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">{meaning}</p>
                  <p className="text-gray-600 text-sm"><span className="font-medium">Best for:</span> {best}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Stem count guide */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              How many roses to send — Nairobi guide
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-rose-50 border border-rose-200">
                    <th className="text-left p-4 font-bold text-gray-900 rounded-tl-xl">Quantity</th>
                    <th className="text-left p-4 font-bold text-gray-900">Meaning / Occasion</th>
                    <th className="text-left p-4 font-bold text-gray-900 rounded-tr-xl">Approx. price (KES)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { qty: '6 stems', meaning: 'Sweet gesture, early romance, "Thinking of you"', price: '2,500–3,500' },
                    { qty: '12 stems (1 dozen)', meaning: 'Classic romantic love — Valentine\'s, anniversaries', price: '4,000–5,500' },
                    { qty: '24 stems', meaning: 'Strong romantic statement, special occasions', price: '7,000–9,000' },
                    { qty: '50 stems', meaning: 'Grand gestures, proposals, milestones', price: '12,000–15,000' },
                    { qty: '100 stems', meaning: 'Spectacular display — proposals, weddings, VIP gifts', price: 'From 20,000' },
                  ].map(({ qty, meaning, price }, i) => (
                    <tr key={qty} className={`border border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="p-4 font-semibold text-rose-600">{qty}</td>
                      <td className="p-4 text-gray-700">{meaning}</td>
                      <td className="p-4 text-gray-700">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">Prices are indicative. See exact pricing in our online shop or WhatsApp us for a custom quote.</p>
          </motion.section>

          {/* Care tips */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 rounded-2xl bg-rose-50 border border-rose-100 p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              How to keep your roses fresh for longer
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { tip: 'Re-cut stems at 45°', detail: 'Cut under running water to prevent air bubbles blocking water uptake' },
                { tip: 'Use a clean vase', detail: 'Bacteria in a dirty vase will shorten vase life significantly' },
                { tip: 'Cool, fresh water', detail: 'Change the water every 2 days and add the flower food sachet if included' },
                { tip: 'Avoid heat & fruit', detail: 'Keep roses away from direct sunlight, radiators, and ripening fruit (ethylene gas wilts flowers)' },
              ].map(({ tip, detail }) => (
                <div key={tip} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{tip}</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently asked questions — roses delivery Nairobi
            </h2>
            <div className="space-y-4">
              {ROSES_FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-gray-200 bg-gray-50/50 p-5 open:bg-white open:shadow-sm transition-all"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-rose-500 group-open:rotate-180 transition-transform ml-4 flex-shrink-0">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </motion.section>

          {/* Related links */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Explore more from Flower Lifestyle</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Birthday Flowers Nairobi', href: '/birthday-flowers-nairobi' },
                { label: 'Anniversary Flowers', href: '/anniversary-flowers-nairobi' },
                { label: 'Same-Day Delivery', href: '/same-day-flower-delivery-nairobi' },
                { label: 'Florist in Nairobi', href: '/florist-kenya' },
                { label: 'Corporate Flowers', href: '/corporate-flower-gifts-nairobi' },
                { label: 'Money Bouquets', href: '/money-bouquet-nairobi' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium hover:bg-rose-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.section>

          {/* CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-red-500 to-rose-500 text-white p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Order red roses in Nairobi today
            </h2>
            <p className="text-red-100 mb-8 max-w-lg mx-auto">
              Premium Kenyan roses, same-day delivery, M-Pesa accepted. Order before 2 PM for delivery across Nairobi by evening.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50 font-semibold">
                <Link to="/flowers?category=roses">Shop Roses <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp {BUSINESS.phoneDisplay}
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-red-100 flex items-center justify-center gap-2">
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

export default RosesDeliveryPage;
