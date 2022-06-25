import Head from "next/head";

import { client } from "../lib/client";
import Product from "../component/Product";
import HomeSlide from "../component/HomeSlide";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import ClipLoader from "react-spinners/ClipLoader";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import Category from "../component/Category";
import HomePopPup from "../component/HomePopPup";
import React, { useState, useEffect } from "react";

export default function Home({ data, review, categories }) {
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
      </Head>

   
        <main>
          <HomePopPup
            popUp={popUpHandler}
            trigger={popUp}
            title="Are you are brand owner ?"
            title2=" You want to buy in bulk ?"
            header="Click on the button below to talk with the customer care representative"
          />
          <HomeSlide />

          <div className="headings">
            <h1>Category</h1>
          </div>

          <div className="category">
            {categories.map((category, idx) => (
              <div key={idx} className="testimonia_slide_home">
                <Category key={idx} category={category} />
              </div>
            ))}
          </div>

          <div className="headings">
            <h1>New in Stored</h1>
          </div>
          <div className="product">
            {data?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>

          <div className="button-push">
            <button onClick={() => router.push("/products")}>
              See All Products
            </button>
          </div>

          <div className="headings">
            <h1>Customers Reviews</h1>
          </div>

          <Swiper
            slidesPerView="auto"
            loop={true}
            centeredSlides={true}
            spaceBetween={30}
            autoplay={{
              delay: 6000,

              disableOnInteraction: false,
            }}
            modules={[Pagination]}
            className="testimonial_slide"
          >
            {review?.map((item) => (
              <SwiperSlide key={item._id} className="testimonia_slide_home">
                <h4> &quot;{item.testimonial}&quot;</h4>
                <p>
                  {item.name}/ <span>{item.company}</span>
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
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
      data: products.splice(0, 4),
      review,
      categories,
    },
  };
};
