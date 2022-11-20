import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";
import styles from "./styling/product.module.scss";
import { AiFillEye } from "react-icons/ai";
import Image from "next/image";

export function Trending({data}) {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
  
       <div className={styles.productsBody} >
        {data.sort((a,b) => b._updatedAt.localeCompare(a._updatedAt)).slice(0, 4).map((product) => (
          <div className={styles.item} key={product._id}>
            <Link href={`/product/${product.slug.current}`}>
              <div className={styles.icon}>
                <div className={styles.image}>
                  {
                    <img
                      src={urlFor(product.image[0])}
                      alt="kinox apparel product image"
                    />
                  }{" "}
                  <div className={styles.overlay}>
                    <AiFillEye className={styles.icons} size={30} />
                  </div>
                </div>

                <div className={styles.text_side}>
                  <h4>{truncate(product.name, 33)}</h4>

                </div>

                <div className={styles.cart_button}>
                  <p>₦{product.price.toLocaleString("en-US")} {product?.price_before && <span>₦{product?.price_before?.toLocaleString("en-US")} </span>}</p>

                  <button>View Product</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

  );
}

;
