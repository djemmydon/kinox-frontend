import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";


import { Pagination } from "swiper";

function Review({ item: { name, _id, testimonial, company } }) {
  return (
    <div>
       <h1>{name}</h1>
       <p>{testimonial}</p>
       <span>{company}</span>
    </div>
  );
}

export default Review;
