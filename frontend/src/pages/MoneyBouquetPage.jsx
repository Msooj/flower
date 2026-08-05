import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Phone, CheckCircle, Star } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { Button } from '../components/ui/button';
import { SITE_URL, BUSINESS, floristSchema, breadcrumbSchema, faqSchema } from '../data/seoConfig';

const PRICE_TABLE = [
  { name: 'Classic Money Bouquet', amount: 'KSh 3,000–5,000', desc: 'Small bouquet wrapping KSh 3K–5K in notes. Perfect for birthdays.' },
  { name: 'Premium Money Bouquet', amount: 'KSh 5,000–10,000', desc: 'Lush arrangement wrapping up to KSh 10K. Roses + ribbon finish.' },
  { name: 'Luxury Money Bouquet', amount: 'KSh 10,000–50,000', desc: 'Grand, Instagram-worthy bouquet for milestone celebrations.' },
  { name: 'Money + Flowers Combo', amount: 'From KSh 5,500', desc: 'Real flowers & money notes combined in one stunning bouquet.' },
];

const FAQS = [
  {
    question: 'What is a money bouquet and how does it work?',
    answer:
      'A money bouquet is a decorative arrangement where real banknotes are folded or rolled and presented like flower petals in a bouquet. The recipient keeps both the beautiful arrangement and the cash gift. Our Nairobi florists create stunning money bouquets with real flowers and ribbons that are popular for birthdays, graduations, and celebrations.',
  },
  {
    question: 'How much does a money bouquet cost in Nairobi?',
    answer:
      'Money bouquet prices in Nairobi depend on the amount of money inside and the floral decoration. Our base price starts from KSh 3,000 (including the cash). Premium money bouquets with roses and luxury wrapping start from KSh 5,500. The cash amount is fully customisable — you tell us how much to include.',
  },
  {
    question: 'Can I order a money bouquet for same-day delivery in Nairobi?',
    answer:
      'Yes! Same-day money bouquet delivery is available across Nairobi including Westlands, Kilimani, Karen, Lavington, Kasarani, and Nairobi CBD. Order before 2 PM for same-day delivery. WhatsApp us at 0742 370 307 for urgent orders.',
  },
  {
    question: 'How much money can I put in a money bouquet?',
    answer:
      'We can create a money bouquet with as much money as you like. Common amounts range from KSh 3,000 to KSh 50,000. We arrange the notes beautifully regardless of the denomination (KSh 50, 100, 200, 500, or 1000 notes).',
  },
  {
    question: 'Do you make money bouquets with USD or other currencies?',
    answer:
      'Yes, we can create money bouquets with KES, USD, EUR, GBP, or any other currency you provide. Just bring or send the notes and we will craft a beautiful arrangement around them.',
  },
  {
    question: 'Where is your money bouquet shop in Nairobi?',
    answer:
      'Our flower and money bouquet shop is at City Market in Nairobi CBD. You can visit us in person Monday–Saturday 8 AM–7 PM or order online for delivery anywhere in Nairobi.',
  },
];

const MoneyBouquetPage = () => {
  const canonical = `${SITE_URL}/money-bouquet-nairobi`;

  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Money Bouquet Nairobi | Money Bouquet Price Kenya | Flower Lifestyle"
        description="Order a stunning money bouquet in Nairobi from KSh 3,000. Same-day delivery. Birthdays, graduations & celebrations. Real KES notes folded into beautiful bouquets by expert florists at City Market, Nairobi CBD."
        keywords="money bouquet Nairobi, money bouquet price Kenya, money bouquet Nairobi birthday, money bouquet delivery Nairobi, money flowers Kenya, cash bouquet Nairobi, money bouquet for graduation"
        canonicalUrl={canonical}
      />
      <StructuredData
        data={[
          floristSchema(),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Money Bouquet Nairobi', url: canonical },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-500 via-pink-500 to-rose-500 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <nav className="text-pink-200 text-sm mb-6 flex items-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Money Bouquet Nairobi</span>
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <Star className="w-4 h-4 fill-white" />
                Nairobi's most gifted bouquet style
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Money Bouquets in Nairobi — Prices & Same-Day Delivery
              </h1>
              <p className="text-lg text-pink-100 max-w-2xl mb-8 leading-relaxed">
                Surprise someone special with a stunning money bouquet from Flower Lifestyle. We fold real KES banknotes into gorgeous, Instagram-worthy bouquets — perfect for birthdays, graduations, and celebrations across Nairobi.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold" asChild>
                  <Link to="/flowers?category=money-bouquet" id="money-bouquet-shop-cta">
                    Order a Money Bouquet <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" id="money-bouquet-whatsapp-cta">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Custom Order via WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* What is a money bouquet */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What is a money bouquet?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A <strong>money bouquet</strong> is a creative gift arrangement where real banknotes are artistically folded — like origami — to resemble flower petals, then assembled into a beautiful bouquet with real blooms, ribbon, and tissue wrapping. It's the perfect gift that combines the beauty of fresh flowers with the practicality of a cash gift.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In Nairobi, money bouquets have become one of the most popular gifting trends for <strong>birthdays</strong>, <strong>graduations</strong>, <strong>baby showers</strong>, and milestone celebrations. They're an excellent choice when you want to give money but make it feel extra special and personal.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              {[
                { emoji: '🎂', title: 'Birthdays', desc: 'The #1 money bouquet occasion in Nairobi' },
                { emoji: '🎓', title: 'Graduations', desc: 'A memorable gift for academic milestones' },
                { emoji: '💍', title: 'Anniversaries', desc: 'Pair with roses for a romantic combo' },
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5 text-center">
                  <div className="text-4xl mb-2">{emoji}</div>
                  <p className="font-bold text-gray-900 mb-1">{title}</p>
                  <p className="text-gray-600 text-xs">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Price Table */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Money bouquet prices in Nairobi</h2>
            <p className="text-gray-600 mb-6">All prices include floral decoration & wrapping. Cash amount is <strong>customisable</strong>.</p>
            <div className="overflow-hidden rounded-2xl border border-amber-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-amber-500 to-pink-500 text-white">
                    <th className="text-left px-6 py-4 font-semibold">Bouquet Type</th>
                    <th className="text-left px-6 py-4 font-semibold">Total Price (incl. cash)</th>
                    <th className="text-left px-6 py-4 font-semibold hidden md:table-cell">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_TABLE.map((row, i) => (
                    <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-amber-50/30'}>
                      <td className="px-6 py-4 font-semibold text-gray-800">{row.name}</td>
                      <td className="px-6 py-4 text-pink-600 font-bold">{row.amount}</td>
                      <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-gray-500 text-xs">Want a custom amount? WhatsApp us — we create money bouquets for any budget.</p>
          </section>

          {/* Why choose us */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Why Nairobi customers choose Flower Lifestyle for money bouquets
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Expert florists who create Instagram-worthy, professional money bouquets',
                'Real, fresh flowers combined with crisp banknotes for maximum impact',
                'Same-day delivery available — order before 2 PM',
                'All denominations accepted: KSh 50, 100, 200, 500, or 1000 notes',
                'USD, EUR, GBP and other currencies accepted for international gifting',
                'Personalised message card included at no extra charge',
                'City Market location — easy pickup or home delivery across Nairobi',
                'Discreet packaging available for surprise deliveries',
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">{pt}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Money bouquet FAQs — Nairobi
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
          <div className="rounded-3xl bg-gradient-to-r from-amber-500 to-pink-500 text-white p-8 md:p-12 text-center shadow-xl">
            <div className="text-5xl mb-4">💸🌸</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Order your money bouquet today</h2>
            <p className="text-pink-100 mb-8 max-w-lg mx-auto">
              Same-day delivery across Nairobi. Handcrafted by expert florists at City Market. Pay with M-Pesa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold">
                <Link to="/flowers?category=money-bouquet">Shop Money Bouquets <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Custom Order
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-pink-100 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              <a href={`tel:${BUSINESS.phone}`} className="underline">{BUSINESS.phoneDisplay}</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MoneyBouquetPage;
