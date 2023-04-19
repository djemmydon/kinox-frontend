import React from "react";
import styles from "../styling/popup.module.scss";
import { AiOutlineClose } from "react-icons/ai";
function Size({ openSize, setOpenSize }) {
  return (
    openSize && (
      <div className={styles.popContainer}>
        <div className={styles.container}>
          <AiOutlineClose
            className={styles.nav_cancel}
            size={50}
            color="#000"
            onClick={() => setOpenSize(false)}
          />

          <div className={styles.container_body}>
            <div className={styles.items}>
              <img src="/img/shirt.jpg" alt="" />
            </div>
            <div className={styles.items}>
              <img src="/img/T-shirt.png" alt="" />
            </div>
            <div className={styles.items}>
              <img src="/img/T-shirt 2.png" alt="" />
            </div>
            <div className={styles.items}>
              <img src="/img/jogger.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Size;
