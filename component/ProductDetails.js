import React, { useState } from "react";
import { useStateContext } from "../context/StateContex";
import { urlFor, client, urlForThumbnail } from "../lib/client";
import Image from "next/image";
import styles from "./styling/product_details.module.scss";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-hot-toast";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper";
import axios from "axios";

function ProductDetailShow({ product }) {
  const {
    state: { cart },
    dispatch,
  } = useStateContext();

  const [disable, setDisable] = useState(false);
  const [sizes,setSizes] = useState("");


  const handleAddToCart = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product.Id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const size = existItem ? existItem.size == sizes : sizes;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.price > quantity) {
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        inStock: product.inStock,
        image: urlForThumbnail(product.image[0]),
        quantity,
        size
      },
    });
    toast.success(`${quantity} ${product.name} added to cart`);
  };

  // const handleQuantity =async (product, quantity) => {
  //   const { data } = await axios.get(`/api/products/${product._id}`);

  //   if (data.price > quantity) {
  //   }
  //   dispatch({
  //     type: "CART_ADD_ITEM",
  //     payload: {
  //       _key: product._id,
  //       name: product.name,
  //       price: product.price,
  //       description: product.description,
  //       image: urlForThumbnail(product.image[0]),
  //       quantity,
  //     },
  //   });
  //   toast.success(`${quantity} ${product.name} added to cart`);
  // }
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
            {product?.image.map((item, index) => (
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

          <div>
            <select
              
            >
             <option value=" ">Select your size</option>
             <option value="S">S</option>
             <option value="M">M</option>
             <option value="XL">XL</option>
             <option value="XXL">XXL</option>
             <option value="XXXL">XXXL</option>
             <option value="XXXXL">XXXXL</option>
            </select>
          </div>

          <button
            className={disable ? styles.btn : ""}
            disabled={disable}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailShow;
