import React from "react";
import styles from "../component/styling/placeorder.module.scss";
import OrderReview from "../component/OrderReview";

export default function placeorder() {

  return (
    <main className={styles.placeorder}>
        <OrderReview/>
    </main>
  );
}
