import React from "react";

import {  client } from "../../lib/client";

import ProductDetailShow from "../../component/ProductDetails";
import { Trending } from "../../component/Trending";

function ProductDetails({ product, trending }) {

  return (
    <div>
      <div>
        <ProductDetailShow key={product._id} product={product} />

        <div className="headings">
          <h1>People also like</h1>
        </div>

        <div className="product">
          {trending?.map((product) => (
            <Trending simplified key={product._id} product={product} />
          ))}
        </div>

  
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
  const trendingQuery = `*[_type == 'product' &&  trending ==true]`;
  const product = await client.fetch(query);
  const trending = await client.fetch(trendingQuery);
  return {
    props: { product, trending },
  };
};
