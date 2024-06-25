"use client";import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import { useState, useEffect, ReactNode } from 'react';

import Footer from '../components/Footer/page';
import Header from '../components/Header/page';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
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
    <html lang="en" className={`${inter.className} ${isDarkMode ? 'dark' : ''}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/img/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N6NTB5C');
            `,
          }}
        />
      </head>
      <body className={!mounted ? 'invisible' : ''}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N6NTB5C"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <RootProvider
          theme={{
            enabled: true,
          }}
        >
          <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <main>{children}</main>
          <Footer isDarkMode={isDarkMode} />
        </RootProvider>
      </body>
    </html>
  );
}
