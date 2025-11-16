import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonStar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import startPeople from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const brandsLogos = [
  amazon,
  vector,
  casio,
  moonStar,
  randstad,
  star,
  startPeople,
];

const Brands = () => {
  return (
    <Swiper
      slidesPerView={3}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      loop={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 500,
        disableOnInteraction: false,
      }}>
      {brandsLogos.map((logo, i) => (
        <SwiperSlide key={i}>
          <img
            src={logo}
            alt=""
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
