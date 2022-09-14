import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "./Footer";
import BarLoader from "react-spinners/BarLoader";
import Image from "next/image";

const Nav = dynamic(() => import("../component/Nav"), { ssr: false });

const Layout = ({ children }) => {
  return (
    <div>
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
    </div>
  );
};

export default Layout;
