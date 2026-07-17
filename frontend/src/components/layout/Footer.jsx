import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { contactInfo } from '../../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-pink-50 to-pink-100">
      {/* Location Map */}
      <div className="border-b border-pink-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <MapPin className="text-pink-500" />
              Visit Us at City Market, Nairobi CBD
            </h3>
          </div>
          <div className="w-full h-[350px] rounded-2xl overflow-hidden shadow-sm border border-pink-100 relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.4099589032735!2d36.81913927496574!3d-1.2841499987036324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d7a96e545b%3A0x1c1e57c6b758203d!2sCity%20Market!5e0!3m2!1sen!2ske!4v1709123456789!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Flower Lifestyle Location"
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            ></iframe>
            {/* Custom Red Pin Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative">
                <MapPin className="w-12 h-12 text-red-600 fill-white drop-shadow-lg animate-bounce" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/30 rounded-full blur-[2px]"></div>
              </div>
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
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/florist-kenya" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Florist in Kenya
                </Link>
              </li>
              <li>
                <Link to="/flowers" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Shop All Flowers
                </Link>
              </li>
              <li>
                <Link to="/flowers?category=birthday" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Birthday Flowers
                </Link>
              </li>
              <li>
                <Link to="/flowers?category=romance" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Romance & Love
                </Link>
              </li>
              <li>
                <Link to="/flowers?category=anniversary" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Anniversary
                </Link>
              </li>
              <li>
                <Link to="/flowers?category=roses" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Roses Collection
                </Link>
              </li>
              <li>
                <Link to="/flowers?category=combos" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Gift Combos
                </Link>
              </li>
              <li>
                <Link to="/flowers?category=mothers-day" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Mother&apos;s Day Flowers
                </Link>
              </li>
              <li>
                <Link to="/flowers?category=money-bouquet" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Money Bouquets
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-pink-600 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/delivery" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-pink-600 transition-colors">
                  FAQs
                </Link>
              </li>
              <li className="text-gray-600">Returns & Refunds</li>
              <li className="text-gray-600">Privacy Policy</li>
              <li className="text-gray-600">Terms of Service</li>
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
                  <span className="text-gray-600">
                    {contactInfo.phone}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-pink-500 mt-0.5" />
                <div>
                  <p className="text-gray-800 font-medium">Email</p>
                  <span className="text-gray-600">
                    {contactInfo.email}
                  </span>
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
          {/* NAP - Local SEO */}
          <div className="text-center mb-4">
            <div className="text-sm text-gray-600 font-medium">
              <strong>Flower Lifestyle</strong> | City Market, Nairobi, Kenya | Phone: 0742370307 | Email: flowerlifestyle@gmail.com
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {currentYear} Flower Lifestyle. All rights reserved. Made with love in Kenya.
            </p>
            <div className="flex items-center gap-4">
              <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ke.svg" alt="Kenya" className="h-5 object-contain" />
              <img src="/visa.png" alt="Visa" className="h-12 object-contain" />
              <img src="/Mastercard--Streamline-Svg-Logos.png" alt="Mastercard" className="h-12 object-contain" />
              <div className="bg-green-500 text-white px-3 py-1.5 rounded text-xs font-bold">M-PESA</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
