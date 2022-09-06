import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";
import styles from "./styling/product.module.scss";
import { AiFillEye } from "react-icons/ai";
import * as CurrencyFormat from "react-currency-format";
import Image from "next/image";

export function Product({ data }) {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <>
      <div className={styles.productsBody} >
        {data.map((product) => (
          <div className={styles.item} key={product._id}>
            <Link href={`/product/${product.slug.current}`}>
              <a className={styles.icon}>
                <div className={styles.image}>
                  {
                    <img
                      src={urlFor(product.image[0])}
                      alt="kinox product image"
                    />
                  }{" "}
                  <div className={styles.overlay}>
                    <AiFillEye className={styles.icons} size={30} />
                  </div>
                </div>

                <div className={styles.text_side}>
                  <h4>{truncate(product.name, 33)}</h4>

                  <p>{product.price.toLocaleString("en-US")}</p>
                </div>

                <div className={styles.cart_button}>
                  <p>{product.price.toLocaleString("en-US")}</p>

                  <button>Add To Cart</button>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

function AllProduct({ data }) {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <>
      <div className={styles.productsBody}>
        {data.map((product) => (
          <div className={styles.item} key={product._id}>
            <Link href={`/product/${product.slug.current}`}>
              <a className={styles.icon}>
                <div className={styles.image}>
                  {
                    <img
                      src={urlFor(product.image[0])}
                      alt="kinox product image"
                    />
                  }{" "}
                  <div className={styles.overlay}>
                    <AiFillEye className={styles.icons} size={30} />
                  </div>
                </div>

                <div className={styles.text_side}>
                  <h4>{truncate(product.name, 30)}</h4>

                  <div className={styles.cart_button}>
                    <p>{product.price.toLocaleString("en-US")}</p>

                    <button>Add To Cart</button>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllProduct;
