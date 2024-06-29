import "../styles/globals.css";
import ErrorBoundary from "../components/ErrorBoundary";

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
