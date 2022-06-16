import dynamic from 'next/dynamic';

import { SessionProvider } from '@inrupt/solid-ui-react';
import { Container } from 'reactstrap';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

import '../styles/globals.scss';

// Dynamically load bootstrap js clientside
dynamic(
  () => import('bootstrap/dist/js/bootstrap'),
  { ssr: false },
);

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider sessionId="inrupt-demo" restorePreviousSession>
      <Navbar />

      <Container className="flex-shrink-0">
        <Component {...pageProps} />
      </Container>

      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
