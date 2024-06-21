import React from "react";
import PaymentPage from "../../paymentPage/PaymentPage";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { DataAnniversary } from "./AnniversaryData";

const AnniversaryProducts = () => {
  return (
    <>
      <div className="bg-gray-100">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto max-w-7xl"
          style={{ padding: "20px" }}
        >
          {DataAnniversary &&
            DataAnniversary.map((item) => (
              <div
                key={item.id}
                className="rounded-md overflow-hidden shadow-md flex flex-col items-center hover:shadow-lg"
              >
                <Link to={item.path}>
                  <div className="relative">
                    <img
                      src={item.image}
                      alt="seller img"
                      className="w-full object-cover object-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    />
                  </div>
                  <div className="w-full px-4 pt-4">
                    <span
                      className="font-bold text-lg text-gray-900 hover:text-red-500"
                      style={{
                        fontSize: "18.75px",
                        fontFamily: "Nunito",
                        display: "block",
                        maxHeight: "3rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="text-red-500 text-sm font-bold block"
                      style={{ fontSize: "14px", fontFamily: "Nunito" }}
                    >
                      Rs.{item.price}
                    </span>
                    <div className="text-right">
                      <span
                        className="text-gray-400 text-xs font-medium"
                        style={{ fontSize: "12px", fontFamily: "Nunito" }}
                      >
                        {item.ratings}
                        <FaStar className="text-yellow-400 inline-block" />
                      </span>
                      <br />
                      <span
                        className="text-gray-400 text-xs font-medium"
                        style={{ fontSize: "12px", fontFamily: "Nunito" }}
                      >
                        {item.reviews} reviews
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-8">
        <PaymentPage />
      </div>
    </>
  );
};

export default AnniversaryProducts;
