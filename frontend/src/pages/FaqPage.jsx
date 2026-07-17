import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { SITE_URL, faqSchema, breadcrumbSchema, BUSINESS } from '../data/seoConfig';

const ALL_FAQS = [
  {
    question: 'How do I order flowers online in Kenya?',
    answer:
      'Visit flowerlifestyle.co.ke, browse bouquets by occasion, add to cart, and checkout with your delivery address. You can also order via WhatsApp at 0742 370 307 for faster help with custom requests.',
  },
  {
    question: 'How much does flower delivery cost in Nairobi?',
    answer:
      'Delivery fees vary by location and order size. Nairobi CBD and nearby areas typically have lower fees than distant suburbs. Exact costs appear at checkout or via WhatsApp quote.',
  },
  {
    question: 'Do you offer funeral and sympathy flowers?',
    answer:
      'Yes. We prepare respectful wreaths and sympathy bouquets for funerals and memorials in Nairobi. Contact us urgently on WhatsApp for same-day sympathy flower delivery when possible.',
  },
  {
    question: 'What is your return or refund policy?',
    answer:
      'Because flowers are perishable, we address quality concerns case by case. If your order arrives damaged or incorrect, contact us within 24 hours with photos and we will make it right.',
  },
  {
    question: 'Can I add a personalized message with my bouquet?',
    answer:
      'Yes. Add your message at checkout and we will include a complimentary gift card with your flowers.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept M-Pesa, cash on delivery (where available), and card payments. M-Pesa is the most popular option for customers across Kenya.',
  },
  {
    question: 'Where is Flower Lifestyle located?',
    answer:
      'We are located at City Market, Nairobi, Kenya. We operate primarily online, which allows us to prepare fresh bouquets daily and deliver them directly to your destination without storage delays.',
  },
  {
    question: 'What are your operating hours?',
    answer:
      'Our team is available Monday through Saturday from 8:00 AM to 7:00 PM, and on Sundays from 9:00 AM to 5:00 PM. You can place your orders online 24/7.',
  },
  {
    question: 'Can I place a same-day flower delivery order in Nairobi?',
    answer:
      'Yes, we offer same-day flower delivery across Nairobi. To guarantee same-day delivery, please place your order by 2:00 PM. Orders placed after 2:00 PM will be delivered the following day, or processed on request if resources allow.',
  },
  {
    question: 'Do you offer customized bouquets or gift baskets?',
    answer:
      'Absolutely! We specialize in custom flower arrangements and personalized gift baskets/hampers for birthdays, anniversaries, corporate events, and other milestones. Feel free to contact our florists via WhatsApp to discuss your unique design preferences.',
  },
];

const FaqPage = () => {
  const canonical = `${SITE_URL}/faq`;

  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Flower Shop FAQs Kenya | Ordering & Delivery | Flower Lifestyle"
        description="Answers about ordering flowers online in Kenya, M-Pesa payment, same-day Nairobi delivery, refunds, sympathy flowers, and personalized messages."
        keywords="flower shop FAQ Kenya, order flowers online help, M-Pesa flowers Nairobi, flower delivery questions"
        canonicalUrl={canonical}
      />
      <StructuredData
        data={[
          faqSchema(ALL_FAQS),
          breadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'FAQ', url: canonical },
          ]),
        ]}
      />

      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16 max-w-3xl">
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-pink-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">FAQ</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>

        <div className="space-y-4 mb-10">
          {ALL_FAQS.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-2">{faq.question}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-600">
          Still have questions?{' '}
          <a href={BUSINESS.whatsapp} className="text-pink-600 font-medium hover:underline">
            Chat on WhatsApp
          </a>{' '}
          or email{' '}
          <a href={`mailto:${BUSINESS.email}`} className="text-pink-600 font-medium hover:underline">
            {BUSINESS.email}
          </a>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default FaqPage;
