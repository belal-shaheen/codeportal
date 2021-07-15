import "../styles/globals.css";
import { MDXProvider } from "@mdx-js/react";
import Test from "../components/test";
import { RecoilRoot, useRecoilValue } from "recoil";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";

const components = { Test };

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <RecoilRoot>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </RecoilRoot>
    </MDXProvider>
  );
}

export default MyApp;
