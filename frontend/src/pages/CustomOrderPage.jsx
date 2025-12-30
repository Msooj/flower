import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CustomOrderForm from '../components/orders/CustomOrderForm';

const CustomOrderPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Custom Flower Arrangements
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Let us create a one-of-a-kind floral arrangement tailored to your exact preferences and occasion.
          </motion.p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-pink-50 p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-pink-100 text-pink-600 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Fill Out the Form</h3>
                    <p className="text-gray-600 text-sm">Tell us about your preferences, occasion, and any special requests.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-pink-100 text-pink-600 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Receive a Design Proposal</h3>
                    <p className="text-gray-600 text-sm">Our florists will create a custom design and provide a quote within 24 hours.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-pink-100 text-pink-600 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Approve & Confirm</h3>
                    <p className="text-gray-600 text-sm">Review the design, make any adjustments, and confirm your order.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-pink-100 text-pink-600 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Enjoy Your Custom Creation</h3>
                    <p className="text-gray-600 text-sm">We'll carefully craft and deliver your unique arrangement.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="p-8">
              <CustomOrderForm />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-gray-700 mb-6">
            Our floral design team is here to help you create the perfect arrangement for any occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+254742370307" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-pink-600 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Us: +254 742 370 307
            </a>
            <a 
              href="mailto:custom@flowerlifestyle.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-pink-600 text-white font-medium rounded-lg shadow-sm hover:bg-pink-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomOrderPage;
