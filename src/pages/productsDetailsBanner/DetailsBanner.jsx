import React from "react";
import OhoDetails from "../../assets/images/OhoDetails.jpg";

const DetailsBanner = () => {
  return (
    <>
      <div className="relative">
        <img
          src={OhoDetails}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start p-4 md:p-8 bg-black bg-opacity-40">
          <h1 className="text-white text-base md:text-xl lg:text-2xl">
            Oho! Cake
            <br />
            Aloknagar, Kathmandu
            <br />
            Deliver to: Bhaktapur, Kathmandu, Lalitpur
          </h1>
        </div>
      </div>
    </>
  );
};

export default DetailsBanner;
