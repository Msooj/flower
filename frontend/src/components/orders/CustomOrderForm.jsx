import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const CustomOrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    occasion: '',
    flowerTypes: '',
    colorPreferences: '',
    budget: '',
    deliveryDate: '',
    deliveryAddress: '',
    specialInstructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the message for WhatsApp
    const message = `*New Custom Order Request*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Occasion:* ${formData.occasion}%0A` +
      `*Preferred Flower Types:* ${formData.flowerTypes || 'Not specified'}%0A` +
      `*Color Preferences:* ${formData.colorPreferences || 'Not specified'}%0A` +
      `*Budget:* KSh ${formData.budget || 'Not specified'}%0A` +
      `*Preferred Delivery Date:* ${formData.deliveryDate || 'Not specified'}%0A` +
      `*Delivery Address:* ${formData.deliveryAddress || 'Not specified'}%0A` +
      `*Special Instructions:* ${formData.specialInstructions || 'None'}`;

    // Open WhatsApp with the pre-filled message
    const phoneNumber = '+254742370307';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

    // Show success message
    toast.success('Redirecting to WhatsApp to complete your order...');

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      occasion: '',
      flowerTypes: '',
      colorPreferences: '',
      budget: '',
      deliveryDate: '',
      deliveryAddress: '',
      specialInstructions: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Custom Flower Arrangement Request</h2>
      <p className="text-gray-600 mb-8">
        Can't find exactly what you're looking for? Let us create a custom arrangement just for you!
        Fill out the form below with your preferences and we'll get back to you with a quote.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
              placeholder="+254 7XX XXX XXX"
            />
          </div>

          <div>
            <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">Occasion*</label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
            >
              <option value="">Select an occasion</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Wedding">Wedding</option>
              <option value="Valentine's Day">Valentine's Day</option>
              <option value="Mother's Day">Mother's Day</option>
              <option value="Graduation">Graduation</option>
              <option value="Sympathy">Sympathy</option>
              <option value="Just Because">Just Because</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="flowerTypes" className="block text-sm font-medium text-gray-700 mb-1">Preferred Flower Types</label>
            <input
              type="text"
              id="flowerTypes"
              name="flowerTypes"
              value={formData.flowerTypes}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
              placeholder="e.g., Roses, Lilies, Sunflowers"
            />
          </div>

          <div>
            <label htmlFor="colorPreferences" className="block text-sm font-medium text-gray-700 mb-1">Color Preferences</label>
            <input
              type="text"
              id="colorPreferences"
              name="colorPreferences"
              value={formData.colorPreferences}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
              placeholder="e.g., Pink and white"
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget (KSh)</label>
            <input
              type="text"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
              placeholder="e.g., 5000 - 10000"
            />
          </div>

          <div>
            <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">Delivery Address*</label>
            <input
              type="text"
              id="deliveryAddress"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
              placeholder="Enter complete delivery address"
            />
          </div>
        </div>

        <div>
          <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 outline-none"
            placeholder="Any specific details, allergies, or special requests..."
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-6 text-lg rounded-xl"
          >
            Submit Custom Order Request
          </Button>
          <p className="text-sm text-gray-500 mt-3 text-center">
            We'll review your request and get back to you within 24 hours with a quote and design options.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default CustomOrderForm;
