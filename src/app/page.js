import Head from "next/head";
import HomePage_Component from "./components/HomePage-Component";
import Script from "next/script";

export default function Home() {
    return (
    <>
      <Head >
  </Head>
  <Script type="text/javascript" src="/static/flow.js" />
    <HomePage_Component/>   
    </>
    );
}
