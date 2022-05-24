import React from "react";
import { useStateContext } from "../../context/StateContex";
import { urlFor, client } from "../../lib/client";
import Image from 'next/image'
import ProductDetailShow from "../../component/ProductDetails";

function ProductDetails({ product }) {
  const { InQty, DeQty, qty, onAdd } = useStateContext();
  const src = product?.image[0]?.url

  return (
    <div>
      <div>

    <ProductDetailShow key={product._id} product={product}/>


{/*         
        <img src={urlFor(product?.image[0])} alt={urlFor(product?.image[0])}/>
        <h4>{product?.name}</h4>
        <p>₦{product?.price}</p>
        <p>{product?.description}</p>

        <div>
          <span onClick={DeQty}>-</span>
          <span>{qty}</span>
          <span onClick={InQty}>+</span>
          <button onClick={() => onAdd(product, qty)}>Add to Cart</button>
        </div> */}
      </div>
    </div>
  );
}

export default ProductDetails;

export const getStaticPaths = async () => {
  const query = `*[_type == 'product']{
         slug  {
              current
            }
     }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { slug: product?.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;

  const product = await client.fetch(query);

  return {
    props: { product },
  };
};
