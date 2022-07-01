import React from "react";
import AllProduct from "../../component/Product";
import { client } from "../../lib/client";

function Female({ product }) {
  // console.log(product.map((item) => {item.category.name}));
  return (
    <>
    <div className='headings'>
    <h1>Shop</h1>
  </div>
  <div className="product">
    {product?.map((item) => (
      <AllProduct key={item._id} product={item} />
    ))}
  </div>
  </>
  );
}

export default Female;

export const getStaticProps = async () => {
  const query = `*[_type == 'product'  && categories == "Female"]`;
  const product = await client.fetch(query);
  return {
    props: {
      product,
    },
  };
};
