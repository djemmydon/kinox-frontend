import Layout from "../component/Layout";
import "../styles/globals.css";
import { StateContext } from "../context/StateContex";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import Router from "next/router";
import { BarLoader } from "react-spinners";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <StateContext>
      <Head>
        <title>Kinox Apparel</title>
        <meta name="Kinox Apparel" content="Kinox Apparel" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content=" Kinox Apparel rebranding fashion, making quality affordable and bringing
            the world to Africa"
        />
      </Head>

      {loading ? (
        <div className="loading" style={{ width: "100%" }}>
          <img
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
  );
}

export default MyApp;
