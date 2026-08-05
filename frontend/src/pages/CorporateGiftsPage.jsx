import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, MessageCircle, ArrowRight, Phone, CheckCircle, Truck } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { Button } from '../components/ui/button';
import { SITE_URL, BUSINESS, floristSchema, breadcrumbSchema, faqSchema } from '../data/seoConfig';

const PACKAGES = [
  { name: 'Office Welcome Flowers', price: 'From KSh 3,500', desc: 'Elegant desk arrangement to welcome a new team member or brighten the office reception.', icon: '🌿' },
  { name: 'Corporate Gift Hamper', price: 'From KSh 5,000', desc: 'Premium hamper with flowers, chocolates, and personalised branding for client appreciation.', icon: '🎁' },
  { name: 'Event Centrepieces', price: 'From KSh 8,000', desc: 'Stunning table centrepieces for corporate dinners, AGMs, product launches, and conferences.', icon: '🌸' },
  { name: 'Bulk Office Subscription', price: 'Custom quote', desc: 'Weekly or monthly fresh flower delivery to your Nairobi office. Invoice billing available.', icon: '📅' },
];

const FAQS = [
  {
    question: 'Do you offer corporate flower delivery in Nairobi?',
    answer:
      'Yes. Flower Lifestyle provides corporate flower arrangements and gift hamper delivery across Nairobi including CBD, Westlands, Kilimani, Upper Hill, Gigiri, and Karen. We cater to offices, hotels, event venues, and diplomatic missions.',
  },
  {
    question: 'Can you deliver flowers to corporate offices in Upper Hill and Westlands?',
    answer:
      'Absolutely. We regularly deliver corporate flowers to Upper Hill, Westlands, Kilimani, and all major Nairobi business districts. Same-day delivery is available for orders placed before 2 PM.',
  },
  {
    question: 'Do you offer branded corporate gift hampers?',
    answer:
      'Yes. We can incorporate company branding, personalised message cards, and custom ribbon colours into our corporate gift hampers. Contact us at flowerlifestyle@gmail.com for branding options.',
  },
  {
    question: 'Can I set up a recurring monthly flower subscription for my Nairobi office?',
    answer:
      'Yes. We offer weekly or monthly fresh flower subscription plans for Nairobi offices. Pricing is based on arrangement size and delivery frequency. WhatsApp or email us for a custom corporate quote.',
  },
  {
    question: 'Do you provide invoice billing for corporate clients?',
    answer:
      'Yes. Established corporate accounts can request invoice billing on a monthly basis. Contact us at flowerlifestyle@gmail.com with your company details to set up a corporate account.',
  },
  {
    question: 'Can you supply flowers for a corporate event or conference in Nairobi?',
    answer:
      'Yes. We supply event centrepieces, stage arrangements, registration desk flowers, and gift hampers for corporate events, conferences, AGMs, and product launches in Nairobi. Please enquire at least 5–7 days in advance for event orders.',
  },
];

const CorporateGiftsPage = () => {
  const canonical = `${SITE_URL}/corporate-flower-gifts-nairobi`;

  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Corporate Flower Gifts Nairobi | Office Flowers & Gift Hampers | Flower Lifestyle"
        description="Premium corporate flower arrangements and gift hampers for Nairobi offices, events & clients. Same-day delivery to Upper Hill, Westlands, Kilimani & CBD. Invoice billing available. Call Flower Lifestyle: 0742 370 307."
        keywords="corporate flower gifts Nairobi, office flowers Nairobi, corporate gift hampers Kenya, corporate flower delivery Nairobi, office flower subscription Nairobi, corporate flowers Upper Hill, event flowers Nairobi"
        canonicalUrl={canonical}
      />
      <StructuredData
        data={[
          floristSchema(),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Corporate Flower Gifts Nairobi', url: canonical },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-700 via-pink-600 to-rose-500 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <nav className="text-pink-200 text-sm mb-6 flex items-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Corporate Flower Gifts Nairobi</span>
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <Briefcase className="w-4 h-4" />
                Corporate & Business Gifting
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Corporate Flower Gifts & Office Flowers in Nairobi
              </h1>
              <p className="text-lg text-pink-100 max-w-2xl mb-8 leading-relaxed">
                Make lasting impressions with premium corporate flower arrangements and bespoke gift hampers. Flower Lifestyle supplies Nairobi's top businesses, embassies, hotels, and event venues with fresh, professionally crafted floral gifts. Invoice billing available for established accounts.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold" asChild>
                  <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" id="corporate-whatsapp-cta">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Get a Corporate Quote
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/flowers" id="corporate-shop-cta">
                    Browse Gift Arrangements <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* Packages */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Corporate gift packages</h2>
            <p className="text-gray-600 mb-8">Bespoke arrangements for every business occasion. Fully customisable.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {PACKAGES.map(({ name, price, desc, icon }) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-pink-100 bg-gradient-to-br from-white to-pink-50/50 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-3">{icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{name}</h3>
                  <p className="text-pink-600 font-semibold mb-2">{price}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Who we serve */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Corporate clients we serve in Nairobi
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { emoji: '🏢', label: 'Corporates & Banks', sub: 'Upper Hill, Westlands, CBD' },
                { emoji: '🏨', label: 'Hotels & Hospitality', sub: 'Nairobi CBD & suburbs' },
                { emoji: '🏛️', label: 'Embassies & NGOs', sub: 'Gigiri, Runda, Muthaiga' },
                { emoji: '🎪', label: 'Events & Conferences', sub: 'Venues across Nairobi' },
                { emoji: '🏥', label: 'Hospitals & Clinics', sub: 'Get-well arrangements' },
                { emoji: '📺', label: 'Media & Agencies', sub: 'Studio & launch flowers' },
              ].map(({ emoji, label, sub }) => (
                <div key={label} className="rounded-xl border border-pink-100 bg-pink-50/30 p-4 flex items-center gap-3">
                  <span className="text-3xl">{emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{label}</p>
                    <p className="text-gray-500 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why us */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Why Nairobi businesses choose Flower Lifestyle
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Dedicated corporate account manager — consistent quality every order',
                'Invoice billing for established business accounts',
                'Bulk order discounts for events and weekly subscriptions',
                'Same-day corporate delivery to all Nairobi business districts',
                'Company branding & personalised message cards on all hampers',
                'Wide range: desk flowers, reception arrangements, event centrepieces',
                'M-Pesa, bank transfer, card, and cash payment options',
                'Based at City Market — centrally located for all Nairobi zones',
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">{pt}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Corporate gifting FAQs — Nairobi
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-gray-200 bg-gray-50/50 p-5 open:bg-white open:shadow-sm">
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-pink-500 group-open:rotate-180 transition-transform ml-4 flex-shrink-0">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-700 to-pink-600 text-white p-8 md:p-12 text-center shadow-xl">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready for a corporate quote?</h2>
            <p className="text-pink-100 mb-8 max-w-lg mx-auto">
              Contact us for bespoke corporate packages, bulk pricing, and invoice billing. We serve Nairobi's top companies, embassies, and hotels.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold">
                <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp for a Quote
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href={`mailto:${BUSINESS.email}`}>
                  Email {BUSINESS.email}
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-pink-100 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              <a href={`tel:${BUSINESS.phone}`} className="underline">{BUSINESS.phoneDisplay}</a>
              · Monday–Saturday 8 AM–7 PM
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CorporateGiftsPage;
