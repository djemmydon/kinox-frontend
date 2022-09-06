
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
          name="Kinox Apparel"
          content="Kinox Apparel | Products"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
<div className='headings'>
        <h1>Shop</h1>
      </div>
   
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
