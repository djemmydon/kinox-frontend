import React from "react";
import styles from "./styling/category.module.scss";
import Link from "next/link";
import Image from "next/image";
import { urlFor, urlForThumbnail } from "../lib/client";

function Category({category:{title,image}}) {
  console.log(urlFor(image));
  return (
       
           <div className={styles.category_items}>
            <img src={urlForThumbnail(image)} alt="" />
   
           <div className={styles.category_items_text}>
             <h2>{title}</h2>
             <Link href="/">
               <a>Shop Now</a>
             </Link>
             </div>
           </div>
   
  );
}

export default Category;

