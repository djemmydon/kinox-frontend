import React from "react";

import {  client } from "../../lib/client";

import ProductDetailShow from "../../component/ProductDetails";
import { Trending } from "../../component/Trending";


const styling = {
  select: {
    maxWidth:150,
    color: "black",
    fontSize:12,
    marginBottom:10,
fontFamily: "Helvetica",

  },
};
function ProductDetails({ product, trending }) {

  return (
    <div>
      <div>
        <ProductDetailShow style={styling.select} key={product._id} product={product} />

        <div className="headings">
          <h1>People also like</h1>
        </div>

     
            <Trending data={trending}/>
   

  
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

  const category = await client.fetch(query);

  console.log(category)
  const paths = category?.map((items) => ({
    params: { slug: items?.slug.current },
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

