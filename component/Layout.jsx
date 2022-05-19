import React from "react";
import Head from 'next/head'
import Nav from "./Nav";
const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Kinox</title>
      </Head>

      <header>
        <Nav/>
      </header>

      <main>{children}</main>

      <footer></footer>
    </div>
  );
};

export default Layout;
