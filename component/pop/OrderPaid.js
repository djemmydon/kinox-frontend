import React from "react";
import styles from "../styling/popup.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

function OrderPaid(props) {
  return props.pay ? (
    <main className={styles.popupContainer}>
      <div className={styles.popSize} trigger={props.popContent}>
        {/* <div onClick={props.popUp} className={styles.popupClose} >
          <AiOutlineClose
            className={styles.nav_cancel}
            color="black"
            size={25}
          />
        </div> */}
        <img src={props.src} alt="" style={{height:"150px"}} />
        <h2>Order Successul</h2>

        <p>Your  Order will be delivered to you within 5 working days</p>
        <div>
          <button onClick={props.popUp}>
            <Link href="/">Go back home</Link>
          </button>
        </div>
      </div>
    </main>
  ) : (
    ""
  );
}

export default OrderPaid;
