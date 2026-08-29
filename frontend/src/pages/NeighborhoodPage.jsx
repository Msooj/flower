import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Truck, MapPin, Phone, MessageCircle, ArrowRight,
  Star, Clock, CreditCard, CheckCircle
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { Button } from '../components/ui/button';
import {
  SITE_URL, BUSINESS, floristSchema, breadcrumbSchema, faqSchema, serviceSchema,
} from '../data/seoConfig';

const NeighborhoodPage = ({ data }) => {
  const navigate = useNavigate();
  const canonical = `${SITE_URL}${data.route}`;

  const structuredData = [
    floristSchema(),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: `Flower Delivery ${data.area}`, url: canonical },
    ]),
    faqSchema(data.faqs),
    serviceSchema(data.area, canonical),
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title={data.title}
        description={data.description}
        keywords={data.keywords}
        canonicalUrl={canonical}
      />
      <StructuredData data={structuredData} />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-pink-600 via-pink-500 to-rose-400 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 60 + 20,
                  height: Math.random() * 60 + 20,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.1,
                }}
              />
            ))}
          </div>
          <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-5xl">
            {/* Breadcrumb */}
            <nav className="text-pink-200 text-sm mb-6 flex items-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Flower Delivery {data.area}</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                {data.area}, Nairobi
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {data.h1}
              </h1>
              <p className="text-lg md:text-xl text-pink-100 max-w-2xl mb-8 leading-relaxed">
                {data.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-white text-pink-600 hover:bg-pink-50 font-semibold shadow-lg"
                  onClick={() => navigate('/flowers')}
                  id={`shop-flowers-${data.slug}`}
                >
                  Shop Flowers <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" id={`whatsapp-${data.slug}`}>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Order
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-pink-50 border-b border-pink-100">
          <div className="container mx-auto px-4 py-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: Clock, label: `Delivery in ${data.deliveryTime}`, color: 'text-pink-500' },
                { icon: Star, label: '4.8★ Google Rating', color: 'text-amber-500' },
                { icon: CreditCard, label: 'M-Pesa Accepted', color: 'text-green-500' },
                { icon: CheckCircle, label: 'Fresh Daily Blooms', color: 'text-pink-500' },
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
          {/* Popular Arrangements */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Popular arrangements for {data.area} delivery
            </h2>
            <p className="text-gray-600 mb-6">Hand-crafted fresh every day at City Market, Nairobi CBD</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.popularItems.map((item, index) => (
                <Link
                  key={index}
                  to="/flowers"
                  className="group relative rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 p-5 text-center hover:shadow-md hover:border-pink-400 transition-all duration-200"
                >
                  <span className="text-3xl mb-2 block">🌸</span>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">{item}</p>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Delivery Areas within the neighbourhood */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Areas we cover in {data.area}
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.landmarks.map((lm, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-sm font-medium"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {lm}
                </span>
              ))}
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              Don't see your street? <a href={BUSINESS.whatsapp} className="text-pink-600 underline hover:text-pink-700" target="_blank" rel="noopener noreferrer">WhatsApp us</a> — we deliver anywhere in {data.area}.
            </p>
          </motion.section>

          {/* How to Order */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              How to order flower delivery in {data.area}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Browse & Choose', desc: 'Pick your favourite bouquet from our online shop — roses, lilies, money bouquets, gift hampers and more.' },
                { step: '2', title: 'Pay via M-Pesa', desc: 'Complete checkout online in minutes. Pay with M-Pesa, Visa, or Mastercard — fully secure.' },
                { step: '3', title: 'We Deliver to ' + data.area, desc: `Our rider delivers your fresh bouquet to your ${data.area} address in ${data.deliveryTime}. Track via WhatsApp.` },
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

          {/* FAQ */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently asked questions — {data.area} flower delivery
            </h2>
            <div className="space-y-4">
              {data.faqs.map((faq) => (
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

          {/* Other Delivery Areas */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">We also deliver to other Nairobi areas</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Westlands', href: '/flower-delivery-westlands' },
                { label: 'Kilimani', href: '/flower-delivery-kilimani' },
                { label: 'Karen', href: '/flower-delivery-karen' },
                { label: 'Lavington', href: '/flower-delivery-lavington' },
                { label: 'Gigiri', href: '/flower-delivery-gigiri' },
                { label: 'Kasarani', href: '/flower-delivery-kasarani' },
              ]
                .filter((a) => a.href !== data.route)
                .map((a) => (
                  <Link
                    key={a.label}
                    to={a.href}
                    className="px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-sm font-medium hover:bg-pink-100 transition-colors"
                  >
                    {a.label}
                  </Link>
                ))}
              <Link
                to="/florist-kenya"
                className="px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-sm font-medium hover:bg-pink-100 transition-colors"
              >
                All Kenya
              </Link>
            </div>
          </motion.section>

          {/* CTA Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 text-white p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Order flowers to {data.area} today
            </h2>
            <p className="text-pink-100 mb-8 max-w-lg mx-auto">
              Fresh bouquets, same-day delivery, M-Pesa accepted. City Market's finest florist — at your door in {data.deliveryTime}.
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

export default NeighborhoodPage;
