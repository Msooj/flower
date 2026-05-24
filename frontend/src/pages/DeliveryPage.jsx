import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageMetaTags from '../components/seo/PageMetaTags';
import StructuredData from '../components/seo/StructuredData';
import { Button } from '../components/ui/button';
import { Truck, Clock, MapPin } from 'lucide-react';
import { SITE_URL, breadcrumbSchema } from '../data/seoConfig';

const AREAS = [
  {
    region: 'Nairobi CBD & Central',
    places: ['CBD', 'Upper Hill', 'Ngara', 'Parklands'],
  },
  {
    region: 'West & South Nairobi',
    places: ['Westlands', 'Kilimani', 'Lavington', 'Karen', 'Langata', 'South B', 'South C', 'Embakasi'],
  },
  {
    region: 'East & North Nairobi',
    places: ['Eastlands', 'Kasarani', 'Roysambu', 'Githurai', 'Ruaraka', 'Thika Road corridor'],
  },
  {
    region: 'Greater Nairobi & Kenya',
    places: ['Kiambu', 'Ruiru', 'Juja', 'Ngong', 'Rongai', 'Syokimau', 'Kitengela', 'Countrywide on request'],
  },
];

const DeliveryPage = () => {
  const canonical = `${SITE_URL}/delivery`;

  return (
    <div className="min-h-screen bg-white">
      <PageMetaTags
        title="Flower Delivery Nairobi & Kenya | Same-Day Delivery | Flower Lifestyle"
        description="Same-day flower delivery in Nairobi: CBD, Westlands, Karen, Kilimani & more. Countrywide delivery across Kenya. Order online or WhatsApp. M-Pesa accepted."
        keywords="flower delivery Nairobi, same day flower delivery Kenya, flower delivery Westlands, Karen flower delivery, deliver flowers Nairobi CBD"
        canonicalUrl={canonical}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Delivery', url: canonical },
        ])}
      />

      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-pink-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Delivery</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Flower Delivery in Nairobi & Across Kenya
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Flower Lifestyle offers <strong>same-day flower delivery in Nairobi</strong> for orders placed
          early in the day. We deliver to homes, offices, hospitals, schools, and event venues. Need
          flowers sent outside Nairobi? Contact us — we arrange <strong>countrywide flower delivery in Kenya</strong>.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="rounded-xl border border-pink-100 p-5">
            <Truck className="w-8 h-8 text-pink-500 mb-2" />
            <h2 className="font-bold text-gray-900">Same-day Nairobi</h2>
            <p className="text-sm text-gray-600 mt-1">
              Order before midday for best same-day slots. Evening delivery available in select areas.
            </p>
          </div>
          <div className="rounded-xl border border-pink-100 p-5">
            <Clock className="w-8 h-8 text-pink-500 mb-2" />
            <h2 className="font-bold text-gray-900">Scheduled delivery</h2>
            <p className="text-sm text-gray-600 mt-1">
              Pick a preferred date and time window for birthdays, anniversaries, and surprises.
            </p>
          </div>
          <div className="rounded-xl border border-pink-100 p-5">
            <MapPin className="w-8 h-8 text-pink-500 mb-2" />
            <h2 className="font-bold text-gray-900">Nationwide Kenya</h2>
            <p className="text-sm text-gray-600 mt-1">
              Mombasa, Kisumu, Nakuru, Eldoret & more — ask on WhatsApp for partner delivery quotes.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Areas we deliver in Nairobi</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {AREAS.map((area) => (
            <div key={area.region} className="rounded-lg bg-pink-50/50 border border-pink-100 p-4">
              <h3 className="font-semibold text-pink-800 mb-2">{area.region}</h3>
              <p className="text-sm text-gray-600">{area.places.join(' · ')}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-600 mb-6">
          Delivery fees depend on location and bouquet size. You will see options at checkout or receive
          a quote on WhatsApp. All arrangements are prepared fresh at our City Market florist shop before
          dispatch.
        </p>

        <Button asChild className="bg-pink-500 hover:bg-pink-600">
          <Link to="/flowers">Order flowers for delivery</Link>
        </Button>
      </main>

      <Footer />
    </div>
  );
};

export default DeliveryPage;
