import React from "react";
import Head from 'next/head'

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Kinox</title>
      </Head>

      <header></header>

      <main>{children}</main>

      <footer></footer>
    </div>
  );
};

export default Layout;
