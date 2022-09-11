import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "./Footer";
import BarLoader from "react-spinners/BarLoader";
import Image from "next/image";


const Nav = dynamic(() => import("../component/Nav"), { ssr: false });

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  return (
    <div>

{loading === true ? (
        <div className="loading">
          <Image src="/img/kinox RED.png" height="100" width="70"/>
          <BarLoader loading={loading}  width="200px" height="5px" color="#D73636"/>
        </div>
      ) : (

        <div>
             <Head>
        <title>Kinox</title>
      </Head>

      <header>
        <Nav />
      </header>


        <main>{children}</main>
    

      <footer>
        <Footer />
      </footer>
        </div>
      )}
   
    </div>
  );
};

export default Layout;
