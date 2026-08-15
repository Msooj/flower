import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
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

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Privacy Policy | Flower Lifestyle Nairobi"
        description="Read the Flower Lifestyle privacy policy. We explain how we collect, use, and protect your personal data when you order flowers in Nairobi."
        canonicalUrl={`${SITE_URL}/privacy`}
      />
      <Header />
      <div className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 text-pink-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-500 mt-1 text-sm">Last updated: August 2026</p>
            </div>
          </motion.div>
        </div>
      </div>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-pink-50 rounded-2xl p-6 mb-10 border border-pink-100">
          <p className="text-gray-700 leading-relaxed">
            Flower Lifestyle operates <strong>www.flowerlifestyle.co.ke</strong> and provides flower delivery in Nairobi, Kenya.
            This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or place an order.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Section title="1. Information We Collect">
            <p>When you place an order or contact us, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Name and contact details</strong> — full name, phone number, and email address</li>
              <li><strong>Delivery address</strong> — the address where flowers should be delivered</li>
              <li><strong>Order details</strong> — products purchased, prices, and order notes</li>
              <li><strong>Payment information</strong> — M-Pesa transaction IDs, or card payment confirmation (we do not store full card numbers)</li>
              <li><strong>Account information</strong> — if you create an account, your login email and order history</li>
              <li><strong>Communications</strong> — messages you send us via WhatsApp, email, or contact forms</li>
            </ul>
          </Section>
          <Section title="2. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Process and fulfil your flower orders</li>
              <li>Communicate with you about your order status and delivery</li>
              <li>Process payments via M-Pesa, Visa, or Mastercard</li>
              <li>Respond to your queries and provide customer support</li>
              <li>Improve our website and services</li>
            </ul>
            <p className="mt-3">We do <strong>not</strong> sell, rent, or trade your personal information to third parties for marketing purposes.</p>
          </Section>
          <Section title="3. Data Storage and Security">
            <p>
              Your data is stored securely using <strong>Supabase</strong>, a cloud database provider with encryption in transit (TLS) and at rest.
              Payments are processed via secure payment gateways — we never store full card details on our servers.
              M-Pesa transactions are handled by Safaricom Daraja API.
            </p>
          </Section>
          <Section title="4. Cookies">
            <p>
              Our website uses essential cookies to maintain your shopping cart and login session. We may also use
              Google Analytics cookies to understand site usage. You can disable cookies in your browser settings.
            </p>
          </Section>
          <Section title="5. Sharing Your Information">
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Delivery staff</strong> — your name, phone number, and delivery address to complete your order</li>
              <li><strong>Payment processors</strong> — Safaricom (M-Pesa), Visa, and Mastercard as required</li>
              <li><strong>Supabase</strong> — our database provider, under their privacy and security policies</li>
            </ul>
          </Section>
          <Section title="6. Data Retention">
            <p>
              We retain order information for up to <strong>3 years</strong> for business record-keeping.
              Account data is retained while your account is active. You may request deletion at any time.
            </p>
          </Section>
          <Section title="7. Your Rights">
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Request a copy of the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of any marketing communications</li>
            </ul>
            <p className="mt-3">
              Contact us at <a href="mailto:flowerlifestyle@gmail.com" className="text-pink-600 hover:underline">flowerlifestyle@gmail.com</a> or
              WhatsApp <a href="tel:+254742370307" className="text-pink-600 hover:underline">+254 742 370 307</a>.
            </p>
          </Section>
          <Section title="8. Contact Us">
            <ul className="list-none space-y-1 mt-2">
              <li>Email: <a href="mailto:flowerlifestyle@gmail.com" className="text-pink-600 hover:underline">flowerlifestyle@gmail.com</a></li>
              <li>Phone: <a href="tel:+254742370307" className="text-pink-600 hover:underline">+254 742 370 307</a></li>
              <li>Address: City Market, Nairobi CBD, Kenya</li>
            </ul>
          </Section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
