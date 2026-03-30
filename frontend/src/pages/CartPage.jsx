import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, MessageSquare, Calendar, Clock, CreditCard, Smartphone } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

const CartPage = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('mpesa'); // 'mpesa' or 'cash'
    const [mpesaNumber, setMpesaNumber] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(null); // 'pending', 'success', 'failed'
    const [checkoutData, setCheckoutData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        personalizedMessage: '',
        deliveryDate: '',
        deliveryTime: 'morning'
    });

    // Load user profile data when checkout form is opened
    useEffect(() => {
        if (showCheckoutForm) {
            loadUserProfile();
        }
    }, [showCheckoutForm]);

    const loadUserProfile = async () => {
        try {
            const userResult = await supabase.auth.getUser();
            const user = userResult.data?.user;

            if (user) {
                const profileResult = await supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileResult.error) {
                    console.error('Error loading profile:', profileResult.error);
                    return;
                }

                if (profileResult.data) {
                    const profile = profileResult.data;
                    setCheckoutData(prev => ({
                        ...prev,
                        name: profile.full_name || '',
                        email: profile.email || user.email || '',
                        phone: profile.phone || '',
                        address: profile.address || ''
                    }));
                }
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    };

    const handleCheckoutSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // Get current user
            const userResult = await supabase.auth.getUser();
            const userId = userResult.data?.user?.id || null;

            // Create order
            const orderData = {
                user_id: userId,
                customer_name: checkoutData.name,
                customer_email: checkoutData.email,
                customer_phone: checkoutData.phone,
                customer_address: checkoutData.address,
                personalized_message: checkoutData.personalizedMessage || null,
                delivery_date: checkoutData.deliveryDate || null,
                delivery_time: checkoutData.deliveryTime,
                total_amount: cartTotal,
                status: 'pending',
                payment_method: paymentMethod,
                payment_phone_number: paymentMethod === 'mpesa' ? mpesaNumber : null
            };

            const orderResult = await supabase
                .from('orders')
                .insert([orderData])
                .select()
                .single();

            if (orderResult.error) throw orderResult.error;

            const order = orderResult.data;

            // Create order items
            const orderItems = cart.map(item => ({
                order_id: order.id,
                product_id: item.id,
                product_name: item.name,
                quantity: item.quantity,
                price: item.price
            }));

            const itemsResult = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsResult.error) throw itemsResult.error;

            // Handle M-Pesa payment
            if (paymentMethod === 'mpesa') {
                setPaymentStatus('pending');
                toast.success('Order placed successfully! Please pay manually to: 0742 370 307', { duration: 5000 });
                clearCart();
                setTimeout(() => {
                    navigate('/');
                }, 4000);
            } else {
                clearCart();
                toast.success('Order placed successfully! Payment will be collected on delivery.');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }

        } catch (error) {
            console.error('Checkout error:', error);
            toast.error(error.message || 'Failed to place order. Please try again.');
            setIsProcessing(false);
        }
    };

    const handleChange = (e) => {
        setCheckoutData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added any flowers yet.</p>
                        <Link to="/flowers">
                            <Button className="bg-pink-500 hover:bg-pink-600">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (showCheckoutForm) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto">
                        <button
                            onClick={() => setShowCheckoutForm(false)}
                            className="flex items-center text-pink-600 hover:text-pink-700 mb-6"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Cart
                        </button>

                        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

                            <form onSubmit={handleCheckoutSubmit} className="space-y-6" autoComplete="off">
                                {/* Customer Details */}
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={checkoutData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none"
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={checkoutData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none"
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={checkoutData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none"
                                        placeholder="+254 ..."
                                        autoComplete="off"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
                                    <textarea
                                        name="address"
                                        value={checkoutData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none"
                                        rows="3"
                                        placeholder="Enter full delivery address..."
                                        required
                                    />
                                </div>

                                {/* Delivery Preferences */}
                                <div className="border-t border-gray-100 pt-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-pink-500" />
                                        Delivery Preferences
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date (Optional)</label>
                                            <input
                                                type="date"
                                                name="deliveryDate"
                                                value={checkoutData.deliveryDate}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Clock className="w-4 h-4 inline mr-1" />
                                                Preferred Time
                                            </label>
                                            <select
                                                name="deliveryTime"
                                                value={checkoutData.deliveryTime}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none"
                                            >
                                                <option value="morning">Morning (8AM - 12PM)</option>
                                                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                                                <option value="evening">Evening (5PM - 8PM)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Personalized Message */}
                                <div className="border-t border-gray-100 pt-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-pink-500" />
                                        Personalized Message
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-3">Add a special message to be delivered with your flowers</p>
                                    <textarea
                                        name="personalizedMessage"
                                        value={checkoutData.personalizedMessage}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none"
                                        rows="4"
                                        placeholder="Write your message here... (e.g., 'Happy Birthday! Love, John')"
                                        maxLength="500"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">
                                        {checkoutData.personalizedMessage.length}/500 characters
                                    </p>
                                </div>

                                {/* Payment Method */}
                                <div className="border-t border-gray-100 pt-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-pink-500" />
                                        Payment Method
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('mpesa')}
                                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'mpesa'
                                                ? 'border-pink-500 bg-pink-50 text-pink-700'
                                                : 'border-gray-200 hover:border-pink-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Smartphone className="w-8 h-8" />
                                            <span className="font-semibold">M-Pesa</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('cash')}
                                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'cash'
                                                ? 'border-pink-500 bg-pink-50 text-pink-700'
                                                : 'border-gray-200 hover:border-pink-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            <CreditCard className="w-8 h-8" />
                                            <span className="font-semibold">Cash on Delivery</span>
                                        </button>
                                    </div>

                                    {paymentMethod === 'mpesa' && (
                                        <div className="bg-green-50 rounded-xl p-6 border border-green-100 mb-6">
                                            <h3 className="font-bold text-green-800 mb-2">Pay via M-Pesa</h3>
                                            <p className="text-sm text-green-700 mb-4">
                                                Please send the total amount of <span className="font-bold">KSh {cartTotal.toLocaleString()}</span> to the number below:
                                            </p>
                                            <div className="bg-white p-4 rounded-lg border border-green-200 text-center mb-4">
                                                <p className="text-sm text-green-700 mb-2">Send Money:</p>
                                                <p className="text-2xl font-bold text-gray-800 tracking-wider">0742 370 307</p>
                                                <p className="text-xs text-green-600 mt-1">Ian Mwangi</p>
                                            </div>

                                            <label className="block text-sm font-medium text-green-800 mb-2">
                                                Enter the phone number you paid from:
                                            </label>
                                            <input
                                                type="tel"
                                                value={mpesaNumber}
                                                onChange={(e) => setMpesaNumber(e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg border border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                                                placeholder="e.g., 07XX XXX XXX"
                                                required={paymentMethod === 'mpesa'}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Order Summary */}
                                <div className="bg-pink-50 rounded-xl p-6 border-t border-gray-100">
                                    <h3 className="font-bold mb-4">Order Summary</h3>
                                    <div className="space-y-2 text-sm">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex justify-between">
                                                <span>{item.name} x{item.quantity}</span>
                                                <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        ))}
                                        <div className="border-t border-pink-200 pt-2 flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span className="text-pink-600">KSh {cartTotal.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full py-6 bg-pink-500 hover:bg-pink-600 text-white rounded-xl shadow-lg"
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        <>
                                            Place Order
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
                        <div className="space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                                    <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-500">Category: {item.category}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-white rounded shadow-sm transition-all"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-white rounded shadow-sm transition-all"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-pink-600">
                                                    KSh {(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                            <span className="text-gray-600 font-medium">Subtotal</span>
                            <span className="text-xl font-bold text-gray-900">KSh {cartTotal.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-pink-600">KSh {cartTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <Button
                                onClick={() => setShowCheckoutForm(true)}
                                className="w-full py-6 bg-pink-500 hover:bg-pink-600 text-white rounded-xl shadow-lg shadow-pink-200"
                            >
                                Proceed to Checkout
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>

                            <p className="mt-4 text-xs text-center text-gray-400">
                                Secure checkout • We deliver cointrywide
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;
