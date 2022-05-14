import React from "react";
import { urlFor, client } from "../../lib/client";
  {/* <img src={urlFor(product.image[0])} alt="" />
        <h4>{product.name}</h4>
        <p>₦{product.price}</p>
        <p>{product.description}</p>  */}

        
function ProductDetails({ product }) {
  return (
    <div>
      <div>
     
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
