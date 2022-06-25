import React from "react";
import styles from "./styling/popup.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

function HomePopPup(props) {
  return props.trigger ? (
    <main className={styles.popupContainer}>
      <div className={styles.popupContent} trigger={props.popContent}>
        <div onClick={props.popUp} className={styles.popupClose}>
          <AiOutlineClose
            className={styles.nav_cancel}
            color="black"
            size={25}
          />
        </div>
        <h2>{props.title2}</h2>
        <p>{props.header}</p>
        <div><button onClick={props.popUp}>
          <Link href="https://wa.me/+2347025235337">Contact Us Here</Link>
        </button></div>
        
      </div>
    </main>
  ) : (
    ""
  );
}

export default HomePopPup;
