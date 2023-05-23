'use client';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Footer from '@/components/Footer';
import store from '@/redux/store';

import './globals.css';

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
