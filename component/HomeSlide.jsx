import { Pagination } from "swiper";
import styles from "./styling/swiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";


SwiperCore.use([Autoplay])
function HomeSlide() {

  

  return (
    <main className={styles.home_slide}>
      <Swiper 
        loop="true"
        
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false
                }}
      className={styles.slideHead}>
        <SwiperSlide className={styles.home_slide_items}>
          <div className={styles.home_slide_item}>
            <img src="./imagecompressor/BG3.png" alt="" />

            <div className={styles.home_slide_text}>
              <h2>We make Your Design happen</h2>
              <p> Nisi placeat sed, accusantium earum minima recusandae repudiandae.</p>
              <button>Click Me !</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className={styles.home_slide_items}>
          <div className={styles.home_slide_item}>
            <img src="./imagecompressor/BG2.png" alt="" />

            <div className={styles.home_slide_text}>
              <h2>100% kinox apparel shirt</h2>
              <p> Nisi placeat sed, accusantium earum minima recusandae repudiandae.</p>
              <button>Click Me !</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className={styles.home_slide_items}>
          <div className={styles.home_slide_item}>
            <img src="./imagecompressor/BG1.png" alt="" />

            <div className={styles.home_slide_text}>
              <h2>we are full of fashion</h2>
              <p> Nisi placeat sed, accusantium earum minima recusandae repudiandae.</p>
              <button>Click Me !</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </main>
  );
}

export default HomeSlide;
