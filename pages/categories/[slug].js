import React from "react";
import AllProduct from "../../component/Product";
import { client } from "../../lib/client";
import Link from "next/link";

function Category({ product }) {
  // console.log(product.map((item) => {item.category.name}));
  return (
    <>
      <div className="headings">
        <h1>Shop</h1>
      </div>

      {product ? (
        <div className="product">
          <AllProduct data={product} />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", color:"e0e0" }}>
          <h1>No Products </h1>
        </div>
      )}
    </>
  );
}

export default Category;

export const getStaticPaths = async () => {
  const query = `*[_type == 'category']{
           slug  {
                current
              }
       }`;

  const category = await client.fetch(query);

  const paths = category.map((items) => ({
    params: { slug: items?.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == 'product' ]`;
  const productQuery = `*[_type == 'category'  && slug.current == '${slug}'][0]`;
  const products = await client.fetch(query);
  const Proproduct = await client.fetch(productQuery);
  const product = products.filter(
    (item) => item?.category?._ref === Proproduct._id
  );
  return {
    props: {
      product,
    },
  };
};
