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
          name="Kinox Apparel"
          content="Kinox Apparel | Place Order"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <OrderReview/>
    </main>
  );
}
