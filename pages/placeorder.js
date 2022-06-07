import React, { useEffect } from "react";
import styles from "../component/styling/placeorder.module.scss";
import { useStateContext } from "../context/StateContex";
import { useRouter } from "next/router";
import OrderReview from "../component/OrderReview";
import dynamic from "next/dynamic";
const Nav = dynamic(
    () => import('../component/OrderReview'),
    { ssr: false }
  )
export default function placeorder() {

  return (
    <main className={styles.placeorder}>
        <OrderReview/>
    </main>
  );
}
