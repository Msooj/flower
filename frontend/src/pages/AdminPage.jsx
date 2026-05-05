import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { supabase, createFreshClient } from '../lib/supabase';
import { Plus, Image, Lock, User, LogOut, Package, Check, X, Clock, Edit, Trash2, Eye, EyeOff, Upload, BarChart2, TrendingUp, ShoppingBag, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useOrderNotifications from '../hooks/useOrderNotifications';

const AdminPage = () => {
    const navigate = useNavigate();
    const { requestPermission, testNotification } = useOrderNotifications(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Start as false — show login form immediately, then check session in background
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem('adminActiveTab') || 'orders');
    const [currentUser, setCurrentUser] = useState({ email: '', role: '' });
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        price: '',
        category: 'mothers-day',
        image: '',
        stock: 100
    });
    const [adminLoginData, setAdminLoginData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [users, setUsers] = useState([]);
    const [dataLoading, setDataLoading] = useState({ users: false, orders: false, products: false });

    // Check if user is admin on component mount
    useEffect(() => {
        checkAdminAuth();
    }, []);

    // Persist tab selection
    useEffect(() => {
        localStorage.setItem('adminActiveTab', activeTab);
    }, [activeTab]);

    const checkAdminAuth = async () => {
        try {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error('Session check error:', error);
                setIsAuthenticated(false);
                return;
            }

            const session = data?.session;

            if (!session) {
                setIsAuthenticated(false);
                return;
            }

            setCurrentUser({ email: session.user.email, role: 'admin' });
            setIsAuthenticated(true);

            // Load only the active tab on mount — other tabs load lazily on switch
            const tab = localStorage.getItem('adminActiveTab') || 'orders';
            if (tab === 'users') loadUsers(session);
            else if (tab === 'manage-products' || tab === 'products') loadProducts(session);
            else loadOrders(session);

        } catch (error) {
            console.error('Auth check error:', error.message);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (event, isEditing = false) => {
        console.log('handleFileUpload called, isEditing:', isEditing);
        console.log('Event target:', event.target);
        console.log('Files object:', event.target.files);
        
        const file = event.target.files[0];
        console.log('Selected file:', file);
        console.log('File details:', {
            name: file?.name,
            size: file?.size,
            type: file?.type,
            lastModified: file?.lastModified
        });
        
        if (!file) {
            console.log('No file selected');
            toast.error('Please select a file first');
            return;
        }

        // Basic validation
        if (!file.type.startsWith('image/')) {
            console.log('Invalid file type:', file.type);
            toast.error(`Please upload an image file. Selected type: ${file.type}`);
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            console.log('File too large:', file.size);
            toast.error(`File size must be less than 5MB. Selected size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
            return;
        }

        console.log('File validation passed, starting upload');
        setIsUploading(true);
        
        try {
            console.log('Starting upload for file:', file.name);
            console.log('File size:', file.size, 'bytes');
            console.log('File type:', file.type);
            
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `products/${fileName}`;

            console.log('Generated filePath:', filePath);
            console.log('File extension:', fileExt);

            // Check if Supabase client is available
            if (!supabase) {
                throw new Error('Supabase client not available');
            }

            let uploadError = null;

            // Retry loop for "body stream" error
            for (let i = 0; i < 3; i++) {
                try {
                    console.log(`Upload attempt ${i + 1} for ${filePath}`);
                    console.log('Supabase storage client:', supabase.storage);
                    
                    const result = await supabase.storage
                        .from('products')
                        .upload(filePath, file, {
                            cacheControl: '3600',
                            upsert: false
                        });

                    console.log('Upload result:', result);

                    if (result.error) {
                        console.error(`Upload attempt ${i + 1} error:`, result.error);
                        console.error('Error details:', {
                            message: result.error.message,
                            statusCode: result.error.statusCode,
                            error: result.error.error
                        });
                        
                        if (result.error.message?.includes('body stream') || 
                            result.error.message?.includes('Failed to execute') ||
                            result.error.message?.includes('timeout')) {
                            console.warn(`Upload attempt ${i + 1} failed with stream error, retrying...`);
                            await new Promise(r => setTimeout(r, 1000));
                            continue;
                        }
                        uploadError = result.error;
                        break;
                    }

                    // Success - get public URL
                    console.log('Upload successful, getting public URL');
                    const { data: { publicUrl } } = supabase.storage
                        .from('products')
                        .getPublicUrl(filePath);

                    console.log('Public URL retrieved:', publicUrl);

                    if (isEditing) {
                        console.log('Updating editing product image');
                        setEditingProduct({ ...editingProduct, image: publicUrl });
                    } else {
                        console.log('Updating new item image');
                        setNewItem({ ...newItem, image: publicUrl });
                    }
                    toast.success('Image uploaded successfully');
                    return;
                } catch (e) {
                    console.error(`Upload attempt ${i + 1} catch:`, e);
                    console.error('Error stack:', e.stack);
                    
                    if (e.message?.includes('body stream') || 
                        e.message?.includes('Failed to execute') ||
                        e.message?.includes('timeout')) {
                        console.warn(`Upload catch ${i + 1} failed with stream error, retrying...`);
                        await new Promise(r => setTimeout(r, 1000));
                        continue;
                    }
                    uploadError = e;
                    break;
                }
            }

            if (uploadError) throw uploadError;

        } catch (error) {
            console.error('Error uploading image:', error);
            console.error('Full error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            
            // Detailed troubleshooting for user
            const errorMsg = error.message || 'Unknown error';
            toast.error(
                <div className="text-xs">
                    <p className="font-bold mb-1">Upload Failed: {errorMsg}</p>
                    <p className="mb-2">Please check:</p>
                    <ol className="list-decimal ml-4 mt-1 space-y-1">
                        <li>Supabase Storage bucket "products" exists</li>
                        <li>Bucket is set to "Public"</li>
                        <li>Storage policy allows "INSERT" for authenticated users</li>
                        <li>File size is less than 5MB</li>
                        <li>File is a valid image format</li>
                    </ol>
                    <p className="mt-2">Check browser console (F12) for detailed error information.</p>
                </div>,
                { duration: 15000 }
            );
        } finally {
            console.log('Upload process completed, setting isUploading to false');
            setIsUploading(false);
            // Reset file input
            if (event.target) {
                event.target.value = '';
            }
        }
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        toast.loading('Signing in...', { id: 'auth-toast' });

        try {
            if (!navigator.onLine) throw new Error('No internet connection');

            const { data, error } = await supabase.auth.signInWithPassword({
                email: adminLoginData.email,
                password: adminLoginData.password
            });

            if (error) throw error;
            if (!data?.session) throw new Error('Login succeeded but no session returned');

            // Upgrade profile to admin (fire and forget)
            supabase.from('user_profiles').upsert({
                id: data.session.user.id,
                email: data.session.user.email,
                role: 'admin',
                updated_at: new Date().toISOString()
            }, { onConflict: 'id' }).then(({ error: e }) => {
                if (e) console.warn('Profile upgrade warning:', e);
            });

            setCurrentUser({ email: data.session.user.email, role: 'admin' });
            setIsAuthenticated(true);
            toast.dismiss('auth-toast');
            toast.success('Logged in successfully!');

            // Load data for the active tab right away (no extra getSession needed)
            const tab = localStorage.getItem('adminActiveTab') || 'orders';
            if (tab === 'users') loadUsers(data.session);
            else if (tab === 'manage-products' || tab === 'products') loadProducts(data.session);
            else loadOrders(data.session);

        } catch (error) {
            toast.dismiss('auth-toast');
            if (error.message?.includes('Invalid login credentials')) {
                toast.error('Invalid email or password');
            } else {
                toast.error(`Login failed: ${error.message}`);
            }
        } finally {
            setIsLoggingIn(false);
        }
    };



    const loadUsers = async (existingSession = null) => {
        setDataLoading(prev => ({ ...prev, users: true }));
        try {
            // Reuse a passed-in session to avoid an extra network round-trip
            let session = existingSession;
            if (!session) {
                const { data } = await supabase.auth.getSession();
                session = data?.session;
            }
            if (!session) throw new Error('No active session. Please log in again.');

            const { data, error } = await supabase
                .from('user_profiles')
                .select('*');

            if (error) {
                console.error('Supabase query error:', error);
                console.error('Error details:', JSON.stringify(error, null, 2));
                // Check for RLS policy errors
                if (error.code === 'PGRST301' || error.message?.includes('permission denied') || error.message?.includes('row-level security') || error.message?.includes('recursion')) {
                    toast.error('RLS policy error. Please run fix_database_columns.sql in Supabase SQL Editor.');
                } else if (error.message?.includes('does not exist')) {
                    toast.error('Database schema mismatch. Please run fix_database_columns.sql in Supabase SQL Editor.');
                } else {
                    const errorMsg = error.message || error.details || 'Unknown error';
                    toast.error(`Failed to load users: ${errorMsg}`);
                }
                setUsers([]);
                return;
            }

            // Sort by email as fallback if created_at doesn't exist
            const sortedData = data ? [...data].sort((a, b) => {
                // Try to sort by created_at if available, otherwise by email
                if (a.created_at && b.created_at) {
                    return new Date(b.created_at) - new Date(a.created_at);
                }
                return (a.email || '').localeCompare(b.email || '');
            }) : [];

            console.log('Users loaded:', sortedData.length);
            setUsers(sortedData);
        } catch (error) {
            console.error('Error loading users:', error);
            toast.error(`Failed to load user profiles: ${error.message}`);
            setUsers([]);
        } finally {
            setDataLoading(prev => ({ ...prev, users: false }));
        }
    };

    const loadOrders = async (existingSession = null) => {
        setDataLoading(prev => ({ ...prev, orders: true }));
        try {
            let session = existingSession;
            if (!session) {
                const { data } = await supabase.auth.getSession();
                session = data?.session;
            }
            if (!session) throw new Error('No active session. Please log in again.');

            const { data, error } = await supabase
                .from('orders')
                .select('*, order_items(*, product:products(image, name))');

            if (error) {
                console.error('Supabase query error:', error);
                console.error('Error details:', JSON.stringify(error, null, 2));
                // Check for RLS policy errors
                if (error.code === 'PGRST301' || error.message?.includes('permission denied') || error.message?.includes('row-level security') || error.message?.includes('recursion')) {
                    toast.error('RLS policy error. Please run fix_database_columns.sql in Supabase SQL Editor.');
                } else {
                    const errorMsg = error.message || error.details || 'Unknown error';
                    toast.error(`Failed to load orders: ${errorMsg}`);
                }
                setOrders([]);
                return;
            }

            // Sort by created_at in JavaScript if available
            const sortedData = data ? [...data].sort((a, b) => {
                if (a.created_at && b.created_at) {
                    return new Date(b.created_at) - new Date(a.created_at);
                }
                return 0;
            }) : [];

            console.log('Orders loaded:', sortedData.length);
            setOrders(sortedData);
        } catch (error) {
            console.error('Error loading orders:', error);
            toast.error(`Failed to load orders: ${error.message}`);
            setOrders([]);
        } finally {
            setDataLoading(prev => ({ ...prev, orders: false }));
        }
    };

    const loadProducts = async (existingSession = null) => {
        try {
            setDataLoading(prev => ({ ...prev, products: true }));

            let session = existingSession;
            if (!session) {
                const { data } = await supabase.auth.getSession();
                session = data?.session;
            }
            if (!session) throw new Error('No active session. Please log in again.');

            const { data, error } = await supabase
                .from('products')
                .select('*');

            if (error) {
                console.error('Supabase query error:', error);
                console.error('Error details:', JSON.stringify(error, null, 2));
                // Check for RLS policy errors
                if (error.code === 'PGRST301' || error.message?.includes('permission denied') || error.message?.includes('row-level security') || error.message?.includes('recursion')) {
                    toast.error('RLS policy error. Please run fix_database_columns.sql in Supabase SQL Editor.');
                } else {
                    const errorMsg = error.message || error.details || 'Unknown error';
                    toast.error(`Database error: ${errorMsg}`);
                }
                setProducts([]);
                return;
            }

            // Sort by created_at in JavaScript if available
            const sortedData = data ? [...data].sort((a, b) => {
                if (a.created_at && b.created_at) {
                    return new Date(b.created_at) - new Date(a.created_at);
                }
                return (a.name || '').localeCompare(b.name || '');
            }) : [];

            console.log('Products loaded:', sortedData.length);
            setProducts(sortedData);

            if (sortedData.length === 0) {
                toast.info('No products found. Add some products first.');
            }

        } catch (error) {
            console.error('Load error:', error);
            toast.error(`Failed to connect to database: ${error.message}`);
            setProducts([]);
        } finally {
            setDataLoading(prev => ({ ...prev, products: false }));
        }
    };

    // Reload data when tabs change to ensure freshness
    useEffect(() => {
        if (isAuthenticated) {
            if (activeTab === 'users') loadUsers();
            if (activeTab === 'orders') loadOrders();
            if (activeTab === 'manage-products' || activeTab === 'products') loadProducts();
        }
    }, [activeTab, isAuthenticated]);

    const runEmergencyTest = async () => {
        toast.loading('Running database connection test...');
        try {
            // Test 1: Simple select
            const { data, error, status, statusText } = await supabase.from('products').select('*');
            console.log('EMERGENCY TEST RESULTS:', { data, error, status, statusText });

            if (error) {
                toast.error(`Low-level error: ${error.message} (Status: ${status})`);
            } else {
                toast.success(`Success! Database returned ${data?.length || 0} items.`);
                if (data?.length === 0) {
                    toast.info('Database is literally empty. Try adding a product first.');
                }
                setProducts(data || []);
            }
        } catch (err) {
            console.error('EMERGENCY FATAL:', err);
            toast.error(`Fatal connection error: ${err.message}`);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            // Ensure session is valid before updating
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                throw new Error('No active session. Please log in again.');
            }

            const { error } = await supabase
                .from('orders')
                .update({
                    status: newStatus,
                    updated_at: new Date().toISOString()
                })
                .eq('id', orderId);

            if (error) throw error;

            toast.success(`Order status updated to ${newStatus}`);
            loadOrders();
        } catch (error) {
            toast.error(`Failed to update order status: ${error.message}`);
        }
    };

    const handleLogout = async () => {
        try {
            setIsAuthenticated(false);
            setCurrentUser({ email: '', role: '' });
            localStorage.removeItem('adminActiveTab');
            // Flag for useAuthCallback so it does NOT redirect to /login on SIGNED_OUT
            sessionStorage.setItem('adminLogout', '1');
            await supabase.auth.signOut();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            window.location.href = '/';
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();

        try {
            if (!newItem.name.trim() || !newItem.price) {
                toast.error('Name and price are required');
                return;
            }

            // Image is optional - if not uploaded, use a placeholder
            const imageUrl = newItem.image.trim() || 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400';

            // Ensure session is valid before inserting
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                throw new Error('No active session. Please log in again.');
            }

            const productData = {
                name: newItem.name.trim(),
                description: newItem.description.trim(),
                price: parseFloat(newItem.price),
                category: newItem.category,
                image: imageUrl,
                stock: parseInt(newItem.stock) || 100,
                rating: 5.0,
                reviews: 0
            };

            const { error } = await supabase
                .from('products')
                .insert([productData]);

            if (error) throw error;
            toast.success(`Product "${newItem.name}" added successfully!`);
            setNewItem({ name: '', description: '', price: '', category: 'mothers-day', image: '', stock: 100 });
            await loadProducts();
            setActiveTab('manage-products');
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error(`Failed to add product: ${error.message}`);
        }
    };

    const handleUpdateProduct = async (productId, updatedData) => {
        try {
            if (!updatedData.name || !updatedData.price) {
                toast.error('Name and price are required');
                return;
            }

            // Ensure session is valid before updating
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                throw new Error('No active session. Please log in again.');
            }

            const cleanedData = {
                ...updatedData,
                price: parseFloat(updatedData.price),
                stock: parseInt(updatedData.stock) || 0
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
            const client = createFreshClient();
            const { error } = await client
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

    const handleDeleteOrder = async (orderId, customerName) => {
        if (!confirm(`Delete order from "${customerName}"? This cannot be undone.`)) return;
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('No active session.');
            // Delete child items first
            await supabase.from('order_items').delete().eq('order_id', orderId);
            const { error } = await supabase.from('orders').delete().eq('id', orderId);
            if (error) throw error;
            toast.success(`Order from "${customerName}" deleted.`);
            loadOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error(`Failed to delete order: ${error.message}`);
        }
    };

    // ── Monthly Report helpers ──────────────────────────────────────────────
    const getMonthlyStats = () => {
        const now = new Date();
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push({
                label: d.toLocaleString('default', { month: 'short', year: '2-digit' }),
                year: d.getFullYear(),
                month: d.getMonth(),
                revenue: 0,
                count: 0
            });
        }
        orders.forEach(o => {
            if (!o.created_at) return;
            const d = new Date(o.created_at);
            const m = months.find(m => m.year === d.getFullYear() && m.month === d.getMonth());
            if (m) {
                m.revenue += Number(o.total_amount) || 0;
                m.count += 1;
            }
        });
        return months;
    };

    const getTopProducts = () => {
        const map = {};
        orders.forEach(o => {
            (o.order_items || []).forEach(item => {
                const key = item.product_name || 'Unknown';
                if (!map[key]) map[key] = { name: key, qty: 0, revenue: 0 };
                map[key].qty += item.quantity || 0;
                map[key].revenue += (item.price * item.quantity) || 0;
            });
        });
        return Object.values(map).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
    };

    const getCurrentMonthStats = () => {
        const now = new Date();
        const thisMonth = orders.filter(o => {
            if (!o.created_at) return false;
            const d = new Date(o.created_at);
            return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
        });
        const revenue = thisMonth.reduce((s, o) => s + (Number(o.total_amount) || 0), 0);
        const delivered = thisMonth.filter(o => o.status === 'delivered').length;
        const pending = thisMonth.filter(o => o.status === 'pending').length;
        return { total: thisMonth.length, revenue, delivered, pending };
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center px-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
                    <p className="mt-4 text-gray-700 font-medium">Checking session...</p>
                    <p className="mt-1 text-gray-400 text-sm">This will only take a moment</p>
                </div>
            </div>
        );
    }

    // Show login prompt if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-8 h-8 text-gray-700" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Admin Portal</h1>
                            <p className="text-gray-500 text-center mb-8 text-sm">Please sign in to manage your flower shop</p>

                            <form onSubmit={handleAdminLogin} className="space-y-4" autoComplete="off">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                                    <input
                                        type="email"
                                        value={adminLoginData.email}
                                        onChange={(e) => setAdminLoginData({ ...adminLoginData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all"
                                        placeholder="admin@example.com"
                                        required
                                        autoComplete="email"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Authorized email: flowerlifestyle@gmail.com</p>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={adminLoginData.password}
                                            onChange={(e) => setAdminLoginData({ ...adminLoginData, password: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all pr-12"
                                            placeholder="••••••••"
                                            required
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoggingIn}
                                    className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl mt-4"
                                >
                                    {isLoggingIn ? 'Verifying...' : 'Login as Administrator'}
                                </Button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                                <button
                                    onClick={() => navigate('/')}
                                    className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                                >
                                    Return to Home Page
                                </button>
                            </div>
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
            <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Dashboard Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <div className="flex gap-2 flex-wrap">
                            <Button
                                onClick={async () => {
                                    const granted = await requestPermission();
                                    if (granted) {
                                        toast.success('Notifications enabled! You will receive alerts for new orders.');
                                    } else {
                                        toast.error('Notifications denied. Enable them in your browser settings.');
                                    }
                                }}
                                variant="outline"
                                className="border-green-200 text-green-600 hover:bg-green-50 text-xs sm:text-sm px-2 sm:px-4"
                            >
                                <Bell className="w-4 h-4 mr-1" />
                                Enable Notifications
                            </Button>
                            <Button
                                onClick={async () => {
                                    await testNotification();
                                    toast.success('Test notification sent!');
                                }}
                                variant="outline"
                                className="border-blue-200 text-blue-600 hover:bg-blue-50 text-xs sm:text-sm px-2 sm:px-4"
                            >
                                Test Notification
                            </Button>
                            <Button
                                onClick={() => {
                                    loadOrders();
                                    loadProducts();
                                    loadUsers();
                                    toast.success('Dashboard data refreshed');
                                }}
                                variant="outline"
                                className="border-gray-200 text-xs sm:text-sm px-2 sm:px-4"
                            >
                                Refresh Data
                            </Button>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="inline-flex items-center gap-1 px-3 sm:px-4 py-2 border border-pink-300 text-pink-600 hover:bg-pink-50 rounded-md text-xs sm:text-sm font-medium transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Diagnostic Bar */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-xs text-blue-800">
                        <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
                            <div className="flex items-center gap-1">
                                <span className="font-bold">Account:</span>
                                <span className="truncate max-w-[150px] sm:max-w-[200px]">{currentUser.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-bold">Role:</span> {currentUser.role?.toUpperCase()}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap sm:ml-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-blue-100">
                            <Button onClick={runEmergencyTest} size="xs" variant="ghost" className="h-6 text-[10px] bg-blue-100 font-bold hover:bg-blue-200">
                                DB Check
                            </Button>
                            <span className="px-2 py-0.5 bg-blue-100 rounded whitespace-nowrap font-medium">{products.length} Products</span>
                            <span className="px-2 py-0.5 bg-blue-100 rounded whitespace-nowrap font-medium">{orders.length} Orders</span>
                            <span className="px-2 py-0.5 bg-blue-100 rounded whitespace-nowrap font-medium">{users.length} Users</span>
                        </div>
                    </div>

                    {/* Tabs — 3-col on mobile, inline on desktop */}
                    <div className="grid grid-cols-3 gap-2 mb-6 sm:flex sm:flex-wrap">
                        <Button
                            onClick={() => setActiveTab('users')}
                            variant={activeTab === 'users' ? 'default' : 'outline'}
                            className={`whitespace-nowrap text-xs sm:text-sm flex-shrink-0 ${activeTab === 'users' ? 'bg-pink-600' : ''}`}
                        >
                            <User className="w-4 h-4 mr-1 sm:mr-2" />
                            Users
                        </Button>
                        <Button
                            onClick={() => setActiveTab('orders')}
                            variant={activeTab === 'orders' ? 'default' : 'outline'}
                            className={`whitespace-nowrap text-xs sm:text-sm flex-shrink-0 ${activeTab === 'orders' ? 'bg-pink-600' : ''}`}
                        >
                            <Package className="w-4 h-4 mr-1 sm:mr-2" />
                            Orders
                        </Button>
                        <Button
                            onClick={() => setActiveTab('report')}
                            variant={activeTab === 'report' ? 'default' : 'outline'}
                            className={`whitespace-nowrap text-xs sm:text-sm flex-shrink-0 ${activeTab === 'report' ? 'bg-pink-600' : ''}`}
                        >
                            <BarChart2 className="w-4 h-4 mr-1 sm:mr-2" />
                            Report
                        </Button>
                        <Button
                            onClick={() => setActiveTab('manage-products')}
                            variant={activeTab === 'manage-products' ? 'default' : 'outline'}
                            className={`whitespace-nowrap text-xs sm:text-sm flex-shrink-0 ${activeTab === 'manage-products' ? 'bg-pink-600' : ''}`}
                        >
                            <Package className="w-4 h-4 mr-1 sm:mr-2" />
                            Products
                        </Button>
                        <Button
                            onClick={() => setActiveTab('products')}
                            variant={activeTab === 'products' ? 'default' : 'outline'}
                            className={`whitespace-nowrap text-xs sm:text-sm flex-shrink-0 ${activeTab === 'products' ? 'bg-pink-600' : ''}`}
                        >
                            <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                            Add Product
                        </Button>
                    </div>

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 sm:p-8">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">User Profiles</h2>
                            {dataLoading.users ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                                </div>
                            ) : users.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">No users found or access denied by database</p>
                                    <Button onClick={loadUsers} variant="outline" size="sm">Reload Users</Button>
                                </div>
                            ) : (
                                <div className="overflow-x-auto -mx-4 sm:mx-0">
                                    <table className="w-full text-left min-w-[500px]">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="pb-3 px-4 sm:px-0 font-semibold text-gray-900 text-sm">Name</th>
                                                <th className="pb-3 px-2 font-semibold text-gray-900 text-sm">Email</th>
                                                <th className="pb-3 px-2 font-semibold text-gray-900 text-sm hidden sm:table-cell">Phone</th>
                                                <th className="pb-3 px-2 font-semibold text-gray-900 text-sm">Role</th>
                                                <th className="pb-3 px-2 font-semibold text-gray-900 text-sm hidden md:table-cell">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {users.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="py-3 px-4 sm:px-0 text-gray-800 text-sm">{user.full_name || 'N/A'}</td>
                                                    <td className="py-3 px-2 text-gray-600 text-sm max-w-[150px] truncate">{user.email}</td>
                                                    <td className="py-3 px-2 text-gray-600 text-sm hidden sm:table-cell">{user.phone || 'N/A'}</td>
                                                    <td className="py-3 px-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2 text-gray-500 text-xs hidden md:table-cell">{user.created_at ? formatDate(user.created_at) : 'N/A'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 sm:p-8">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Order Management</h2>

                            {dataLoading.orders ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">No orders found yet</p>
                                    <Button onClick={loadOrders} variant="outline" size="sm">Reload Orders</Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="border border-gray-200 rounded-xl p-3 sm:p-6 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3 sm:mb-4">
                                                <div>
                                                    <h3 className="font-bold text-base sm:text-lg">{order.customer_name}</h3>
                                                    <p className="text-sm text-gray-500">{order.customer_email}</p>
                                                    <p className="text-sm text-gray-500">{order.customer_phone}</p>
                                                </div>
                                                <div className="sm:text-right">
                                                    <p className="text-xl sm:text-2xl font-bold text-pink-600">
                                                        KSh {order.total_amount.toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{formatDate(order.created_at)}</p>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
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

                                            <div className="mb-3 sm:mb-4">
                                                <p className="text-sm font-medium text-gray-700 mb-2">Items Ordered:</p>
                                                <div className="space-y-2">
                                                    {order.order_items && order.order_items.map((item, idx) => {
                                                        const imgSrc = item.product?.image || item.image || null;
                                                        return (
                                                            <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
                                                                {imgSrc ? (
                                                                    <img
                                                                        src={imgSrc}
                                                                        alt={item.product_name}
                                                                        className="w-14 h-14 object-cover rounded-lg flex-shrink-0 border border-gray-200 shadow-sm"
                                                                        onError={(e) => { e.target.style.display = 'none'; }}
                                                                    />
                                                                ) : (
                                                                    <div className="w-14 h-14 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center flex-shrink-0">
                                                                        <Package className="w-6 h-6 text-pink-300" />
                                                                    </div>
                                                                )}
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-semibold text-gray-800 truncate">{item.product_name}</p>
                                                                    <p className="text-xs text-gray-500">Qty: {item.quantity} &times; KSh {Number(item.price).toLocaleString()}</p>
                                                                </div>
                                                                <p className="text-sm font-bold text-pink-600 flex-shrink-0">KSh {(item.price * item.quantity).toLocaleString()}</p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium">Status:</span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                                                        {order.status.toUpperCase()}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {order.status !== 'processing' && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-blue-600 border-blue-300 text-xs"
                                                            onClick={() => handleStatusChange(order.id, 'processing')}
                                                        >
                                                            Processing
                                                        </Button>
                                                    )}
                                                    {order.status !== 'delivered' && (
                                                        <Button
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700 text-xs"
                                                            onClick={() => handleStatusChange(order.id, 'delivered')}
                                                        >
                                                            <Check className="w-3 h-3 mr-1" />
                                                            Delivered
                                                        </Button>
                                                    )}
                                                    {order.status !== 'cancelled' && order.status !== 'delivered' && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-red-600 border-red-300 text-xs"
                                                            onClick={() => handleStatusChange(order.id, 'cancelled')}
                                                        >
                                                            <X className="w-3 h-3 mr-1" />
                                                            Cancel
                                                        </Button>
                                                    )}
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-red-700 border-red-400 bg-red-50 hover:bg-red-100 text-xs"
                                                        onClick={() => handleDeleteOrder(order.id, order.customer_name)}
                                                    >
                                                        <Trash2 className="w-3 h-3 mr-1" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Monthly Report Tab ─────────────────────────────────── */}
                    {activeTab === 'report' && (() => {
                        const monthlyStats = getMonthlyStats();
                        const topProducts = getTopProducts();
                        const current = getCurrentMonthStats();
                        const maxRevenue = Math.max(...monthlyStats.map(m => m.revenue), 1);
                        const now = new Date();
                        const currentMonthLabel = now.toLocaleString('default', { month: 'long', year: 'numeric' });
                        const totalRevenue = orders.reduce((s, o) => s + (Number(o.total_amount) || 0), 0);

                        return (
                            <div className="space-y-6">
                                {/* This Month Summary Cards */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { label: 'This Month Revenue', value: `KSh ${current.revenue.toLocaleString()}`, icon: TrendingUp, color: 'from-pink-500 to-rose-600' },
                                        { label: 'Orders This Month', value: current.total, icon: ShoppingBag, color: 'from-purple-500 to-indigo-600' },
                                        { label: 'Delivered', value: current.delivered, icon: Check, color: 'from-green-500 to-emerald-600' },
                                        { label: 'Pending', value: current.pending, icon: Clock, color: 'from-yellow-400 to-orange-500' },
                                    ].map(card => (
                                        <div key={card.label} className={`bg-gradient-to-br ${card.color} rounded-2xl p-4 text-white shadow-lg`}>
                                            <card.icon className="w-5 h-5 mb-2 opacity-80" />
                                            <p className="text-2xl font-bold">{card.value}</p>
                                            <p className="text-xs mt-1 opacity-80">{card.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Revenue Bar Chart — last 6 months */}
                                <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 sm:p-6">
                                    <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
                                        <BarChart2 className="w-5 h-5 text-pink-500" />
                                        Revenue — Last 6 Months
                                    </h2>
                                    <p className="text-xs text-gray-400 mb-4">All-time total: KSh {totalRevenue.toLocaleString()}</p>
                                    <div className="flex items-end gap-2 h-48">
                                        {monthlyStats.map((m, i) => {
                                            const pct = maxRevenue > 0 ? (m.revenue / maxRevenue) * 100 : 0;
                                            const isCurrentMonth = i === monthlyStats.length - 1;
                                            return (
                                                <div key={m.label} className="flex-1 flex flex-col items-center gap-1">
                                                    <span className="text-[10px] font-semibold text-gray-600 text-center">
                                                        KSh {m.revenue >= 1000 ? `${(m.revenue/1000).toFixed(1)}k` : m.revenue.toLocaleString()}
                                                    </span>
                                                    <div
                                                        className={`w-full rounded-t-lg transition-all duration-700 ${
                                                            isCurrentMonth
                                                                ? 'bg-gradient-to-t from-pink-600 to-pink-400'
                                                                : 'bg-gradient-to-t from-gray-300 to-gray-200'
                                                        }`}
                                                        style={{ height: `${Math.max(pct, 2)}%` }}
                                                    />
                                                    <span className={`text-[10px] font-medium ${isCurrentMonth ? 'text-pink-600' : 'text-gray-500'}`}>{m.label}</span>
                                                    <span className="text-[10px] text-gray-400">{m.count} orders</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Top Selling Products */}
                                <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 sm:p-6">
                                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <Package className="w-5 h-5 text-pink-500" />
                                        Top Products (All Time)
                                    </h2>
                                    {topProducts.length === 0 ? (
                                        <p className="text-gray-400 text-sm text-center py-6">No order item data available yet.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {topProducts.map((p, idx) => {
                                                const maxRev = topProducts[0].revenue || 1;
                                                const pct = (p.revenue / maxRev) * 100;
                                                return (
                                                    <div key={p.name}>
                                                        <div className="flex justify-between text-sm mb-1">
                                                            <span className="font-medium text-gray-800">
                                                                <span className="text-pink-500 font-bold mr-1">#{idx + 1}</span>{p.name}
                                                            </span>
                                                            <span className="text-gray-500">{p.qty} sold · KSh {p.revenue.toLocaleString()}</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-pink-500 to-rose-400 h-2 rounded-full transition-all duration-700"
                                                                style={{ width: `${pct}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Orders by Status */}
                                <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 sm:p-6">
                                    <h2 className="text-lg font-bold mb-4">Orders by Status (All Time)</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {['pending', 'processing', 'delivered', 'cancelled'].map(s => {
                                            const count = orders.filter(o => o.status === s).length;
                                            const colors = {
                                                pending: 'bg-yellow-50 border-yellow-200 text-yellow-700',
                                                processing: 'bg-blue-50 border-blue-200 text-blue-700',
                                                delivered: 'bg-green-50 border-green-200 text-green-700',
                                                cancelled: 'bg-red-50 border-red-200 text-red-700',
                                            };
                                            return (
                                                <div key={s} className={`border rounded-xl p-4 text-center ${colors[s]}`}>
                                                    <p className="text-2xl font-bold">{count}</p>
                                                    <p className="text-xs capitalize mt-1 font-medium">{s}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Manage Products Tab */}
                    {activeTab === 'manage-products' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 sm:p-8">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Manage Products</h2>

                            {products.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">No flowers available in the catalogue or access blocked</p>
                                    <Button onClick={loadProducts} variant="outline" size="sm">Reload Products</Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    {products.map((product) => (
                                        <div key={product.id} className={`border border-gray-200 rounded-xl p-4 transition-all ${editingProduct?.id === product.id ? 'md:col-span-2 shadow-lg bg-pink-50/30' : 'hover:shadow-lg'}`}>
                                            {editingProduct?.id === product.id ? (
                                                // Edit Mode
                                                <div className="space-y-3">
                                                    <input
                                                        type="text"
                                                        value={editingProduct.name}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
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
                                                        <option value="mothers-day">Mother's Day</option>
                                                        <option value="roses">Roses</option>
                                                        <option value="birthday">Birthday</option>
                                                        <option value="romance">Romance</option>
                                                        <option value="anniversary">Anniversary</option>
                                                        <option value="combos">Combos</option>
                                                        <option value="money-bouquet">Money Bouquet</option>
                                                    </select>
                                                    <input
                                                        type="number"
                                                        value={editingProduct.stock}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                                        placeholder="Stock"
                                                    />
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-medium text-gray-500">Image</label>
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleFileUpload(e, true)}
                                                                    className="hidden"
                                                                    id={`edit-image-upload-${product.id}`}
                                                                />
                                                                <label
                                                                    htmlFor={`edit-image-upload-${product.id}`}
                                                                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-xs hover:border-pink-500 hover:bg-pink-50 cursor-pointer"
                                                                >
                                                                    <Upload className="w-3 h-3 text-gray-400" />
                                                                    Change
                                                                </label>
                                                            </div>
                                                            <input
                                                                type="url"
                                                                value={editingProduct.image}
                                                                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                                                className="w-full px-3 py-2 border rounded-lg text-xs"
                                                                placeholder="Image URL"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
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
                                                                    image: editingProduct.image,
                                                                    stock: parseInt(editingProduct.stock) || 0
                                                                });
                                                            }}
                                                        >
                                                            Save
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="flex-1 bg-white"
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
                                                        <span className="text-xs text-gray-500">Stock: Unlimited</span>
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
                        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 sm:p-8">
                            <h2 className="text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-pink-500" />
                                Add New Product
                            </h2>

                            <form onSubmit={handleAddItem} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                        <select
                                            value={newItem.category}
                                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
                                        >
                                            <option value="mothers-day">Mother's Day</option>
                                            <option value="roses">Roses</option>
                                            <option value="birthday">Birthday</option>
                                            <option value="romance">Romance</option>
                                            <option value="anniversary">Anniversary</option>
                                            <option value="combos">Combos</option>
                                            <option value="money-bouquet">Money Bouquet</option>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                                    <div className="space-y-4">
                                        <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                                            <div className="flex-1">
                                                <label className="block text-xs text-gray-500 mb-1">Option 1: Upload Image</label>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            console.log('File input changed:', e.target.files);
                                                            handleFileUpload(e);
                                                        }}
                                                        className="hidden"
                                                        id="product-image-upload"
                                                        disabled={isUploading}
                                                    />
                                                    <label
                                                        htmlFor="product-image-upload"
                                                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-gray-300 hover:border-pink-500 hover:bg-pink-50 cursor-pointer transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        {isUploading ? (
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-600"></div>
                                                        ) : (
                                                            <Upload className="w-5 h-5 text-gray-400" />
                                                        )}
                                                        <span className="text-sm text-gray-600">{isUploading ? 'Uploading...' : 'Choose File'}</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center md:pt-4 text-gray-400 font-medium">OR</div>
                                            <div className="flex-1">
                                                <label className="block text-xs text-gray-500 mb-1">Option 2: Image URL</label>
                                                <input
                                                    type="url"
                                                    value={newItem.image}
                                                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
                                                    placeholder="https://images.unsplash.com/..."
                                                />
                                            </div>
                                        </div>

                                        {newItem.image && (
                                            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                                <img
                                                    src={newItem.image}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setNewItem({ ...newItem, image: '' })}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
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
