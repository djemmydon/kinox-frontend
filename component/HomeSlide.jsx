// import { Pagination } from "swiper";
import styles from "./styling/swiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Image from "next/image";
// import { useRouter } from "next/router";

// const squareVariants = {
//   visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
//   hidden: { opacity: 0, scale: 0 },
// };
SwiperCore.use([Autoplay]);

function HomeSlide() {
  const controls = useAnimation();
  const [inView] = useInView();
  // const router = useRouter();

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
              <div className={styles.home_slide_text}>
                <h2>{`We make it happen`}</h2>
                <p>
                  Blend of creativity, Innovation and Class. 100% quality
                  certainty and 100% timing and trust
                </p>

                <div className={styles.button}>
                  <button>Shop Now</button>
                </div>
              </div>

              <div className={styles.home_slide_img}>
                <Image
                  src="/img/img2.png"
                  alt="This is LadyJamsmiC Kinox"
                  height="1000"
                  width="1000"
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className={styles.home_slide_items}>
            <div className={styles.home_slide_item}>
              <div className={styles.home_slide_text}>
                <h2>{`Women's Fashion`}</h2>
                <p>
                  To be the first and the best plug everybody would think of,
                  and patronise when it comes to anything fashion.
                </p>

                <div className={styles.button}>
                  <button>Shop Now</button>
                </div>
              </div>

              <div className={styles.home_slide_img}>
                <Image
                  src="/img/img1.png"
                  alt="This is LadyJamsmiC Kinox"
                  height="1000"
                  fill=""
                  width="1000"
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.home_slide_items}>
            <div className={styles.home_slide_item}>
              <div className={styles.home_slide_text}>
                <h2>{`Bringing the world to Africa `}</h2>
                <p>
                  You don’t even have to be generically good-looking. Being
                  well-dressed is enough
                </p>

                <div className={styles.button}>
                  <button>Shop Now</button>
                </div>
              </div>

              <div className={styles.home_slide_img}>
                <Image
                  src="/img/im.png"
                  alt="This is LadyJamsmiC Kinox"
                  height="1000"
                  fill=""
                  width="1000"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </main>
    </>
  );
}

export default HomeSlide;
