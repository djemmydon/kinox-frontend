import React, { useState } from "react";
import { useStateContext } from "../context/StateContex";
import { urlFor, client } from "../lib/client";
import Image from "next/image";
import styles from "./styling/product_details.module.scss";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper";

function ProductDetailShow({ product }) {
  const { InQty, DeQty, qty, onAdd } = useStateContext();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [disable, setDisable] = useState(false);


  return (
    <div className={styles.ProductDetailShow}>
      <div className={styles.ProductDetailShowFlex}>
        <div className={styles.ProductDetailShowImageFlex}>
          <Swiper
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={4}
            className={styles.ProductDetailShowImage}
          >
            {product?.image.map((item, index)=> (
              <SwiperSlide key={index}>
                <img src={urlFor(item)} alt={urlFor(product?.image[0])} />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            // thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className={styles.ProductDetailShowImageThumb}
          >
            {product?.image.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={urlFor(item)} alt={urlFor(product?.image[0])} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.ProductDetailShowText}>
          <h4>{product?.name}</h4>
          <h5>₦{product?.price}.00</h5>
          <p>{product?.description}</p>

          <div className={styles.ProductDetailShowDecInc}>
            <div>
              <span>{qty}</span>
            </div>
            <div>
              <BiUpArrow onClick={InQty} />

              <BiDownArrow onClick={DeQty} />
            </div>
          </div>
              
            
          <button className=   {disable ?  styles.btn : ""} disabled={disable}   onClick={() => onAdd(product, qty) || setDisable(true) }>Add to Cart</button>
          
        </div>
      </div>
    </div>
  );
}

export default ProductDetailShow;
