import React, { useState } from "react";
import { useStateContext } from "../context/StateContex";
import { urlFor, urlForThumbnail } from "../lib/client";
import styles from "./styling/product_details.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-hot-toast";
import Select from "react-select";
import Size from "../component/pop/Size";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Zoom from "react-img-zoom";
import { FreeMode, Navigation, Thumbs } from "swiper";
import axios from "axios";

function ProductDetailShow({ product, style }) {
  const {
    state: { cart },
    dispatch,
  } = useStateContext();

  const size = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "2XL", label: "2XL" },
    { value: "3XL", label: "3XL" },
    { value: "4XL", label: "4XL" },
    { value: "5XL", label: "5XL" },
    { value: "6XL", label: "6XL" },
  ];

  const [sizes, setSizes] = useState(size.label);

  const sizeHandler = (e) => {
    setSizes(e.label);
  };

  const [disable, setDisable] = useState(false);
  const [index, setIndex] = useState(0);
  const [openSize, setOpenSize] = useState(false);

  const handleAddToCart = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const size = existItem ? existItem.size == sizes : sizes;
    // const { data } = await axios.get(`/api/products/${product._id}`);

    // if (data.price > quantity) {
    // }
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
        size,
      },
    });
    toast.success(`${quantity} ${product.name} added to cart`);
  };

  const handleQuantity = async (product, quantity) => {
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
        image: urlForThumbnail(product.image[0]),
        quantity,
      },
    });
    toast.success(`${quantity} ${product.name} added to cart`);
  };
  return (
    <div className={styles.ProductDetailShow}>
      <div className={styles.ProductDetailShowFlex}>
        <div className={styles.ProductDetailShowImageFlex}>
          <Swiper
            loop={true}
            spaceBetween={1}
            className={styles.ProductDetailShowImage}
          >
            <SwiperSlide>
              <img src={urlFor(product?.image && product?.image[index])} />
              {/* <Zoom
               zoomScale={2}
               width={500}
                height={600}
                img={urlFor(product?.image && product?.image[index])}
              /> */}
            </SwiperSlide>
          </Swiper>

          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            // thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className={styles.ProductDetailShowImageThumb}
          >
            {product?.image.map((item, index) => (
              <SwiperSlide key={index} className={styles.extraImage}>
                <img
                  src={urlFor(item)}
                  alt={
                    urlFor(product?.image[0]) ||
                    "You don’t even have to be generically good-looking. Beingwell-dressed is enough"
                  }
                  onClick={() => setIndex(index)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.ProductDetailShowText}>
          <h4>{product?.name}</h4>
          <h5>
            ₦{product?.price.toLocaleString()}.00{" "}
            {product?.price_before && (
              <span>₦{product?.price_before?.toLocaleString("en-US")} </span>
            )}
          </h5>
          <p>{product?.description}</p>

          <div style={style}>
            <Select
              placeholder={"Select Your Size"}
              options={size}
              onChange={sizeHandler}
            />

            <p
              onClick={() => {
                setOpenSize(true);
              }}
              className={styles.size_tag}
            >
              Size Guide
            </p>
          </div>
          {/* 
          <select
            value={product.quantity}
            onChange={(e) => handleQuantity(product, e.target.value)}
          >
            {[...Array(product.inStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select> */}
          <button
            className={disable ? styles.btn : ""}
            disabled={disable}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Size openSize={openSize} setOpenSize={setOpenSize} />
    </div>
  );
}

export default ProductDetailShow;
