import React from "react";
import AllProduct from "../../component/Product";
import { client } from "../../lib/client";

function Male({ product }) {
  // console.log(product.map((item) => {item.category.name}));
  return (
    <>
    <div className='headings'>
    <h1>Shop</h1>
  </div>
  <div className="product">
 
      <AllProduct data={product}/>

  </div>
  </>
  );
}

export default Male;

export const getStaticProps = async () => {
  const query = `*[_type == 'product'  && categories == "Male"]`;
  const product = await client.fetch(query);
  return {
    props: {
      product,
    },
  };
};
