import Head from "next/head";

import { client } from "../lib/client";
import Product from "../component/Product";
import HomeSlide from "../component/HomeSlide";
import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";
import HomePopPup from "../component/pop/HomePopPup";
import Review from "../component/Review";

export default function Home({ data, review }) {
  const [popUp, setPopUp] = useState(false);
  const router = useRouter();

  const popUpHandler = () => {
    setPopUp(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setPopUp(true);
    }, 4000);
  }, []);

  return (
    <div>
      <Head>
        <title>Kinox | Home</title>
        <meta name="Kinox Apparel" content="Kinox Apparel | Home" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content=" Kinox Apparel rebranding fashion, making quality affordable and bringing
            the world to Africa"
        />
      </Head>

      <main>
        <HomePopPup
          popUp={popUpHandler}
          trigger={popUp}
          title="Are you are brand owner ?"
          title2=" You want to buy in bulk ?"
          header="Click on the button below to talk with the customer care representative"
          link="https://wa.me/+2347025235337"
          button="Contact Us Here"
        />
        <HomeSlide />

        <div className="headings">
          <h1>New in Store</h1>
        </div>

        <Product data={data} />

        <div className="button-push">
          <button onClick={() => router.push("/products")}>
            See All Products
          </button>
        </div>

        {/* <div className="gif_design">
         
          <img src="/img/black_friday.jpg " alt="" />
        </div>

        <div className="headings">
          <h1>Customers Reviews</h1>
        </div> */}

        <div className="headings">
          <h1>What People Say</h1>
        </div>
        <Review data={review} />

        <div></div>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == 'product' ]`;
  const reviewQuery = `*[_type == 'review']`;
  const queryCategoty = `*[_type == 'category']`;

  const categories = await client.fetch(queryCategoty);
  const products = await client.fetch(query);
  const review = await client.fetch(reviewQuery);
  return {
    props: {
      data: products.splice(0, 8),
      review,
      categories,
    },
  };
};
