import "../styles/globals.css";
import { MDXProvider } from "@mdx-js/react";
import Test from "../components/test";

const components = { Test };

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
