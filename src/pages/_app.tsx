import '../styles/globals.css'
// pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
