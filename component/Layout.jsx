import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "./Footer";

const Nav = dynamic(() => import("../component/Nav"), { ssr: false });

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <Head>
          <title>Kinox Apparel</title>
          <meta name="Kinox Apparel" content="Kinox Apparel" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header>
          <Nav />
        </header>

        <main className="main">{children}</main>

        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Layout;
