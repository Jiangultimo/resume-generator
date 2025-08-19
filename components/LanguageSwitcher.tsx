'use client';

import React from 'react';
import { useI18n } from '@/context/i18n';
import { Language } from '@/lib/i18n';
import styles from '@/styles/LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useI18n();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className={`${styles.languageSwitcher} ${className}`}>
      <div className={styles.switcherContainer}>
        <div 
          className={`${styles.activeIndicator} ${
            language === 'en' ? styles.activeLeft : styles.activeRight
          }`}
        />
        <button
          onClick={() => handleLanguageChange('en')}
          className={`${styles.switcherButton} ${
            language === 'en' ? styles.active : ''
          }`}
        >
          <span className={styles.buttonIcon}>🌐</span>
          <span className={styles.buttonText}>EN</span>
        </button>
        <button
          onClick={() => handleLanguageChange('zh')}
          className={`${styles.switcherButton} ${
            language === 'zh' ? styles.active : ''
          }`}
        >
          <span className={styles.buttonIcon}>🇨🇳</span>
          <span className={styles.buttonText}>中文</span>
        </button>
      </div>
    </div>
  );
}