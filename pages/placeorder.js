import React from "react";
import styles from "../component/styling/placeorder.module.scss";
import OrderReview from "../component/OrderReview";
import Head from "next/head";

export default function placeorder() {
  return (
    <main className={styles.placeorder}>
      <Head>
        <title>Kinox | Place Order</title>
        <meta
          name="description"
          content=" Kinox Apparel rebranding fashion, making quality affordable and bringing
            the world to Africa"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OrderReview />
    </main>
  );
}
