
import React, { createContext, useContext, useState, useEffect } from 'react';

type CurrencyType = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'NGN';

interface CurrencyContextType {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  formatPrice: (price: number) => string;
  currencySymbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = 'marketChat_currency';

const currencySymbols: Record<CurrencyType, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  NGN: '₦'
};

// Mock exchange rates (in a real app, these would come from an API)
const exchangeRates: Record<CurrencyType, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110,
  CNY: 6.5,
  NGN: 775
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyType>('USD');

  // Load saved currency preference
  useEffect(() => {
    const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (savedCurrency && Object.keys(currencySymbols).includes(savedCurrency)) {
      setCurrency(savedCurrency as CurrencyType);
    }
  }, []);

  // Save currency preference
  const handleCurrencyChange = (newCurrency: CurrencyType) => {
    setCurrency(newCurrency);
    localStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency);
  };

  // Format price based on current currency
  const formatPrice = (priceInUSD: number): string => {
    const convertedPrice = priceInUSD * exchangeRates[currency];
    
    // Format based on currency
    if (currency === 'JPY' || currency === 'CNY') {
      return `${currencySymbols[currency]}${Math.round(convertedPrice)}`;
    } else {
      return `${currencySymbols[currency]}${convertedPrice.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currency, 
        setCurrency: handleCurrencyChange, 
        formatPrice,
        currencySymbol: currencySymbols[currency]
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
