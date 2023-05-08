import React from 'react';
import type { AppProps } from 'next/app';
import '../css/style.css';
// Add DM Sans font from --vital-next--
import '--vital-next--/lib/dm-sans-font.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
