import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import styles from "../component/styling/review.module.scss"

// import required modules

import { EffectCube, Pagination } from "swiper";

function Review({ data }) {
  return (
    <div className={styles.review}>
      <Swiper
       loop={true}
         pagination={true}
         modules={[EffectCube, Pagination]}
         className={styles.test}
      >
        {data.map((item) => (
          <SwiperSlide key={item._id}className={styles.review_text}>
            <h4> &quot;{item.testimonial}&quot;</h4>
            <p>
              {item.name}/ <span>{item.company}</span>
            </p>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.overlay}>
        
      </div>
    </div>
  );
}

export default Review;
