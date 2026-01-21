'use client';

import { useI18n } from '@/context/i18n';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'zh' : 'en';
    const newLangParam = newLang === 'zh' ? 'cn' : 'en';

    // 设置 localStorage（用于 i18n context）
    setLanguage(newLang);

    // 设置 cookie（用于服务端渲染）
    document.cookie = `language=${newLang}; path=/; max-age=31536000`; // 1年

    // 更新 URL 参数并刷新（触发服务端重新渲染）
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', newLangParam);
    router.push(`/?${params.toString()}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label={language === 'en' ? '切换到中文' : 'Switch to English'}
      className={cn(
        'flex items-center justify-center',
        'w-8 h-8 rounded-full',
        'bg-white/20 backdrop-blur-md border border-white/30',
        'shadow-lg shadow-black/10',
        'text-gray-600 dark:text-gray-300',
        'hover:scale-110 hover:text-gray-800 dark:hover:text-white',
        'transition-all duration-300',
        'dark:bg-gray-800/40 dark:border-gray-600/30',
        className
      )}
    >
      <Languages className="w-4 h-4" />
    </button>
  );
}
