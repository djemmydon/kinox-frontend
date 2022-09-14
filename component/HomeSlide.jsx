import { Pagination } from "swiper";
import styles from "./styling/swiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const squareVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0 },
};
SwiperCore.use([Autoplay]);

function HomeSlide() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <>
      <main className={styles.home_slide}>
        <Swiper
          loop="true"
          speed={1200}
          autoplay={{
            delay: 6000,

            disableOnInteraction: false,
          }}
          className={styles.slideHead}
        >
          <SwiperSlide className={styles.home_slide_items}>
            <div className={styles.home_slide_item}>
              <div className={styles.home_slide_img}>
                <img src="./img/kinox_ban.JPG" alt="" />

                {/* <Image src="./img/kinox_ban.JPG"  width="100%" height="100%"/> */}
                <div className={styles.fade_up}></div>
              </div>

              <div className={styles.home_slide_text}>
                <h2>We make Your Design happen</h2>

                <p>
                  Dress up your mind and you’ll be able to make all sorts of
                  fashion statements.
                </p>
                <button>Contact Us</button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className={styles.home_slide_items}>
            <div className={styles.home_slide_item}>
              <div className={styles.home_slide_img}>
                <img src="./img/kinox_ban2.JPG" alt="" />

                <div className={styles.fade_up}></div>
              </div>

              <div className={styles.home_slide_text}>
                <h2>100% kinox apparel shirt</h2>
                <p>
                  {" "}
                  You don’t even have to be generically good-looking. Being
                  well-dressed is enough.
                </p>
                <button>Shop Now</button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className={styles.home_slide_items}>
            <div className={styles.home_slide_item}>
              <div className={styles.home_slide_img}>
                <img src="./img/kinox_ban.JPG" alt="" />

                <div className={styles.fade_up}></div>
              </div>

              <div className={styles.home_slide_text}>
                <h2>we are full of fashion</h2>
                <p>
                  {" "}
                  Fashion is a language that creates itself in clothes to
                  interpret reality.
                </p>
                <button>About Us</button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </main>
    </>
  );
}

export default HomeSlide;
