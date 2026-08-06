import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, MessageCircle } from 'lucide-react';
import { contactInfo } from '../../data/mock';
import { BUSINESS } from '../../data/seoConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-pink-50 to-pink-100">

      {/* Map Section */}
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
              title="Flower Lifestyle Location - City Market Nairobi"
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            ></iframe>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative">
                <MapPin className="w-12 h-12 text-red-600 fill-white drop-shadow-lg animate-bounce" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/30 rounded-full blur-[2px]"></div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <a
              href="https://www.google.com/maps/search/flowerlifstyle/@-1.2777859,36.815201,16z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDcxNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 font-medium text-sm underline underline-offset-2 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Find us on Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
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
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/254742370307"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-colors"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Shop Flowers</h4>
            <ul className="space-y-3">
              <li><Link to="/flowers" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">All Flowers</Link></li>
              <li><Link to="/flowers/birthday" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Birthday Flowers</Link></li>
              <li><Link to="/flowers/romance" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Romance &amp; Love</Link></li>
              <li><Link to="/flowers/roses" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Roses Collection</Link></li>
              <li><Link to="/flowers/anniversary" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Anniversary Flowers</Link></li>
              <li><Link to="/flowers/combos" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Gift Combos</Link></li>
              <li><Link to="/flowers/money-bouquet" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Money Bouquets</Link></li>
              <li><Link to="/flowers/mothers-day" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Mother's Day</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link to="/delivery" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Delivery Information</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">FAQs</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Blog &amp; Articles</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/florist-kenya" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">Florist in Kenya</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h4>
            <address className="not-italic">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Phone / WhatsApp</p>
                    <a href="tel:+254742370307" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">
                      {contactInfo.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Email</p>
                    <a href="mailto:flowerlifestyle@gmail.com" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">
                      {contactInfo.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Address</p>
                    <p className="text-gray-600 text-sm">{contactInfo.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Working Hours</p>
                    <p className="text-gray-600 text-sm">{contactInfo.hours}</p>
                  </div>
                </li>
              </ul>
            </address>
          </div>

        </div>
      </div>

      {/* We Deliver To — neighbourhood links for SEO */}
      <div className="border-t border-pink-200 bg-pink-50">
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-widest">We Deliver Flowers To</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-4">
            {[
              { label: 'Westlands', href: '/flower-delivery-westlands' },
              { label: 'Kilimani', href: '/flower-delivery-kilimani' },
              { label: 'Karen', href: '/flower-delivery-karen' },
              { label: 'Lavington', href: '/flower-delivery-lavington' },
              { label: 'Gigiri', href: '/flower-delivery-gigiri' },
              { label: 'Kasarani', href: '/flower-delivery-kasarani' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-pink-200 text-sm font-medium text-gray-700 hover:text-pink-600 hover:border-pink-400 hover:shadow-sm transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/same-day-flower-delivery-nairobi" className="text-xs text-pink-600 hover:underline font-medium">Same-Day Delivery Nairobi</Link>
            <span className="text-gray-300">·</span>
            <Link to="/money-bouquet-nairobi" className="text-xs text-pink-600 hover:underline font-medium">Money Bouquet Nairobi</Link>
            <span className="text-gray-300">·</span>
            <Link to="/corporate-flower-gifts-nairobi" className="text-xs text-pink-600 hover:underline font-medium">Corporate Flower Gifts</Link>
            <span className="text-gray-300">·</span>
            <Link to="/florist-kenya" className="text-xs text-pink-600 hover:underline font-medium">Florist in Kenya</Link>
          </div>
        </div>
      </div>

      {/* Google Business Profile Review CTA */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-500">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white text-center sm:text-left">
              <p className="font-bold text-sm">⭐ Loved your flowers? Leave us a Google Review!</p>
              <p className="text-pink-100 text-xs mt-0.5">Your review helps other Nairobi customers find us and means the world to our team.</p>
            </div>
            <a
              href={BUSINESS.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="google-review-cta"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-pink-600 font-bold text-sm px-5 py-2.5 rounded-full hover:bg-pink-50 transition-colors shadow-md"
            >
              ⭐ Write a Review
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pink-200 overflow-hidden">
        <div className="container mx-auto px-4 py-6">
          {/* NAP - Local SEO */}
          <div className="text-center mb-4">
            <div className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              <strong>Flower Lifestyle</strong> | City Market, Nairobi, Kenya |{' '}
              Phone:{' '}
              <a href="tel:+254742370307" className="hover:text-pink-600 transition-colors">0742 370 307</a>{' '}
              | Email:{' '}
              <a href="mailto:flowerlifestyle@gmail.com" className="hover:text-pink-600 transition-colors">flowerlifestyle@gmail.com</a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm text-center sm:text-left">
              &copy; {currentYear} Flower Lifestyle. All rights reserved. Made with love in Kenya.
            </p>
            <div className="flex items-center flex-wrap justify-center gap-3">
              <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/ke.svg" alt="Kenya" className="h-4 sm:h-5 object-contain" />
              <img src="/visa.png" alt="Visa" className="h-8 sm:h-12 object-contain" />
              <img src="/Mastercard--Streamline-Svg-Logos.png" alt="Mastercard" className="h-8 sm:h-12 object-contain" />
              <div className="bg-green-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs font-bold">M-PESA</div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
