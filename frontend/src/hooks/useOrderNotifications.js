import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import notificationService from '../services/notificationService';

const useOrderNotifications = (isAdmin = false) => {
  // Use separate refs per event type so a fast insert+update doesn't
  // silently drop the status-change notification (Bug 13 fix)
  const lastNewOrderId = useRef(null);
  const lastStatusChangeId = useRef(null);

  useEffect(() => {
    if (!isAdmin) return;

    // Request notification permission on component mount
    notificationService.requestPermission();

    let ordersSubscription;
    let statusSubscription;

    const subscribe = () => {
      // Listen for new orders
      ordersSubscription = supabase
        .channel('new_orders')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'orders',
          },
          (payload) => {
            handleNewOrder(payload.new);
          }
        )
        .subscribe((status, err) => {
          if (err) console.warn('Order notifications channel error — will stay disconnected:', err.message);
        });

      // Listen for order status changes
      statusSubscription = supabase
        .channel('order_status')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
          },
          (payload) => {
            handleOrderStatusChange(payload.new);
          }
        )
        .subscribe();
    };

    subscribe();

    return () => {
      ordersSubscription?.unsubscribe();
      statusSubscription?.unsubscribe();
    };
  }, [isAdmin]);

  const handleNewOrder = async (order) => {
    // Avoid duplicate notifications for the same order
    if (lastNewOrderId.current === order.id) return;
    lastNewOrderId.current = order.id;

    try {
      await notificationService.showNewOrderNotification(order);
      // NOTE: Do NOT use alert() here — it blocks the entire admin UI (Bug 3 fix)
    } catch (error) {
      console.error('Error showing order notification:', error);
    }
  };

  const handleOrderStatusChange = async (order) => {
    // Use a separate tracking ref so status updates aren't dropped
    // when they fire immediately after an INSERT on the same order (Bug 13 fix)
    if (lastStatusChangeId.current === `${order.id}-${order.status}`) return;
    lastStatusChangeId.current = `${order.id}-${order.status}`;

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
        tag: 'test',
      });
    },
  };
};

export default useOrderNotifications;
