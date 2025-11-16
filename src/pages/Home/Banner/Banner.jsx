import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { FaLongArrowAltRight } from "react-icons/fa";

const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}>
      <div className="relative">
        <img src={bannerImg1} />
        <div className="absolute top-5/6 left-10 -translate-y-1/2 flex gap-5 z-50">
          <button className="btn btn-primary text-black">
            Track Your Parcel
          </button>
          <button className="btn bg-black text-white rounded-full">
            {" "}
            <FaLongArrowAltRight className="rotate-300" />
          </button>
          <button className="btn">Be A Rider</button>
        </div>
      </div>
      <div className="relative">
        <img src={bannerImg2} />
        <div className="absolute top-5/6 left-10 -translate-y-1/2 flex gap-5 z-50">
          <button className="btn btn-primary text-black">
            Track Your Parcel
          </button>
          <button className="btn bg-black text-white rounded-full">
            {" "}
            <FaLongArrowAltRight className="rotate-300" />
          </button>
          <button className="btn">Be A Rider</button>
        </div>
      </div>
      <div className="relative">
        <img src={bannerImg3} />
        <div className="absolute top-5/6 left-10 -translate-y-1/2 flex gap-5 z-50">
          <button className="btn btn-primary text-black">
            Track Your Parcel
          </button>
          <button className="btn bg-black text-white rounded-full">
            {" "}
            <FaLongArrowAltRight className="rotate-300" />
          </button>
          <button className="btn">Be A Rider</button>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
