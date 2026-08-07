import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flower2, Truck, MapPin, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { Button } from '../components/ui/button';
import {
  SITE_URL,
  BUSINESS,
  PAGE_KEYWORDS,
  floristSchema,
  breadcrumbSchema,
  faqSchema,
} from '../data/seoConfig';

const FLORIST_FAQS = [
  {
    question: 'Who is the best florist in Nairobi for same-day delivery?',
    answer:
      'Flower Lifestyle is a top-rated florist in Nairobi based at City Market, Nairobi CBD. We offer same day flower delivery Nairobi across Westlands, Karen, Kilimani, Lavington, CBD and more, and we can arrange countrywide delivery for birthday flowers Nairobi, wedding flowers Nairobi, romance, and sympathy flowers Nairobi.',
  },
  {
    question: 'Do you deliver flowers outside Nairobi?',
    answer:
      'Yes. While our primary service is same-day flower delivery in Nairobi and surrounding areas (Westlands, Karen, Kilimani, Thika Road, and more), we also deliver flowers across Kenya for special orders. Contact us on WhatsApp for delivery quotes.',
  },
  {
    question: 'Can I pay for flowers with M-Pesa in Kenya?',
    answer:
      'Yes. Flower Lifestyle accepts M-Pesa, cash, and card payments. Order online through our shop or message us on WhatsApp at 0742 370 307 for a quick M-Pesa payment link.',
  },
  {
    question: 'What occasions do you supply flowers for?',
      answer:
      'We create bouquets for birthday flowers Nairobi, wedding flowers Nairobi, anniversaries, romance, Mother\'s Day, corporate gifts, get-well wishes, and sympathy flowers Nairobi. Browse our categories or tell us your occasion for a custom bouquet.',
  },
  {
    question: 'Where is your flower shop located in Nairobi?',
    answer:
      'Our florist shop is at City Market in Nairobi CBD. You can visit us in person or order online for delivery. We are open Monday–Saturday 8AM–7PM and Sunday 9AM–5PM.',
  },
];

const FloristKenyaPage = () => {
  const canonical = `${SITE_URL}/florist-kenya`;

  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Florist in Nairobi | Flower Delivery in Nairobi | Flower Lifestyle"
        description="Florist in Nairobi offering same day flower delivery Nairobi from City Market. Order fresh bouquets for birthday flowers Nairobi, wedding flowers Nairobi & sympathy flowers Nairobi. Pay with M-Pesa & deliver across Nairobi and Kenya."
        keywords={PAGE_KEYWORDS.floristKenya}
        canonicalUrl={canonical}
      />
      <StructuredData
        data={[
          floristSchema(),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Florist in Kenya', url: canonical },
          ]),
          faqSchema(FLORIST_FAQS),
        ]}
      />

      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-pink-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Florist in Kenya</span>
        </nav>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-pink max-w-none"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Flower Delivery in Nairobi — Florist in Nairobi
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            <strong>Flower Lifestyle</strong> is a trusted Nairobi flower shop offering flower delivery Nairobi with
            reliable, same day flower delivery Nairobi from <strong>City Market, Nairobi CBD</strong>. We handcraft fresh
            bouquets for <strong>birthday flowers Nairobi</strong>, <strong>wedding flowers Nairobi</strong>, romance,
            corporate gifting, and <strong>sympathy flowers Nairobi</strong>, then deliver them across Nairobi and beyond.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 not-prose mb-10">
            {[
              { icon: Flower2, label: 'Fresh daily blooms', sub: 'Sourced in Kenya' },
              { icon: Truck, label: 'Same-day delivery', sub: 'Nairobi & environs' },
              { icon: MapPin, label: 'City Market shop', sub: 'Visit or order online' },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="rounded-xl border border-pink-100 bg-pink-50/50 p-4 text-center"
              >
                <Icon className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3">
            Why choose Flower Lifestyle as your Kenya florist?
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-8">
            <li>
              <strong>Same-day flower delivery in Nairobi</strong> — Westlands, Karen, Kilimani,
              Lavington, CBD, Eastlands, Thika Road, and more.
            </li>
            <li>
              <strong>Trusted online flower shop</strong> — order in minutes, pay with M-Pesa, and
              track delivery by phone or WhatsApp.
            </li>
            <li>
              <strong>Expert florists</strong> — roses, lilies, mixed bouquets, money bouquets, and
              flower-plus-gift combos.
            </li>
            <li>
              <strong>Transparent pricing in KES</strong> — premium bouquets from KSh 3,000 with clear
              delivery options.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Shop by occasion</h2>
          <div className="flex flex-wrap gap-2 not-prose mb-10">
            {[
              { label: 'Birthday flowers', href: '/birthday-flowers-nairobi' },
              { label: 'Red roses delivery', href: '/roses-delivery-nairobi' },
              { label: 'Anniversary flowers', href: '/anniversary-flowers-nairobi' },
              { label: 'Gift combos', cat: 'combos', href: null },
              { label: "Mother's Day", cat: 'mothers-day', href: null },
              { label: 'Money bouquets', href: '/money-bouquet-nairobi' },
            ].map(({ label, cat, href }) => (
              <Link
                key={label}
                to={href || `/flowers?category=${cat}`}
                className="px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-medium hover:bg-pink-200 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
          <div className="space-y-4 not-prose mb-10">
            {FLORIST_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-gray-200 bg-gray-50/50 p-4 open:bg-white open:shadow-sm"
              >
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-pink-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 text-white p-8 not-prose text-center">
            <h2 className="text-2xl font-bold mb-2">Order from Kenya&apos;s trusted florist today</h2>
            <p className="text-pink-100 mb-6 max-w-lg mx-auto">
              Browse our shop online or chat with us for custom bouquets and delivery anywhere in Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-white text-pink-600 hover:bg-pink-50">
                <Link to="/flowers">
                  Shop flowers <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp {BUSINESS.phoneDisplay}
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-pink-100 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              <a href={`tel:${BUSINESS.phone}`} className="underline">
                {BUSINESS.phoneDisplay}
              </a>
              · {BUSINESS.email}
            </p>
          </div>
        </motion.article>
      </main>

      <Footer />
    </div>
  );
};

export default FloristKenyaPage;
