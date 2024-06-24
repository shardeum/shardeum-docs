import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import Footer from '../components/Footer/page';
import Header from '../components/Header/page';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/img/favicon.ico" />
      </head>
      <body>
        <RootProvider>
          <Header />
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
