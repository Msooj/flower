import React from 'react';
import { Star, Truck, MapPin, CreditCard } from 'lucide-react';

const TrustSignalsBar = () => (
  <section className="bg-white border-y border-pink-100 py-4 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-pink-100">
        {[
          {
            icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" />,
            label: '4.8 / 5 Stars',
            sub: '127+ Google Reviews',
          },
          {
            icon: <Truck className="w-5 h-5 text-pink-500" />,
            label: 'Same-Day Delivery',
            sub: 'Order before 2 PM',
          },
          {
            icon: <MapPin className="w-5 h-5 text-pink-500" />,
            label: 'City Market, CBD',
            sub: 'Walk-in or order online',
          },
          {
            icon: <CreditCard className="w-5 h-5 text-green-500" />,
            label: 'M-Pesa Accepted',
            sub: 'Visa & Mastercard too',
          },
        ].map(({ icon, label, sub }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 text-center"
          >
            <div className="flex items-center gap-1.5">
              {icon}
              <span className="text-sm font-bold text-gray-800">{label}</span>
            </div>
            <span className="text-xs text-gray-500">{sub}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSignalsBar;
