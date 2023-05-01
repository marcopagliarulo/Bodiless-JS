import React from 'react';
import type { AppProps } from 'next/app';
import '../css/style.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
