import "../styles/globals.css";
import { MDXProvider } from "@mdx-js/react";
import Test from "../components/test";
import { RecoilRoot, useRecoilValue } from "recoil";

const components = { Test };

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </MDXProvider>
  );
}

export default MyApp;
