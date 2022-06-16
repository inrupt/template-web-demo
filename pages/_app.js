import { useEffect } from 'react';

import { SessionProvider } from '@inrupt/solid-ui-react';
import { Container } from 'reactstrap';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <SessionProvider>
      <Navbar />

      <Container className="flex-shrink-0">
        <Component {...pageProps} />
      </Container>

      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
