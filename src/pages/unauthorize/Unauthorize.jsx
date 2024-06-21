import React from "react";
import MetaData from "../metaData/MetaData";
import UnauthorizeImg from "../../assets/images/unauthorize.png";

const Unauthorize = () => {
  return (
    <div>
      <MetaData title="oho-unauthorize" />
      <div className="font-sans flex flex-col justify-center items-center min-h-screen">
        <img
          className="w-1/2 md:w-1/3 lg:w-1/4 h-auto mb-4 md:mb-8"
          src={UnauthorizeImg}
          alt="Unauthorized"
        />
        <p className="text-xl text-gray-600">Unauthorized</p>
      </div>
    </div>
  );
};

export default Unauthorize;
