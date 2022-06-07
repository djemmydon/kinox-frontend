import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";
import styles from "./styling/product.module.scss";
import { AiFillEye } from "react-icons/ai";


export function Product({ product: { name, image, price, description, slug } }) {
  return (
    <div className={styles.item}>
      <Link href={`/product/${slug.current}`}>
        <a className={styles.icon}>
          {<img src={urlFor(image[0]) } alt="kinox product image"/> }

          <div className={styles.overlay}>
            <AiFillEye className={styles.icons} size={30} />
          </div>


          <div className={styles.text_sidebar}>
          <h4>{name}</h4>
          <p>₦{price}.00</p>
          </div>
          
        </a>
      </Link>
    </div>
  );
}

;


function AllProduct({ product: { name, image, price, description, slug } }) {
  return (
    <div className={styles.item}>
      <Link href={`/product/${slug.current}`}>
        <a className={styles.icon}>
          <img src={urlFor(image[0])} alt="kinox product image"/>

          <div className={styles.overlay}>
            <AiFillEye className={styles.icons} size={30} />
          </div>


          <div className={styles.text_sidebar}>
          <h4>{name}</h4>
          <p>₦{price}.00</p>
          </div>
          
        </a>
      </Link>
    </div>
  );
}

export default AllProduct;

