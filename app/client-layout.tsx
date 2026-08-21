"use client";
import { RootProvider } from 'fumadocs-ui/provider';
import { useState, useEffect, ReactNode } from 'react';

import Footer from '../components/Footer/page';
import Header from '../components/Header/page';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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
