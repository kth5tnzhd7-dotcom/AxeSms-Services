// src/context/SiteConfigContext.js
// =====================================================
// All site-wide settings that admin can change
// =====================================================
import React, { createContext, useContext, useState } from 'react';

const defaultConfig = {
  // Social & Support Links
  links: {
    telegram: 'https://t.me/axesms',
    whatsapp: 'https://wa.me/919876543210',
    youtube: 'https://youtube.com/@axesms',
    twitter: 'https://twitter.com/axesms',
    instagram: 'https://instagram.com/axesms',
    facebook: 'https://facebook.com/axesms',
    supportEmail: 'support@axesms.services',
    supportPhone: '+91 98765 43210',
  },
  // Pricing
  pricing: {
    smsRate: '₹0.10',
    whatsappRate: '₹0.35',
    emailRate: '₹0.02',
    starterMonthly: 499,
    starterYearly: 399,
    growthMonthly: 1499,
    growthYearly: 1199,
    proMonthly: 3999,
    proYearly: 3199,
  },
  // Announcements
  announcement: {
    enabled: true,
    text: '🎉 New: WhatsApp Business API now live! Get 1000 free messages on signup.',
    link: '/pricing',
    linkText: 'Learn More',
  },
  // Site Info
  site: {
    name: 'AxeSMS',
    tagline: "India's Lowest Price Messaging Platform",
    freeCredits: '₹50',
    supportHours: 'Mon–Sat, 9 AM – 8 PM IST',
  },
  // Feature flags
  features: {
    virtualNumbers: true,
    whatsapp: true,
    email: true,
    sms: true,
    apiDocs: true,
    blog: false,
  },
  // Stats shown on homepage
  stats: {
    messagesSent: '500M+',
    deliveryRate: '99.9%',
    happyClients: '10,000+',
    uptime: '99.99%',
  },
};

const SiteConfigContext = createContext(null);

export function SiteConfigProvider({ children }) {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('axesms_config');
      return saved ? { ...defaultConfig, ...JSON.parse(saved) } : defaultConfig;
    } catch {
      return defaultConfig;
    }
  });

  const updateConfig = (path, value) => {
    setConfig(prev => {
      const newConfig = deepSet({ ...prev }, path, value);
      localStorage.setItem('axesms_config', JSON.stringify(newConfig));
      return newConfig;
    });
  };

  const updateSection = (section, values) => {
    setConfig(prev => {
      const newConfig = { ...prev, [section]: { ...prev[section], ...values } };
      localStorage.setItem('axesms_config', JSON.stringify(newConfig));
      return newConfig;
    });
  };

  const resetConfig = () => {
    localStorage.removeItem('axesms_config');
    setConfig(defaultConfig);
  };

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, updateSection, resetConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}

function deepSet(obj, path, value) {
  const keys = path.split('.');
  const last = keys.pop();
  let curr = obj;
  for (const key of keys) {
    curr[key] = { ...curr[key] };
    curr = curr[key];
  }
  curr[last] = value;
  return obj;
}
