import "primereact/resources/themes/luna-pink/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import '../styles/globals.scss'
import PrimeReact from 'primereact/api';
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
PrimeReact.ripple = true;
function MyApp({ Component, pageProps }: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>

  )
}

export default MyApp