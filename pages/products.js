import Link from "next/link";
import React from "react";
import { urlFor, client } from "../lib/client";

import AllProduct from "../component/Product";

function Products({ products }) {
  return (
    <>

    
<div className='headings'>
        <h1>Shop</h1>
        <p>Kinox Lorem ipsum dolor sit amet consectetur </p>
      </div>
      <div className="product">
        {products?.map((item) => (
          <AllProduct key={item._id} product={item} />
        ))}
      </div>
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
