"use client";
import { RootProvider } from 'fumadocs-ui/provider';
import { useState, useEffect, ReactNode } from 'react';

import Footer from '../components/Footer/page';
import Header from '../components/Header/page';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem('theme');
    } catch {
      // localStorage unavailable (private mode / blocked storage) — fall back to OS preference
    }
    if (stored === 'dark' || stored === 'light') {
      setIsDarkMode(stored === 'dark');
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', isDarkMode);
    try {
      window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore persistence failures
    }
  }, [isDarkMode, mounted]);

  return (
    <div className={!mounted ? 'invisible' : ''}>
      <RootProvider
        theme={{
          enabled: true,
        }}
      >
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main>{children}</main>
        <Footer isDarkMode={isDarkMode} />
      </RootProvider>
    </div>
  );
}
