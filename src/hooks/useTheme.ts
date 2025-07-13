'use client';

import { useState, useEffect, useCallback } from 'react';
import { ThemeMode } from '@/types';

interface UseThemeReturn {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: 'light' | 'dark';
  systemTheme: 'light' | 'dark';
  mounted: boolean;
}

export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((newTheme: ThemeMode) => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;
    const resolvedTheme = newTheme === 'system' ? getSystemTheme() : newTheme;
    
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    
    // Update theme-color meta tag
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#059669' : '#10b981'
      );
    }

    // Update CSS custom properties for theme
    root.style.setProperty(
      '--color-primary',
      resolvedTheme === 'dark' ? '#059669' : '#10b981'
    );
    root.style.setProperty(
      '--color-background',
      resolvedTheme === 'dark' ? '#1f2937' : '#ffffff'
    );
    root.style.setProperty(
      '--color-foreground',
      resolvedTheme === 'dark' ? '#f9fafb' : '#1f2937'
    );
  }, [getSystemTheme]);

  // Set theme and persist to localStorage
  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
    applyTheme(newTheme);
  }, [applyTheme]);

  // Get resolved theme (actual theme being used)
  const getResolvedTheme = useCallback((): 'light' | 'dark' => {
    return theme === 'system' ? systemTheme : theme;
  }, [theme, systemTheme]);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    
    // Get initial system theme
    const initialSystemTheme = getSystemTheme();
    setSystemTheme(initialSystemTheme);

    // Get saved theme or use system default
    const savedTheme = (typeof window !== 'undefined' ? localStorage.getItem('theme') : null) as ThemeMode || 'system';
    setThemeState(savedTheme);
    applyTheme(savedTheme);
  }, [getSystemTheme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
      
      // Re-apply current theme to reflect system change
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  // Handle storage changes (sync across tabs)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        const newTheme = e.newValue as ThemeMode;
        setThemeState(newTheme);
        applyTheme(newTheme);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [applyTheme]);

  return {
    theme,
    setTheme,
    resolvedTheme: getResolvedTheme(),
    systemTheme,
    mounted
  };
}