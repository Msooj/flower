import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Truck, MapPin, MessageCircle, ArrowRight, Phone, CheckCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { Button } from '../components/ui/button';
import { SITE_URL, BUSINESS, floristSchema, breadcrumbSchema, faqSchema } from '../data/seoConfig';

const DELIVERY_ZONES = [
  { area: 'Westlands', time: '2–3 hrs', fee: 'KSh 300' },
  { area: 'Kilimani', time: '2–3 hrs', fee: 'KSh 300' },
  { area: 'Lavington', time: '2–4 hrs', fee: 'KSh 400' },
  { area: 'Karen', time: '3–5 hrs', fee: 'KSh 500' },
  { area: 'Gigiri / Runda', time: '2–4 hrs', fee: 'KSh 500' },
  { area: 'Kasarani', time: '3–5 hrs', fee: 'KSh 500' },
  { area: 'Nairobi CBD', time: '1–2 hrs', fee: 'KSh 200' },
  { area: 'Eastlands', time: '3–5 hrs', fee: 'KSh 500' },
];

const FAQS = [
  {
    question: 'What is the cut-off time for same-day flower delivery in Nairobi?',
    answer:
      'Order before 2:00 PM for same-day flower delivery anywhere in Nairobi. Orders placed after 2 PM are scheduled for next-day morning delivery unless you arrange an express slot via WhatsApp.',
  },
  {
    question: 'How fast is same-day flower delivery from City Market Nairobi?',
    answer:
      'Once your order is confirmed, our team begins preparing your bouquet at our City Market workshop. Delivery typically takes 2–5 hours depending on your Nairobi location. Westlands, CBD, and Kilimani orders are usually faster (2–3 hours).',
  },
  {
    question: 'Can I track my same-day flower delivery in Nairobi?',
    answer:
      "Yes. Once your order is out for delivery, we send you a WhatsApp update with your rider's name and estimated arrival time. You can also message us at any point on 0742 370 307 for a live status update.",
  },
  {
    question: 'Do you offer same-day flower delivery on weekends and public holidays?',
    answer:
      'Yes! We operate Monday–Saturday 8 AM–7 PM and Sunday 9 AM–5 PM, including most public holidays. Same-day delivery is available every day we are open.',
  },
  {
    question: 'What is the minimum order for same-day delivery Nairobi?',
    answer:
      'Our bouquets start from KSh 3,000. There is no minimum order beyond the product price plus the delivery fee for your zone.',
  },
  {
    question: 'Can I schedule a specific delivery time for same-day flowers?',
    answer:
      'Yes. WhatsApp us at 0742 370 307 with your preferred time window and we will do our best to accommodate it, especially for morning or evening surprise deliveries.',
  },
];

const SameDayDeliveryPage = () => {
  const canonical = `${SITE_URL}/same-day-flower-delivery-nairobi`;

  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Same-Day Flower Delivery Nairobi | Order Before 2 PM | Flower Lifestyle"
        description="Order before 2 PM for same-day flower delivery anywhere in Nairobi. Fresh bouquets, roses, money bouquets & gift hampers delivered in 2–5 hours. Pay with M-Pesa. Flower Lifestyle — City Market, Nairobi CBD."
        keywords="same day flower delivery Nairobi, same day flowers Nairobi, flower delivery today Nairobi, urgent flower delivery Nairobi, last minute flowers Nairobi, flower delivery 2 hours Nairobi"
        canonicalUrl={canonical}
      />
      <StructuredData
        data={[
          floristSchema(),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Same-Day Flower Delivery Nairobi', url: canonical },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-pink-600 to-rose-500 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <nav className="text-pink-200 text-sm mb-6 flex items-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Same-Day Flower Delivery Nairobi</span>
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <Clock className="w-4 h-4" />
                Order before 2 PM — delivered today
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Same-Day Flower Delivery in Nairobi
              </h1>
              <p className="text-lg text-pink-100 max-w-2xl mb-8 leading-relaxed">
                Forgot an anniversary? Planning a surprise? Flower Lifestyle offers reliable same-day flower delivery across all major Nairobi neighbourhoods. Order online, pay via M-Pesa, and we'll have fresh flowers at your door in as little as 2 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold" asChild>
                  <Link to="/flowers" id="same-day-shop-cta">Shop Now — Delivered Today <ArrowRight className="w-5 h-5 ml-2" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" id="same-day-whatsapp-cta">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Order
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* How it works */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">How same-day delivery works</h2>
            <p className="text-gray-600 mb-8">3 simple steps — from your phone to their door.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { n: '1', title: 'Choose your bouquet', desc: 'Browse our online shop. Roses, lilies, money bouquets, hampers — all available for same-day delivery across Nairobi.', icon: '🌸' },
                { n: '2', title: 'Pay with M-Pesa', desc: 'Checkout takes 2 minutes. Pay with M-Pesa, Visa, or Mastercard. Order confirmation sent instantly via email & SMS.', icon: '💚' },
                { n: '3', title: 'We deliver fast', desc: 'Your bouquet is prepared fresh at City Market and delivered to any Nairobi address in 2–5 hours. Track via WhatsApp.', icon: '🚚' },
              ].map(({ n, title, desc, icon }) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-pink-100 bg-pink-50/50 p-6"
                >
                  <div className="text-4xl mb-3">{icon}</div>
                  <div className="w-7 h-7 rounded-full bg-pink-600 text-white text-sm font-bold flex items-center justify-center mb-3">{n}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Delivery Zones Table */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Same-day delivery zones across Nairobi
            </h2>
            <div className="overflow-hidden rounded-2xl border border-pink-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-pink-600 text-white">
                    <th className="text-left px-6 py-4 font-semibold">Area</th>
                    <th className="text-left px-6 py-4 font-semibold">Est. Delivery Time</th>
                    <th className="text-left px-6 py-4 font-semibold">Delivery Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {DELIVERY_ZONES.map((z, i) => (
                    <tr key={z.area} className={i % 2 === 0 ? 'bg-white' : 'bg-pink-50/40'}>
                      <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-pink-400 flex-shrink-0" />
                        {z.area}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{z.time}</td>
                      <td className="px-6 py-4 text-gray-600 font-semibold">{z.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-gray-500 text-xs">Delivery fees shown are estimates. Exact fee displayed at checkout based on your pinned address.</p>
          </section>

          {/* Why Flower Lifestyle */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Why choose Flower Lifestyle for same-day delivery in Nairobi?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Fresh flowers sourced daily from Nairobi's finest suppliers",
                'City Market location — central to all Nairobi zones for faster delivery',
                'Dedicated WhatsApp tracking at every stage',
                'M-Pesa, Visa, and Mastercard all accepted',
                'Same-day available every day including Sunday',
                'Hand-crafted by professional florists — not mass-produced',
                'Add a personalised message card at no extra cost',
                '127+ 5-star reviews from Nairobi customers',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">{point}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              FAQs — Same-day flower delivery Nairobi
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

          {/* CTA Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 text-white p-8 md:p-12 text-center shadow-xl">
            <Truck className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to order? Flowers delivered today.</h2>
            <p className="text-pink-100 mb-8 max-w-lg mx-auto">
              Order before 2 PM for same-day delivery anywhere in Nairobi. Fresh flowers, M-Pesa accepted.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold">
                <Link to="/flowers">Shop Flowers <ArrowRight className="w-4 h-4 ml-2" /></Link>
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

export default SameDayDeliveryPage;
