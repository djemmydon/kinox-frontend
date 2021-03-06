import React from "react";
import styles from "./styling/footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineMail,
  AiOutlinePhone,
  // AiFillTwitterCircle,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.footer_grid}>
        <div className={styles.grid}>
          <Link href="/" className={styles.name}>
            <Image src="/img/kinox_white.png" width={40} height={50} />
          </Link>
        </div>
        <div className={styles.grid}>
          <div className={styles.about}>
            <h4>Contact Us</h4>
            <p>
              <img src="/icons/phone.png" alt="" />
              <a href="tel:+2347025235337">+2347025235337</a>
            </p>
            <p>
            <img src="/icons/mail.png" alt="" />

              <a href="mailto:kinoxapparel@gmail.com"> kinoxapparel@gmail.com</a>
            </p>
          </div>
        </div>
        <div className={styles.grid}>
          <h4>Navigate</h4>
          <div className={styles.grid_items}>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/products">
              <a>Products</a>
            </Link>
            <Link href="/about">
              <a>About</a>
            </Link>
          </div>
        </div>
        <div className={styles.grid}>
          <h4>Helpful Link</h4>

          <div className={styles.grid_items}>
            <Link href="/#">
              <a>Contact</a>
            </Link>
            <Link href="/#">
              <a>FAQ</a>
            </Link>
            <Link href="/register">
              <a>Sigin Up</a>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.iconsDeveloper}>
        <div className={styles.developer}>
          <span>
            Developed by{" "}
            <a href="https://wa.me/+2348182377321">Peculiar</a>
          </span>
        </div>

        <div className={styles.icons}>
        <a href="">
          <img  src="/icons/instagram.png" className={styles.iconImage} alt="Kinox apparel Social Media handle" />
         </a>
          <a href="">
          <img  src="/icons/twitter.png" className={styles.iconImage} alt="Kinox apparel Social Media handle" />
         </a>
          <a href="">
          <img  src="/icons/facebook.png" className={styles.iconImage} alt="Kinox apparel Social Media handle" />
         </a>
          <a href="">
          <img  src="/icons/linkedin (2).png" className={styles.iconImage} alt="Kinox apparel Social Media handle" />
         </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
