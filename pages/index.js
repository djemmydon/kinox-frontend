import Head from 'next/head';

import { client } from '../lib/client';
import Product from '../component/Product';
import HomeSlide from '../component/HomeSlide';
import Category from '../component/Category';
import { useRouter } from 'next/router';

import React, { useState, useEffect } from 'react';
import HomePopPup from '../component/pop/HomePopPup';
import Review from '../component/Review';
import axios from 'axios';

// { data, review, categories }
export default function Home() {
  const [popUp, setPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [review, setReview] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const query = `*[_type == 'product' ]`;
    const reviewQuery = `*[_type == 'review']`;
    const queryCategoty = `*[_type == 'category']`;
    const fetchData = async () => {
      const categories = await axios.get(
        `https://jbcyg7kh.api.sanity.io/v2021-10-21/data/query/production?query=${queryCategoty}`
      );
      setCategories(categories.data.result);
      const products = await axios.get(
        `https://jbcyg7kh.api.sanity.io/v2021-10-21/data/query/production?query=${query}`
      );
      setData(products.data.result.sort((a, b) => b._createdAt.localeCompare(a._createdAt))
      .splice(0, 8),);

      const review = await axios.get(
        `https://jbcyg7kh.api.sanity.io/v1/data/query/production?query=${reviewQuery}`
      );
      setReview(review.data.result);
    };

    fetchData();
  }, []);
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
        <meta name="viewport" content="width=device-width, user-scalable=0" />
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
          <button onClick={() => router.push('/products')}>
            See All Products
          </button>
        </div>

        {/* <div className="gif_design">
         
          <img src="/img/black_friday.jpg " alt="" />
        </div>

        <div className="headings">
          <h1>Customers Reviews</h1>
        </div> */}
        <Category categories={categories} />

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
      data: products

        .sort((a, b) => b._createdAt.localeCompare(a._createdAt))
        .splice(0, 8),
      review,
      categories,
    },
  };
};
