class NotificationService {
  constructor() {
    this.permission = null;
    this.isSupported = 'Notification' in window;
  }

  async requestPermission() {
    if (!this.isSupported) {
      console.log('Notifications not supported in this browser');
      return false;
    }

    if (this.permission === 'granted') {
      return true;
    }

    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  async showNotification(title, options = {}) {
    if (!this.isSupported) {
      console.log('Notifications not supported');
      return false;
    }

    const hasPermission = await this.requestPermission();
    if (!hasPermission) {
      console.log('Notification permission denied');
      return false;
    }

    try {
      const notification = new Notification(title, {
        icon: '/WhatsApp_Image_2025-12-21_at_6.52.59_PM__1_-removebg-preview.png',
        badge: '/WhatsApp_Image_2025-12-21_at_6.52.59_PM__1_-removebg-preview.png',
        vibrate: [200, 100, 200],
        requireInteraction: false,
        ...options
      });

      // Auto-close notification after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      return true;
    } catch (error) {
      console.error('Error showing notification:', error);
      return false;
    }
  }

  async showNewOrderNotification(order) {
    const title = '🌸 New Flower Order Received!';
    const options = {
      body: `Order #${order.id}: ${order.customer_name} ordered ${order.items?.length || 0} items - KES ${order.total || 0}`,
      tag: `order-${order.id}`,
      renotify: true
    };

    return await this.showNotification(title, options);
  }

  async showDeliveryNotification(order) {
    const title = '🚚 New Delivery Scheduled!';
    const options = {
      body: `Order #${order.id} scheduled for delivery on ${order.delivery_date} - ${order.delivery_address}`,
      tag: `delivery-${order.id}`,
      renotify: true
    };

    return await this.showNotification(title, options);
  }

  async showPaymentNotification(order) {
    const title = '💰 Payment Received!';
    const options = {
      body: `Order #${order.id} payment confirmed - KES ${order.total || 0}`,
      tag: `payment-${order.id}`,
      renotify: true
    };

    return await this.showNotification(title, options);
  }
}

export default new NotificationService();
