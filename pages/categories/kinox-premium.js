import React from "react";
import { client } from "../../lib/client";

function Categories({ product }) {
  console.log(product);
  return (
    <div>
      {product?.map((item, idx) => (
        <div key={idx}>
          <h1>{item.name}</h1>
          <h1>{item.category?.name}</h1>
        </div>
      ))}

      <h1>wsdkjcnsdkvnskjvndjkfn</h1>
    </div>
  );
}

export default Categories;

export const getStaticProps = async () => {
  const query = `*[_type == 'product' && category.slug.current == "big-cat"]`;
  const product = await client.fetch(query);
  return {
    props: {
      product,
    },
  };
};
