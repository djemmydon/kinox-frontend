import Layout from "../component/Layout";
import "../styles/globals.css";
import { StateContext } from "../context/StateContex";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import Router, { useRouter } from "next/router";
import { BarLoader } from "react-spinners";
import Head from "next/head";
import * as fbq from "../lib/jspixel";
import Script from "next/script";
import Image from "next/image";

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  const router = useRouter();

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview();

    const handleRouteChange = () => {
      fbq.pageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
        }}
      />
      <StateContext>
        <Head>
          <title>Kinox Apparel</title>
          <meta name="Kinox Apparel" content="Kinox Apparel" />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          <meta
            name="description"
            content=" Kinox Apparel rebranding fashion, making quality affordable and bringing
            the world to Africa"
          />
        </Head>

        {loading ? (
          <div className="loading" style={{ width: "100%" }}>
            <Image
              width={50}
              height={60}
              src="/img/kinox RED.png"
              alt="Kinox apparel Logo Loading"
              style={{ width: "50px" }}
            />
            <br />
            <BarLoader
              loading={loading}
              width="200px"
              height="5px"
              color="#D73636"
            />
          </div>
        ) : (
          <Layout>
            <Toaster />

            <Component {...pageProps} />
          </Layout>
        )}
      </StateContext>
    </>
  );
}

export default MyApp;
