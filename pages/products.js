import React, { useEffect, useState } from 'react';
import { client } from '../lib/client';

import AllProduct from '../component/Product';
import Head from 'next/head';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const query = `*[_type == 'product' ]`;
    const fetchData = async () => {
      const products = await axios.get(
        `https://jbcyg7kh.api.sanity.io/v2021-10-21/data/query/production?query=${query}`
      );
      setProducts(products.data.result.sort((a, b) => b._createdAt.localeCompare(a._createdAt)));
    };

    fetchData();
  }, []);
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
      <div className="headings">
        <h1>All Products</h1>
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
