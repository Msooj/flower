import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Package, X, Clock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/login');
                return;
            }

            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    order_items (
                        *
                    )
                `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error loading orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (!confirm('Are you sure you want to cancel and delete this order?')) return;

        try {
            const { error } = await supabase
                .from('orders')
                .delete()
                .eq('id', orderId);

            if (error) throw error;

            toast.success('Order removed successfully');
            loadOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Failed to remove order');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-pink-100">
                        <Package className="w-16 h-16 text-pink-200 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
                        <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
                        <Button
                            className="bg-pink-600 hover:bg-pink-700"
                            onClick={() => navigate('/flowers')}
                        >
                            Start Shopping
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-lg">Order #{order.id.slice(0, 8)}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {order.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Placed on {new Date(order.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-2xl text-pink-600">
                                            KSh {order.total_amount.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-500">{order.order_items?.length || 0} items</p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 py-4">
                                    {order.order_items?.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center py-2">
                                            <span className="text-gray-700">{item.product_name} x{item.quantity}</span>
                                            <span className="text-gray-600">KSh {(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 pt-4 flex justify-end">
                                    <Button
                                        variant="outline"
                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                        onClick={() => handleDeleteOrder(order.id)}
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Delete Order
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default OrdersPage;
