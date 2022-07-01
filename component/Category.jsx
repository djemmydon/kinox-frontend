import React from "react";
import styles from "./styling/category.module.scss";
import Link from "next/link";
import Image from "next/image";
import { urlFor, urlForThumbnail } from "../lib/client";

function Category({ title }) {
  return (
    <div className={styles.category_items}>
      <div className={styles.category_items_text}>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

export default Category;
