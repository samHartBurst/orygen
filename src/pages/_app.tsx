import { FunctionComponent } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { EuiErrorBoundary } from '@elastic/eui';
import { UserProvider } from '@auth0/nextjs-auth0';

import Chrome from '../components/chrome';

import '@elastic/eui/dist/eui_theme_light.css';
import '../styles/app.scss';
import '../styles/globals.css'; //TODO: To be replaced with with app.scss

// //DO NOT CHECK THIS IN
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Orygen - Admin</title>
      </Head>
      <Chrome>
        <EuiErrorBoundary>
          <Component {...pageProps} />
        </EuiErrorBoundary>
      </Chrome>
    </>
  );
};

export default App;
