'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, getTranslation } from '@/lib/i18n';

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
  isInitialized: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>('en'); // Default to English
  const [t, setT] = useState<Translations>(getTranslation('en'));
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check URL parameter first (for PDF export)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    if (urlLang === 'cn' || urlLang === 'zh') {
      setLanguage('zh');
      setT(getTranslation('zh'));
      setIsInitialized(true);
      return;
    } else if (urlLang === 'en') {
      setLanguage('en');
      setT(getTranslation('en'));
      setIsInitialized(true);
      return;
    }

    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguage(savedLanguage);
      setT(getTranslation(savedLanguage));
    }
    setIsInitialized(true);
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setT(getTranslation(newLanguage));
    localStorage.setItem('language', newLanguage);
  };

  const value: I18nContextType = {
    language,
    setLanguage: handleSetLanguage,
    t,
    isInitialized,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}