import Layout from "../component/Layout";
import "../styles/globals.css";
import { StateContext } from "../context/StateContex";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import Image from "next/image";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <StateContext>
      {loading ? (
        <div className="loading">
          <Image src="/img/kinox RED.png" height="100" width="70" />
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
