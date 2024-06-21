import React from "react";
import Banner from "../../../assets/images/BannerImg.png";

const OrderBanner = () => {
  return (
    <div className="relative">
      <img src={Banner} alt="Banner" className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start p-4 md:p-8 bg-black bg-opacity-50">
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-cursive">
          Any type of cake you desire,
          <br />
          We deliver
        </h1>
      </div>
    </div>
  );
};

export default OrderBanner;
