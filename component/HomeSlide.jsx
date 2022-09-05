import { Pagination } from "swiper";
import styles from "./styling/swiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";

SwiperCore.use([Autoplay]);
function HomeSlide() {
  return (
    <main className={styles.home_slide}>
      <Swiper
        loop="true"
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        className={styles.slideHead}
      >
        <SwiperSlide className={styles.home_slide_items}>
          <div className={styles.home_slide_item}>
            <div className={styles.home_slide_img}>
              <img src="./img/kinox_ban.JPG"  alt="" />

              {/* <Image src="./img/kinox_ban.JPG"  width="100%" height="100%"/> */}
            <div className={styles.fade_up}></div>
              
            </div>

            <div className={styles.home_slide_text}>
              <h2>We make Your Design happen</h2>
              <p>
                {" "}
                Nisi placeat sed, accusantium earum minima recusandae
                repudiandae.
              </p>
              <button>Click Me !</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className={styles.home_slide_items}>
          <div className={styles.home_slide_item}>
        

            <div className={styles.home_slide_img}>
            <img src="./img/kinox_ban2.JPG"  alt="" />

            <div className={styles.fade_up}></div>
              
            </div>

            <div className={styles.home_slide_text}>
              <h2>100% kinox apparel shirt</h2>
              <p>
                {" "}
                Nisi placeat sed, accusantium earum minima recusandae
                repudiandae.
              </p>
              <button>Click Me !</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className={styles.home_slide_items}>
          <div className={styles.home_slide_item}>
          <div className={styles.home_slide_img}>
          <img src="./img/kinox_ban.JPG"  alt="" />

            <div className={styles.fade_up}></div>
              
            </div>

            <div className={styles.home_slide_text}>
              <h2>we are full of fashion</h2>
              <p>
                {" "}
                Nisi placeat sed, accusantium earum minima recusandae
                repudiandae.
              </p>
              <button>Click Me !</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

    </main>
  );
}

export default HomeSlide;
