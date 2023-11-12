import React from "react";
import styles from "./styling/category.module.scss";
import Link from "next/link";
import Image from "next/image";
import { urlFor, urlForThumbnail } from "../lib/client";

function Category({ categories }) {
  return (
    <div className={styles.category_items_Body}>
      {categories.map((items) => (
        <Link href={`/categories/${items?.slug.current}`} key={items?._id} className={styles.category_items}>
          <div></div>
          {/* <img  src="/img/kinox-wear.jpg"/> */}
          <img src={urlFor(items?.image)} alt="Kinox Apparel Shopping cart" />
          <h2>{items?.name}</h2>
        </Link>
      ))}
    </div>
  );
}

export default Category;
