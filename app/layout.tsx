import './global.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import ClientLayout from './client-layout';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shardeum | EVM L1 for Real-World Asset Tokenization',
  description:
    'Shardeum developer docs for EVM smart contracts, Solidity, JSON-RPC, network setup, testnet, nodes and Layer 1 architecture.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
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
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N6NTB5C"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
