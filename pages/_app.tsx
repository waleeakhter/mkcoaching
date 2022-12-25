import "primereact/resources/themes/luna-pink/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import '../styles/globals.scss'
import PrimeReact from 'primereact/api';
import type { AppProps } from 'next/app'
PrimeReact.ripple = true;
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
