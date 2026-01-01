import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { Heart, Flower2, Clock, MapPin, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
    const values = [
        {
            icon: <Flower2 className="w-8 h-8 text-pink-500" />,
            title: "Freshness Guaranteed",
            description: "We source our flowers daily from the best growers in Kenya to ensure they reach you in peak condition."
        },
        {
            icon: <Heart className="w-8 h-8 text-pink-500" />,
            title: "Crafted with Love",
            description: "Every bouquet is a work of art, hand-arranged by our expert florists with meticulous attention to detail."
        },
        {
            icon: <Clock className="w-8 h-8 text-pink-500" />,
            title: "Timely Delivery",
            description: "We understand the importance of timing. Our reliable delivery team ensures your gifts arrive exactly when they should."
        },
        {
            icon: <CheckCircle2 className="w-8 h-8 text-pink-500" />,
            title: "Customer First",
            description: "Your satisfaction is our top priority. We go above and beyond to make your flower-giving experience perfect."
        }
    ];

    const deliveryLocations = [
        {
            region: "Nairobi & Environs",
            locations: ["CBD", "Westlands", "Kilimani", "Lavington", "Karen", "South B/C", "Langata", "Embakasi", "Eastlands"]
        },
        {
            region: "Thika Road Axis",
            locations: ["Pangani", "Muthaiga", "Garden City", "Ruaraka", "Kasarani", "Roysambu", "Githurai", "Kahawa Sukari/Wendani", "Ruiru", "Juja", "Thika Town"]
        },
        {
            region: "Other Satellite Towns",
            locations: ["Kiambu", "Ngong", "Rongai", "Syokimau", "Kitengela"]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative bg-pink-50 overflow-hidden">
                    <div className="container mx-auto px-4 py-8 md:py-16 lg:py-20">
                        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
                            <div className="lg:w-1/2 relative z-10 text-center lg:text-left">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-block px-3 py-1 bg-white text-pink-600 rounded-full text-xs font-semibold mb-4 shadow-sm"
                                >
                                    Our Story
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4"
                                >
                                    Bringing Nature's <span className="text-pink-600">Beauty</span> To Your Doorstep
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mb-6"
                                >
                                    Founded on a passion for floral artistry and a commitment to spreading joy,
                                    Flower Lifestyle has grown from a small family project into Nairobi's
                                    premier destination for exquisite floral arrangements.
                                </motion.p>
                            </div>
                            <div className="lg:w-1/2 relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-2"
                                >
                                    <img
                                        src="/florist_working_about_us.png"
                                        alt="Florist at work"
                                        className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Us Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Flower Lifestyle?</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">We don't just sell flowers; we create unforgettable experiences and help you express emotions that words sometimes can't.</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-pink-50 border border-pink-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                                >
                                    <div className="mb-3 md:mb-6">{value.icon}</div>
                                    <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-2 md:mb-4">{value.title}</h3>
                                    <p className="hidden md:block text-gray-600 leading-relaxed text-sm">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Delivery Locations */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-12 items-center">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Where We Deliver</h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    We take pride in our extensive delivery network, ensuring that fresh flowers reach your loved ones across Nairobi and beyond.
                                    Our specialized Thika Road team ensures rapid delivery to all estates along the highway.
                                </p>
                                <div className="space-y-8">
                                    {deliveryLocations.map((item, index) => (
                                        <div key={index}>
                                            <h4 className="flex items-center gap-2 text-pink-600 font-bold text-lg mb-3">
                                                <MapPin className="w-5 h-5" />
                                                {item.region}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {item.locations.map((loc, lIdx) => (
                                                    <span key={lIdx} className="px-3 py-1 bg-white border border-pink-100 rounded-full text-sm text-gray-600">
                                                        {loc}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/2">
                                <div className="rounded-3xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src="/flower_delivery_van_nairobi.png"
                                        alt="Delivery Van"
                                        className="w-full h-[250px] md:h-[500px] object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-pink-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Send Some Love?</h2>
                        <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto">Browse our collection and find the perfect arrangement for your special someone today.</p>
                        <button
                            onClick={() => window.location.href = '/flowers'}
                            className="px-10 py-4 bg-white text-pink-600 font-bold rounded-full hover:bg-pink-50 transition-colors shadow-lg"
                        >
                            Shop All Flowers
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
