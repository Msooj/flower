import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { contactInfo } from '../../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-pink-50 to-pink-100">
      {/* Newsletter Section */}
      <div className="border-b border-pink-200">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Join the Flower Lifestyle
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe for exclusive offers, flower care tips, and be the first to know about new arrivals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
              />
              <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">
                <span className="text-pink-600">Flower</span>
                <span className="text-pink-400">Lifestyle</span>
              </span>
            </Link>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Bringing beauty and joy through fresh, handcrafted floral arrangements. 
              Every bouquet tells a story of love and elegance.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Shop All Flowers', 'Birthday Flowers', 'Romance & Love', 'Anniversary', 'Sympathy Flowers', 'Gift Combos'].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to="/flowers"
                      className="text-gray-600 hover:text-pink-600 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Customer Service</h4>
            <ul className="space-y-3">
              {['Track Your Order', 'Delivery Information', 'Returns & Refunds', 'FAQs', 'Privacy Policy', 'Terms of Service'].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-gray-600 hover:text-pink-600 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-pink-500 mt-0.5" />
                <div>
                  <p className="text-gray-800 font-medium">Phone / WhatsApp</p>
                  <a href={`tel:${contactInfo.phone}`} className="text-gray-600 hover:text-pink-600">
                    {contactInfo.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-pink-500 mt-0.5" />
                <div>
                  <p className="text-gray-800 font-medium">Email</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-pink-600">
                    {contactInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink-500 mt-0.5" />
                <div>
                  <p className="text-gray-800 font-medium">Address</p>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-pink-500 mt-0.5" />
                <div>
                  <p className="text-gray-800 font-medium">Working Hours</p>
                  <p className="text-gray-600">{contactInfo.hours}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pink-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {currentYear} Flower Lifestyle. All rights reserved. Made with love in Kenya.
            </p>
            <div className="flex items-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain" />
              <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">M-PESA</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
