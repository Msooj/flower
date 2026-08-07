import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, Truck, Star, Phone, MessageCircle, ArrowRight, CheckCircle, Calendar, Gift
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { Button } from '../components/ui/button';
import {
  SITE_URL, BUSINESS, PAGE_KEYWORDS, floristSchema, breadcrumbSchema, faqSchema,
} from '../data/seoConfig';

const ANNIVERSARY_FAQS = [
  {
    question: 'What flowers are best for an anniversary in Kenya?',
    answer:
      'Red roses are the most popular anniversary flower in Kenya — symbolising deep love and passion. For a more elegant feel, white and blush lilies paired with greenery create a sophisticated anniversary look. Pink roses express long-lasting gratitude and admiration, ideal for milestone anniversaries like 10 or 25 years. Our florists can create a custom arrangement that blends your partner\'s favourite flowers and colours.',
  },
  {
    question: 'Can you deliver anniversary flowers on the same day in Nairobi?',
    answer:
      'Yes. Order before 2 PM Monday–Saturday for same-day anniversary flower delivery anywhere in Nairobi — CBD, Westlands, Karen, Kilimani, Lavington, Kasarani, and beyond. For a specific delivery time window (e.g. arriving before a romantic dinner), WhatsApp us at 0742 370 307 and we will schedule accordingly.',
  },
  {
    question: 'What anniversary flower and gift combos do you offer in Nairobi?',
    answer:
      'We offer complete anniversary gift packages including: flowers + chocolates (Ferrero Rocher or Rellana), flowers + sparkling wine or rosé, flowers + a personalised photo frame, and full luxury hampers. These combos are available for same-day delivery in Nairobi and can be customised on WhatsApp for special requests.',
  },
  {
    question: 'How far in advance should I order anniversary flowers in Nairobi?',
    answer:
      'For same-day delivery, order before 2 PM on the day. For scheduled or timed deliveries — especially for significant anniversaries where you want flowers to arrive at a precise time — ordering 1–2 days ahead is ideal. For very large or fully custom arrangements (e.g. 100-rose displays or wedding anniversary centrepieces), please allow 3–5 days.',
  },
  {
    question: 'Do you offer flower delivery for wedding anniversaries outside Nairobi?',
    answer:
      'Yes. While same-day delivery is focused on Nairobi, we offer scheduled countrywide delivery to major Kenyan towns including Mombasa, Kisumu, Nakuru, Eldoret, and others. WhatsApp us for a delivery quote and timeline for your specific location.',
  },
];

const MILESTONE_FLOWERS = [
  { year: '1st', label: 'Paper Anniversary', flowers: 'Mixed wildflowers or daisies — light, playful, fresh beginnings', emoji: '🌼' },
  { year: '5th', label: 'Wood Anniversary', flowers: 'Sunflowers, warm yellows & oranges — strong, grounded, growing love', emoji: '🌻' },
  { year: '10th', label: 'Tin/Aluminium', flowers: 'Pink or red roses — resilient and beautiful, representing a decade of love', emoji: '🌹' },
  { year: '25th', label: 'Silver Anniversary', flowers: 'White lilies and silver-leaf arrangements — timeless elegance', emoji: '🤍' },
  { year: '50th', label: 'Golden Anniversary', flowers: 'Gold and yellow roses with rich greenery — a lifetime of golden memories', emoji: '✨' },
];

const AnniversaryFlowersPage = () => {
  const canonical = `${SITE_URL}/anniversary-flowers-nairobi`;

  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Anniversary Flowers Nairobi | Romantic Bouquets Delivered Same Day"
        description="Order anniversary flowers in Nairobi with same-day delivery. Roses, lilies, luxury combos with wine & chocolates for your special milestone. Pay with M-Pesa. Flower Lifestyle Nairobi."
        keywords={PAGE_KEYWORDS.anniversary}
        canonicalUrl={canonical}
      />
      <StructuredData
        data={[
          floristSchema(),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Anniversary Flowers Nairobi', url: canonical },
          ]),
          faqSchema(ANNIVERSARY_FAQS),
        ]}
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-rose-700 via-pink-600 to-pink-400 text-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {['❤️', '🌹', '❤️', '🌹', '❤️', '🌹'].map((icon, i) => (
              <span
                key={i}
                className="absolute text-3xl opacity-15"
                style={{ top: `${10 + i * 14}%`, right: `${5 + i * 14}%`, transform: `rotate(${i * 15}deg)` }}
              >
                {icon}
              </span>
            ))}
          </div>
          <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-5xl">
            <nav className="text-pink-200 text-sm mb-6 flex items-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Anniversary Flowers Nairobi</span>
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />
                Romantic Flower Delivery — Nairobi
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Anniversary Flowers in Nairobi
              </h1>
              <p className="text-lg md:text-xl text-pink-100 max-w-2xl mb-8 leading-relaxed">
                Mark every milestone with flowers that speak when words fall short. Handcrafted anniversary bouquets,
                luxury flower-and-gift combos, and same-day delivery across Nairobi.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-white text-rose-600 hover:bg-rose-50 font-semibold shadow-lg">
                  <Link to="/flowers?category=anniversary">
                    Shop Anniversary Flowers <ArrowRight className="w-5 h-5 ml-2" />
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
        <section className="bg-rose-50 border-b border-rose-100">
          <div className="container mx-auto px-4 py-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: Truck, label: 'Same-Day Delivery', color: 'text-rose-500' },
                { icon: Star, label: '4.8★ Google Rating', color: 'text-amber-500' },
                { icon: CheckCircle, label: 'M-Pesa Accepted', color: 'text-green-500' },
                { icon: Gift, label: 'Gift Combos Available', color: 'text-rose-500' },
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

          {/* Why flowers for anniversaries */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why flowers make the perfect anniversary gift in Kenya
            </h2>
            <div className="prose prose-pink max-w-none text-gray-600 space-y-4">
              <p>
                Anniversaries celebrate shared history — the moments you've built together, the challenges you've
                overcome, and the love that has deepened with time. Flowers capture all of that emotion in a single
                beautiful gesture. Unlike material gifts that age or break, a stunning anniversary bouquet creates an
                immediate, powerful impression that stays in memory long after the petals fall.
              </p>
              <p>
                At <strong>Flower Lifestyle</strong>, we understand that anniversary flowers aren't just decoration —
                they're a message. That's why every arrangement is <strong>handcrafted by our expert florists</strong>
                at our City Market workshop in Nairobi CBD, using only the freshest blooms sourced each morning. We
                take care of every detail: the stem selection, the wrapping, the ribbon colour, and the personalised
                message card — so you can focus on the moment.
              </p>
              <p>
                We deliver across all Nairobi neighbourhoods — Westlands, Karen, Kilimani, Lavington, Kasarani, CBD,
                Thika Road, and beyond. Order before 2 PM for same-day delivery, or schedule a timed delivery so
                your flowers arrive just before that special anniversary dinner. For partners outside Nairobi, we
                also offer countrywide delivery — WhatsApp us for a custom quote.
              </p>
            </div>
          </motion.section>

          {/* Combo options */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Anniversary flower and gift combos — Nairobi
            </h2>
            <p className="text-gray-600 mb-6">Upgrade your bouquet into a complete anniversary experience</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                { emoji: '🌹🍫', name: 'Flowers + Chocolates', desc: 'Classic roses paired with Ferrero Rocher or Rellana chocolates — always a winner.', price: 'From KES 5,500' },
                { emoji: '🌹🥂', name: 'Flowers + Sparkling Wine', desc: 'A romantic rose bouquet with a bottle of rosé or sparkling wine for a luxurious celebration.', price: 'From KES 7,000' },
                { emoji: '💐🖼️', name: 'Flowers + Photo Frame', desc: 'Beautiful blooms paired with a personalised photo frame — a meaningful keepsake.', price: 'From KES 6,500' },
                { emoji: '🌹🧸', name: 'Flowers + Teddy Bear', desc: 'Roses with a premium plush teddy — a timeless gesture that feels warm and heartfelt.', price: 'From KES 5,000' },
                { emoji: '🎁', name: 'Full Luxury Hamper', desc: 'Flowers, chocolates, wine, candles, and more — a complete anniversary gift hamper.', price: 'From KES 12,000' },
                { emoji: '✉️', name: 'Custom Arrangement', desc: 'Tell us your story on WhatsApp and we\'ll create a bespoke arrangement just for you.', price: 'Custom pricing' },
              ].map((item) => (
                <Link
                  key={item.name}
                  to="/flowers?category=anniversary"
                  className="group rounded-2xl border border-pink-100 bg-pink-50/40 p-5 hover:shadow-md hover:border-pink-300 transition-all duration-200"
                >
                  <span className="text-3xl block mb-3">{item.emoji}</span>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors text-sm">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{item.desc}</p>
                  <span className="text-xs font-semibold text-pink-600">{item.price}</span>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Milestone guide */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Flowers for every anniversary milestone
            </h2>
            <p className="text-gray-600 mb-6">Traditional flower choices matched to each anniversary year</p>
            <div className="space-y-4">
              {MILESTONE_FLOWERS.map(({ year, label, flowers, emoji }) => (
                <div
                  key={year}
                  className="flex gap-4 items-start rounded-2xl border border-pink-100 bg-pink-50/30 p-4 hover:bg-pink-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center">
                    <span className="text-2xl">{emoji}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-rose-600">{year}</span>
                      <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-medium">{label}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{flowers}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Planning tips */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 rounded-2xl bg-pink-50 border border-pink-100 p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-pink-600" />
              Anniversary flower planning tips
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { tip: 'Order before 2 PM for same-day', detail: 'Place your order in the morning to guarantee same-day delivery across Nairobi' },
                { tip: 'Schedule a timed delivery', detail: 'WhatsApp us to book a specific delivery window — perfect if you want flowers to arrive before dinner' },
                { tip: 'Add a personalised message', detail: 'Include a heartfelt card message at checkout — we\'ll handwrite it if you prefer' },
                { tip: 'Surprise deliveries welcome', detail: 'We deliver discreetly to workplaces, homes, and hotels — just provide the address and recipient\'s phone number' },
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
              Frequently asked questions — anniversary flowers Nairobi
            </h2>
            <div className="space-y-4">
              {ANNIVERSARY_FAQS.map((faq) => (
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
                { label: 'Red Roses Delivery', href: '/roses-delivery-nairobi' },
                { label: 'Birthday Flowers', href: '/birthday-flowers-nairobi' },
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
          <div className="rounded-3xl bg-gradient-to-r from-rose-600 to-pink-500 text-white p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Order anniversary flowers in Nairobi today
            </h2>
            <p className="text-pink-100 mb-8 max-w-lg mx-auto">
              Fresh bouquets and luxury gift combos, same-day delivery, M-Pesa accepted. Make every anniversary unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-rose-600 hover:bg-rose-50 font-semibold">
                <Link to="/flowers?category=anniversary">Shop Anniversary Flowers <ArrowRight className="w-4 h-4 ml-2" /></Link>
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

export default AnniversaryFlowersPage;
