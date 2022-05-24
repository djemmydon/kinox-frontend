import React from "react";
import styles from "./styling/category.module.scss";
import Link from 'next/Link'
import Image from "next/image";
function Category() {
  return (
    <main className={styles.categories}>
      <div className={styles.category}>
        <div className={styles.category_items}>
        <Image src="/imagecompressor/kinox6 (1)-min.jpg" width={500} height={500}  />

        <div className={styles.category_items_text}>
          <h2>Kinox Wear</h2>
          <Link href="/">
            <a>Shop Now</a>
          </Link>
          </div>
        </div>
        <div className={styles.category_items}>
        <Image src="/imagecompressor/kinox4-min.jpg"  width={500} height={500}   />

        <div className={styles.category_items_text}>
          <h2>Branding Wears</h2>
          <Link href="/">
            <a>Shop Now</a>
          </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Category;
