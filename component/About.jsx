import React from "react";
import styles from "./styling/about.module.scss";
import Image from "next/image";

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_text}>
          <h2>About Us</h2>
        </div>
      </div>

      <div className={styles.vision}>
        <div className={styles.vision_image}>
          <img src="/img/vision/kinox_visions.jpg" alt="" />
        </div>

        <div className={styles.vision_text}>
          <h2>About us</h2>

          <p>
            Kinox is a fashion brand, blend of creativity, Innovation and Class.
            With operational excellence as our hallmark, We are rebranding
            fashion, making quality affordable and taking Africa to the World.
          </p>

          <p>
            the world and even within africans. that led us to create the rule
            it is either quality or you join them)which is now a guiding factor
            guiding the company.
          </p>
        </div>

        <div className={styles.vision_text}>
          <h2>Vision</h2>

          <p>
            Growing a nonstop profitable fashion company to serve quality and
            affordable products and services for everyone in Africa and world at
            large
          </p>

          <p>
            the world and even within africans. that led us to create the rule
            it is either quality or you join them)which is now a guiding factor
            guiding the company.
          </p>
        </div>

        <div className={styles.vision_image}>
          <img src="/img/vision/kinox_vison 1.jpg" alt="" />
        </div>

        <div className={styles.vision_image}>
          <img
            src="/img/vision/kinox_vison.jpg"
            alt=""
            className={styles.img}
          />
        </div>
        <div className={styles.vision_text}>
          <h2>Missions</h2>

          <p>
            To be the first and the best plug everybody would think of, and
            patronise when it comes to anything fashion.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
