'use client';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import './globals.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';

interface RootLayoutProps extends AppProps {
  children: ReactNode;
}

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          <main className='App'>{children}</main>
        </Provider>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
