import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';
import { Plus, Image, Lock, User, LogOut, Package, Check, X, Clock, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'products', or 'manage-products'
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        price: '',
        category: 'roses',
        image: '',
        stock: 100
    });

    // Check if user is admin on component mount
    useEffect(() => {
        checkAdminAuth();
    }, []);

    const checkAdminAuth = async () => {
        try {
            const userResult = await supabase.auth.getUser();
            const user = userResult.data?.user;

            if (!user) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            const profileResult = await supabase
                .from('user_profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profileResult.data && profileResult.data.role === 'admin') {
                setIsAuthenticated(true);
                loadOrders();
                loadProducts();
            } else {
                setIsAuthenticated(false);
                toast.error('You do not have admin privileges');
            }
        } catch (error) {
            console.error('Auth check error:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const loadOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    order_items (
                        *
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error loading orders:', error);
            toast.error('Failed to load orders');
        }
    };

    const loadProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error loading products:', error);
            toast.error('Failed to load products');
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({
                    status: newStatus,
                    updated_at: new Date().toISOString()
                })
                .eq('id', orderId);

            if (error) throw error;

            toast.success(`Order status updated to ${newStatus}`);
            loadOrders(); // Reload orders
        } catch (error) {
            console.error('Error updating order:', error);
            toast.error('Failed to update order status');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        toast.info('Logged out successfully');
        navigate('/login');
    };

    const handleAddItem = async (e) => {
        e.preventDefault();

        try {
            // Validate required fields
            if (!newItem.name.trim() || !newItem.price || !newItem.image.trim()) {
                toast.error('Name, price, and image URL are required');
                return;
            }

            // Validate price is positive
            if (parseFloat(newItem.price) <= 0) {
                toast.error('Price must be greater than 0');
                return;
            }

            const productData = {
                name: newItem.name.trim(),
                description: newItem.description.trim(),
                price: parseFloat(newItem.price),
                category: newItem.category,
                image: newItem.image.trim(),
                stock: parseInt(newItem.stock) || 100,
                rating: 5.0,
                reviews: 0
            };

            const { error } = await supabase
                .from('products')
                .insert([productData]);

            if (error) throw error;

            toast.success(`Product "${newItem.name}" added successfully!`);
            setNewItem({ name: '', description: '', price: '', category: 'roses', image: '', stock: 100 });
            loadProducts();
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Failed to add product');
        }
    };

    const handleUpdateProduct = async (productId, updatedData) => {
        try {
            // Validate required fields
            if (!updatedData.name || !updatedData.price) {
                toast.error('Name and price are required');
                return;
            }

            // Ensure numeric values are properly formatted
            const cleanedData = {
                ...updatedData,
                price: parseFloat(updatedData.price),
                stock: parseInt(updatedData.stock) || 0,
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('products')
                .update(cleanedData)
                .eq('id', productId);

            if (error) throw error;

            toast.success('Product updated successfully!');
            setEditingProduct(null);
            loadProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Failed to update product');
        }
    };

    const handleDeleteProduct = async (productId, productName) => {
        if (!confirm(`Are you sure you want to delete "${productName}"?`)) return;

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId);

            if (error) throw error;

            toast.success(`Product "${productName}" deleted successfully!`);
            loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
    };

    const getStatusBadge = (status) => {
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return statusStyles[status] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Show login prompt if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
                <Header />
                <main className="container mx-auto px-4 py-16">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl border border-pink-100 p-8 text-center">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-pink-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h1>
                            <p className="text-gray-500 mb-6">Please log in with an admin account to access this page</p>
                            <Button
                                onClick={() => navigate('/login')}
                                className="w-full py-3 bg-pink-600 hover:bg-pink-700"
                            >
                                Go to Login
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="border-pink-300 text-pink-600 hover:bg-pink-50"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-6">
                        <Button
                            onClick={() => setActiveTab('orders')}
                            variant={activeTab === 'orders' ? 'default' : 'outline'}
                            className={activeTab === 'orders' ? 'bg-pink-600' : ''}
                        >
                            <Package className="w-4 h-4 mr-2" />
                            Orders
                        </Button>
                        <Button
                            onClick={() => setActiveTab('manage-products')}
                            variant={activeTab === 'manage-products' ? 'default' : 'outline'}
                            className={activeTab === 'manage-products' ? 'bg-pink-600' : ''}
                        >
                            <Package className="w-4 h-4 mr-2" />
                            Manage Products
                        </Button>
                        <Button
                            onClick={() => setActiveTab('products')}
                            variant={activeTab === 'products' ? 'default' : 'outline'}
                            className={activeTab === 'products' ? 'bg-pink-600' : ''}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                        </Button>
                    </div>

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-8">
                            <h2 className="text-2xl font-bold mb-6">Order Management</h2>

                            {orders.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No orders yet</p>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-bold text-lg">{order.customer_name}</h3>
                                                    <p className="text-sm text-gray-500">{order.customer_email}</p>
                                                    <p className="text-sm text-gray-500">{order.customer_phone}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-pink-600">
                                                        KSh {order.total_amount.toLocaleString()}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                <p className="text-sm font-medium text-gray-700 mb-1">Delivery Address:</p>
                                                <p className="text-sm text-gray-600">{order.customer_address}</p>

                                                {order.personalized_message && (
                                                    <>
                                                        <p className="text-sm font-medium text-gray-700 mt-3 mb-1">Personalized Message:</p>
                                                        <p className="text-sm text-gray-600 italic">"{order.personalized_message}"</p>
                                                    </>
                                                )}

                                                {order.delivery_date && (
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        <Clock className="inline w-4 h-4 mr-1" />
                                                        Delivery: {new Date(order.delivery_date).toLocaleDateString()} - {order.delivery_time}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mb-4">
                                                <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                                                {order.order_items && order.order_items.map((item, idx) => (
                                                    <div key={idx} className="text-sm text-gray-600">
                                                        • {item.product_name} x{item.quantity} - KSh {(item.price * item.quantity).toLocaleString()}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium">Status:</span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                                                        {order.status.toUpperCase()}
                                                    </span>
                                                </div>

                                                <div className="flex gap-2">
                                                    {order.status !== 'processing' && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-blue-600 border-blue-300"
                                                            onClick={() => handleStatusChange(order.id, 'processing')}
                                                        >
                                                            Mark Processing
                                                        </Button>
                                                    )}
                                                    {order.status !== 'delivered' && (
                                                        <Button
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700"
                                                            onClick={() => handleStatusChange(order.id, 'delivered')}
                                                        >
                                                            <Check className="w-4 h-4 mr-1" />
                                                            Mark Delivered
                                                        </Button>
                                                    )}
                                                    {order.status !== 'cancelled' && order.status !== 'delivered' && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-red-600 border-red-300"
                                                            onClick={() => handleStatusChange(order.id, 'cancelled')}
                                                        >
                                                            <X className="w-4 h-4 mr-1" />
                                                            Cancel
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Manage Products Tab */}
                    {activeTab === 'manage-products' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-8">
                            <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

                            {products.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No products available</p>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                                            {editingProduct?.id === product.id ? (
                                                // Edit Mode
                                                <div className="space-y-3">
                                                    <input
                                                        type="text"
                                                        value={editingProduct.name}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                                        placeholder="Product Name"
                                                    />
                                                    <textarea
                                                        value={editingProduct.description || ''}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                                        placeholder="Description"
                                                        rows="2"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={editingProduct.price}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                                        placeholder="Price"
                                                    />
                                                    <select
                                                        value={editingProduct.category}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                                    >
                                                        <option value="roses">Roses</option>
                                                        <option value="birthday">Birthday</option>
                                                        <option value="romance">Romance</option>
                                                        <option value="sympathy">Sympathy</option>
                                                    </select>
                                                    <input
                                                        type="number"
                                                        value={editingProduct.stock}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                                        placeholder="Stock"
                                                    />
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            className="flex-1 bg-green-600 hover:bg-green-700"
                                                            onClick={() => {
                                                                if (!editingProduct.name?.trim() || !editingProduct.price) {
                                                                    toast.error('Name and price are required');
                                                                    return;
                                                                }
                                                                handleUpdateProduct(product.id, {
                                                                    name: editingProduct.name.trim(),
                                                                    description: editingProduct.description?.trim() || '',
                                                                    price: parseFloat(editingProduct.price),
                                                                    category: editingProduct.category,
                                                                    stock: parseInt(editingProduct.stock) || 0
                                                                });
                                                            }}
                                                        >
                                                            Save
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="flex-1"
                                                            onClick={() => setEditingProduct(null)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                // View Mode
                                                <>
                                                    {product.image && (
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-40 object-cover rounded-lg mb-3"
                                                        />
                                                    )}
                                                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-pink-600 font-bold">KSh {product.price?.toLocaleString()}</span>
                                                        <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                                                    </div>
                                                    <span className="inline-block px-2 py-1 text-xs bg-pink-100 text-pink-600 rounded-full mb-3">
                                                        {product.category}
                                                    </span>
                                                    <div className="flex gap-2 mt-3">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="flex-1 border-blue-300 text-blue-600"
                                                            onClick={() => setEditingProduct(product)}
                                                        >
                                                            <Edit className="w-4 h-4 mr-1" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="flex-1 border-red-300 text-red-600"
                                                            onClick={() => handleDeleteProduct(product.id, product.name)}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-1" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Add Product Tab */}
                    {activeTab === 'products' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-8">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-pink-500" />
                                Add New Product
                            </h2>

                            <form onSubmit={handleAddItem} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            value={newItem.name}
                                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
                                            placeholder="e.g. Red Rose Bouquet"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (KSh)</label>
                                        <input
                                            type="number"
                                            value={newItem.price}
                                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
                                            placeholder="e.g. 5000"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={newItem.description}
                                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
                                        placeholder="Product description..."
                                        rows="3"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                        <select
                                            value={newItem.category}
                                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
                                        >
                                            <option value="roses">Roses</option>
                                            <option value="birthday">Birthday</option>
                                            <option value="romance">Romance</option>
                                            <option value="sympathy">Sympathy</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                                        <input
                                            type="number"
                                            value={newItem.stock}
                                            onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
                                            placeholder="100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                    <input
                                        type="url"
                                        value={newItem.image}
                                        onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
                                        placeholder="https://images.unsplash.com/..."
                                        required
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button type="submit" className="w-full py-6 bg-pink-600 hover:bg-pink-700 text-white rounded-xl">
                                        Add Product
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminPage;
