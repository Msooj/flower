import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PageMetaTags from "../components/seo/PageMetaTags";
import { SITE_URL } from "../data/seoConfig";

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-pink-100">{title}</h2>
    <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
  </div>
);

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Terms of Service | Flower Lifestyle Nairobi"
        description="Read the Flower Lifestyle terms of service. Understand your rights and obligations when ordering flowers and gifts online in Nairobi, Kenya."
        canonicalUrl={`${SITE_URL}/terms`}
      />
      <Header />
      <div className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7 text-pink-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-500 mt-1 text-sm">Last updated: August 2026</p>
            </div>
          </motion.div>
        </div>
      </div>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-pink-50 rounded-2xl p-6 mb-10 border border-pink-100">
          <p className="text-gray-700 leading-relaxed">
            By using our website or placing an order, you agree to these Terms of Service. Please read them carefully.
            These terms govern your use of <strong>www.flowerlifestyle.co.ke</strong> and any orders you place with Flower Lifestyle.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Section title="1. Placing an Order">
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Orders are accepted subject to availability of flowers and delivery areas</li>
              <li>By placing an order you confirm that all information provided is accurate</li>
              <li>We reserve the right to substitute flowers of equivalent quality and value if a specific variety is unavailable</li>
              <li>Order confirmation will be sent via WhatsApp or email once your order is received</li>
            </ul>
          </Section>
          <Section title="2. Pricing">
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>All prices are listed in Kenyan Shillings (KES)</li>
              <li>Prices include VAT where applicable</li>
              <li>Delivery charges (if any) are shown at checkout</li>
              <li>We reserve the right to change prices at any time without prior notice, but this will not affect orders already confirmed</li>
            </ul>
          </Section>
          <Section title="3. Payment">
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>We accept M-Pesa, Visa, Mastercard, and cash on delivery (within Nairobi)</li>
              <li>Payment is due at the time of order</li>
              <li>Orders will only be processed once full payment is confirmed</li>
              <li>In the event of a failed payment, please contact us before placing a new order to avoid duplicate charges</li>
            </ul>
          </Section>
          <Section title="4. Delivery">
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Same-day delivery is available for orders placed before 2:00 PM Nairobi time</li>
              <li>Orders placed after 2:00 PM will be delivered the following business day unless otherwise agreed</li>
              <li>Delivery is available across Nairobi and Kenya — delivery charges may apply outside central Nairobi</li>
              <li>We will contact you if there are any issues with your delivery address or timing</li>
              <li>We are not liable for delays caused by circumstances outside our control (e.g. traffic, adverse weather)</li>
            </ul>
          </Section>
          <Section title="5. Cancellations">
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Orders may be cancelled free of charge if cancelled more than 4 hours before the scheduled delivery</li>
              <li>Cancellations made within 4 hours of delivery may incur a preparation charge</li>
              <li>To cancel an order, contact us immediately via WhatsApp at +254 742 370 307</li>
            </ul>
          </Section>
          <Section title="6. Returns and Refunds">
            <p>
              Please refer to our <a href="/returns" className="text-pink-600 hover:underline">Returns and Refunds Policy</a> for
              full details on how we handle quality issues, replacements, and refunds.
            </p>
          </Section>
          <Section title="7. Intellectual Property">
            <p>
              All content on this website — including images, text, logos, and designs — is the property of Flower Lifestyle
              and may not be reproduced without permission.
            </p>
          </Section>
          <Section title="8. Limitation of Liability">
            <p>
              Flower Lifestyle shall not be liable for any indirect, incidental, or consequential damages arising from your
              use of our website or products, except as required by applicable Kenyan law.
            </p>
          </Section>
          <Section title="9. Governing Law">
            <p>
              These terms are governed by the laws of the Republic of Kenya. Any disputes shall be subject to the
              jurisdiction of the Kenyan courts.
            </p>
          </Section>
          <Section title="10. Contact Us">
            <ul className="list-none space-y-1 mt-2">
              <li>Email: <a href="mailto:flowerlifestyle@gmail.com" className="text-pink-600 hover:underline">flowerlifestyle@gmail.com</a></li>
              <li>WhatsApp: <a href="tel:+254742370307" className="text-pink-600 hover:underline">+254 742 370 307</a></li>
              <li>Address: City Market, Nairobi CBD, Kenya</li>
            </ul>
          </Section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
