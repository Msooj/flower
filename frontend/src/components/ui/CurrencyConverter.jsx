import React, { useState, useContext, createContext } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { DollarSign, PoundSterling, Euro, CircleDollarSign } from 'lucide-react';

// Exchange rates relative to KSh (Kenyan Shilling)
const EXCHANGE_RATES = {
  KES: 1,
  USD: 0.0076,
  EUR: 0.0070,
  GBP: 0.0060,
  JPY: 1.13
};

const CURRENCY_SYMBOLS = {
  KES: 'KSh',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥'
};

const CURRENCY_NAMES = {
  KES: 'Kenyan Shilling',
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen'
};

const CurrencyContext = createContext({
  currency: 'KES',
  setCurrency: () => {},
  convertPrice: (price) => price,
  formatPrice: (price) => `KSh ${price.toLocaleString()}`
});

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('preferredCurrency');
    return saved || 'KES';
  });

  const convertPrice = (priceInKES) => {
    return priceInKES * EXCHANGE_RATES[currency];
  };

  const formatPrice = (priceInKES) => {
    const convertedPrice = convertPrice(priceInKES);
    const symbol = CURRENCY_SYMBOLS[currency];
    
    if (currency === 'JPY') {
      return `${symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
    
    return `${symbol}${convertedPrice.toFixed(2).toLocaleString()}`;
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('preferredCurrency', newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleCurrencyChange, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="KES">
          <div className="flex items-center gap-2">
            <span className="font-medium">KES</span>
            <span className="text-gray-500 text-sm">KSh</span>
          </div>
        </SelectItem>
        <SelectItem value="USD">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span className="font-medium">USD</span>
            <span className="text-gray-500 text-sm">$</span>
          </div>
        </SelectItem>
        <SelectItem value="EUR">
          <div className="flex items-center gap-2">
            <Euro className="w-4 h-4" />
            <span className="font-medium">EUR</span>
            <span className="text-gray-500 text-sm">€</span>
          </div>
        </SelectItem>
        <SelectItem value="GBP">
          <div className="flex items-center gap-2">
            <PoundSterling className="w-4 h-4" />
            <span className="font-medium">GBP</span>
            <span className="text-gray-500 text-sm">£</span>
          </div>
        </SelectItem>
        <SelectItem value="JPY">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="w-4 h-4" />
            <span className="font-medium">JPY</span>
            <span className="text-gray-500 text-sm">¥</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CurrencyProvider;
