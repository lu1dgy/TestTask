import { ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import './globals.css';

interface RootLayoutProps extends AppProps {
  children: ReactNode;
}

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Header />
        <main className='App'>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
