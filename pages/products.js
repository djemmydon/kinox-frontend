
import React from "react";
import {  client } from "../lib/client";

import AllProduct from "../component/Product";
import Head from "next/head";

function Products({ products }) {
  return (
    <>
     <Head>
        <title>Kinox | Products</title>
        <meta
            name="description"
            content=" Kinox Apparel rebranding fashion, making quality affordable and bringing
            the world to Africa"
          />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    

   
          <AllProduct data={products} />

    </>
  );
}

export default Products;

export const getServerSideProps = async () => {
  const query = `*[_type == 'product' ]`;

  const products = await client.fetch(query);

  return {
    props: {
      products,
    },
  };
};
