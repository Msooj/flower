import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, CheckCircle, Phone } from "lucide-react";
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

const ReturnsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Returns & Refunds Policy | Flower Lifestyle Nairobi"
        description="Flower Lifestyle returns and refunds policy. We guarantee fresh flowers — if you are not satisfied, we will replace or refund your order. Contact us within 24 hours."
        canonicalUrl={`${SITE_URL}/returns`}
      />
      <Header />
      <div className="bg-gradient-to-br from-pink-50 to-white border-b border-pink-100">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-7 h-7 text-pink-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Returns &amp; Refunds</h1>
              <p className="text-gray-500 mt-1 text-sm">Last updated: August 2026</p>
            </div>
          </motion.div>
        </div>
      </div>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Guarantee Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 mb-10 text-white">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl font-bold mb-2">Our Freshness Guarantee</h2>
              <p className="text-white/90 leading-relaxed">
                We guarantee that every bouquet is made with fresh flowers on the day of delivery.
                If your flowers do not meet our quality standard, contact us within <strong>24 hours</strong> and
                we will replace them or issue a full refund — no questions asked.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Section title="1. Our Quality Promise">
            <p>
              Because flowers are a perishable product, all orders are freshly prepared on the day of delivery.
              We source our flowers daily from Nairobi City Market to guarantee the highest quality and longest vase life.
            </p>
          </Section>

          <Section title="2. When We Will Replace or Refund">
            <p>You are entitled to a replacement or refund if:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>The flowers delivered are visibly wilted, damaged, or dead on arrival</li>
              <li>The wrong product was delivered</li>
              <li>Your order was not delivered at all</li>
              <li>The bouquet is significantly different from what was ordered</li>
            </ul>
          </Section>

          <Section title="3. How to Report an Issue">
            <p>
              Contact us within <strong>24 hours of delivery</strong> with the following:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Your order number or name</li>
              <li>A photo of the flowers showing the issue</li>
              <li>A brief description of the problem</li>
            </ul>
            <p className="mt-3">Contact us via:</p>
            <ul className="list-none space-y-2 mt-2">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-500" />
                <a href="https://wa.me/254742370307" className="text-pink-600 hover:underline">WhatsApp: +254 742 370 307</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 text-pink-500">@</span>
                <a href="mailto:flowerlifestyle@gmail.com" className="text-pink-600 hover:underline">flowerlifestyle@gmail.com</a>
              </li>
            </ul>
          </Section>

          <Section title="4. Replacement Policy">
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>We will arrange a free replacement delivery as our first option to resolve any quality issue</li>
              <li>Replacements are scheduled at the earliest available delivery slot</li>
              <li>If a replacement is not possible (e.g. recipient has left the delivery address), a full refund will be issued</li>
            </ul>
          </Section>

          <Section title="5. Refund Policy">
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Refunds are processed within <strong>3–5 business days</strong> back to the original payment method</li>
              <li>M-Pesa refunds are sent to the originating phone number</li>
              <li>Card refunds are returned to the original card</li>
              <li>Cash on delivery refunds are handled via M-Pesa transfer</li>
            </ul>
          </Section>

          <Section title="6. Non-Refundable Situations">
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Flowers that have been properly cared for but wilted after 24 hours of delivery (normal perishable product behaviour)</li>
              <li>Issues reported more than 24 hours after delivery</li>
              <li>Damage caused by the recipient after delivery</li>
              <li>Orders where an incorrect delivery address was provided by the customer</li>
            </ul>
          </Section>

          <Section title="7. Order Cancellations">
            <p>
              Orders cancelled more than 4 hours before the scheduled delivery will receive a full refund.
              Cancellations within 4 hours may incur a preparation fee. See our{" "}
              <a href="/terms" className="text-pink-600 hover:underline">Terms of Service</a> for full cancellation details.
            </p>
          </Section>

          <Section title="8. Questions?">
            <p>We are here to help. If you have any concerns about your order, please reach out immediately:</p>
            <ul className="list-none space-y-1 mt-2">
              <li>WhatsApp: <a href="https://wa.me/254742370307" className="text-pink-600 hover:underline">+254 742 370 307</a></li>
              <li>Email: <a href="mailto:flowerlifestyle@gmail.com" className="text-pink-600 hover:underline">flowerlifestyle@gmail.com</a></li>
              <li>Hours: Mon–Sat 8AM–7PM, Sun 9AM–5PM</li>
            </ul>
          </Section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnsPage;
