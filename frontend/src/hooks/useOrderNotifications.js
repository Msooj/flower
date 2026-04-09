import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import notificationService from '../services/notificationService';

const useOrderNotifications = (isAdmin = false) => {
  const [lastNotificationId, setLastNotificationId] = useState(null);

  useEffect(() => {
    if (!isAdmin) return;

    // Request notification permission on component mount
    notificationService.requestPermission();

    // Listen for new orders
    const ordersSubscription = supabase
      .channel('new_orders')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'orders',
          filter: 'status=eq.pending'
        },
        (payload) => {
          handleNewOrder(payload.new);
        }
      )
      .subscribe();

    // Listen for order status changes
    const statusSubscription = supabase
      .channel('order_status')
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          handleOrderStatusChange(payload.new);
        }
      )
      .subscribe();

    return () => {
      ordersSubscription.unsubscribe();
      statusSubscription.unsubscribe();
    };
  }, [isAdmin]);

  const handleNewOrder = async (order) => {
    // Avoid duplicate notifications
    if (lastNotificationId === order.id) return;
    setLastNotificationId(order.id);

    try {
      await notificationService.showNewOrderNotification(order);
      
      // Also show browser alert as backup
      if (order.customer_name) {
        alert(`🌸 New Order Received!\n\nCustomer: ${order.customer_name}\nOrder ID: ${order.id}\nTotal: KES ${order.total || 0}`);
      }
    } catch (error) {
      console.error('Error showing order notification:', error);
    }
  };

  const handleOrderStatusChange = async (order) => {
    if (lastNotificationId === order.id) return;
    setLastNotificationId(order.id);

    try {
      switch (order.status) {
        case 'paid':
          await notificationService.showPaymentNotification(order);
          break;
        case 'confirmed':
        case 'out_for_delivery':
          await notificationService.showDeliveryNotification(order);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error showing status notification:', error);
    }
  };

  return {
    requestPermission: () => notificationService.requestPermission(),
    testNotification: async () => {
      await notificationService.showNotification('🧪 Test Notification', {
        body: 'This is a test notification from Flower Lifestyle',
        tag: 'test'
      });
    }
  };
};

export default useOrderNotifications;
