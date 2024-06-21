import React from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "../../assets/images/notfound.png";
import MetaData from "../metaData/MetaData";

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <MetaData title="Page not found" />
      <div className="font-sans flex flex-col justify-center items-center min-h-screen">
        <img
          className="w-1/2 md:w-1/4 mb-8"
          src={NotFound}
          alt="Page Not Found"
        />
        <h1 className="text-4xl font-bold mb-8">Page Not Found</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white  py-2 px-4 rounded"
          onClick={handleClick}
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
