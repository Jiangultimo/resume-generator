'use client';

import React from 'react';
import { useI18n } from '@/context/i18n';
import { Language } from '@/lib/i18n';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Globe, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useI18n();

  const handleLanguageChange = (value: string) => {
    if (value) {
      setLanguage(value as Language);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <ToggleGroup
        type="single"
        value={language}
        onValueChange={handleLanguageChange}
        className={cn(
          'bg-white/20 backdrop-blur-md border border-white/30',
          'rounded-full p-1 shadow-lg shadow-black/10',
          'min-w-[140px] h-[44px]',
          'dark:bg-gray-800/40 dark:border-gray-600/30'
        )}
      >
        <ToggleGroupItem
          value="en"
          aria-label="Switch to English"
          className={cn(
            'flex items-center justify-center gap-1.5',
            'flex-1 h-full rounded-full',
            'text-sm font-medium transition-all duration-300',
            'data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-500 data-[state=on]:to-purple-600',
            'data-[state=on]:text-white data-[state=on]:shadow-md data-[state=on]:shadow-blue-500/25',
            'data-[state=off]:text-gray-600 dark:data-[state=off]:text-gray-300',
            'hover:scale-105 data-[state=on]:scale-102',
            'hover:data-[state=off]:text-gray-800 dark:hover:data-[state=off]:text-white'
          )}
        >
          <Globe className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-semibold tracking-wide">EN</span>
        </ToggleGroupItem>

        <ToggleGroupItem
          value="zh"
          aria-label="切换到中文"
          className={cn(
            'flex items-center justify-center gap-1.5',
            'flex-1 h-full rounded-full',
            'text-sm font-medium transition-all duration-300',
            'data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-500 data-[state=on]:to-purple-600',
            'data-[state=on]:text-white data-[state=on]:shadow-md data-[state=on]:shadow-blue-500/25',
            'data-[state=off]:text-gray-600 dark:data-[state=off]:text-gray-300',
            'hover:scale-105 data-[state=on]:scale-102',
            'hover:data-[state=off]:text-gray-800 dark:hover:data-[state=off]:text-white'
          )}
        >
          <Languages className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-semibold tracking-wide">中文</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
