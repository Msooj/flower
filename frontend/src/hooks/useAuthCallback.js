import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

/**
 * Hook to handle OAuth authentication callbacks and ensure user profiles are created
 */
export const useAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Handle OAuth callback
        const handleAuthCallback = async () => {
            try {
                // Check for OAuth callback hash in URL
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('Auth callback error:', error);
                    toast.error('Authentication failed. Please try again.');
                    return;
                }

                if (session?.user) {
                    // Check if user profile exists
                    const { data: profile, error: profileError } = await supabase
                        .from('user_profiles')
                        .select('id, role')
                        .eq('id', session.user.id)
                        .single();

                    // Create profile if it doesn't exist
                    if (profileError && profileError.code === 'PGRST116') {
                        console.log('Creating user profile for OAuth user...');
                        const { error: insertError } = await supabase
                            .from('user_profiles')
                            .insert([{
                                id: session.user.id,
                                email: session.user.email,
                                full_name: session.user.user_metadata?.full_name ||
                                    session.user.user_metadata?.name ||
                                    session.user.email?.split('@')[0] || '',
                                phone: session.user.user_metadata?.phone || '',
                                role: 'customer'
                            }]);

                        if (insertError) {
                            console.error('Failed to create user profile:', insertError);
                            // Continue anyway as the auth was successful
                        } else {
                            console.log('User profile created successfully');
                        }
                    }

                    /*
                    // Admin check removed - Separation enforced at Login Page level
                    if (profile?.role === 'admin') {
                        await supabase.auth.signOut();
                        toast.error('Admin accounts must use the Admin Portal at /admin');
                        navigate('/admin');
                        return;
                    }
                    */
                }
            } catch (err) {
                console.error('Unexpected auth callback error:', err);
            }
        };

        handleAuthCallback();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event);

            if (event === 'SIGNED_IN' && session?.user) {
                // Ensure profile exists
                const { data: profile, error: profileError } = await supabase
                    .from('user_profiles')
                    .select('id, role')
                    .eq('id', session.user.id)
                    .single();

                if (profileError && profileError.code === 'PGRST116') {
                    // Create profile for new OAuth user
                    await supabase
                        .from('user_profiles')
                        .insert([{
                            id: session.user.id,
                            email: session.user.email,
                            full_name: session.user.user_metadata?.full_name ||
                                session.user.user_metadata?.name ||
                                session.user.email?.split('@')[0] || '',
                            phone: session.user.user_metadata?.phone || '',
                            role: 'customer'
                        }]);
                }

                // Admin check removed to prevent session killing loop.
                // Access control is handled at the page level (AdminPage vs LoginPage).

                if (event === 'SIGNED_IN') {
                    // Only show welcome if not already on the page? 
                    // Suppressing toast to avoid duplicates if LoginPage handles it.
                    // toast.success('Welcome! You have been signed in successfully.');
                }
            }

            if (event === 'SIGNED_OUT') {
                navigate('/login');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);
};
