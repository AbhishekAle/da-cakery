import React from "react";
import { Link } from "react-router-dom";
import { dataPayment } from "./PaymentData";

const PaymentPage = () => {
  return (
    <div className="bg-white-200 py-8">
      <h4
        className="text-center text-xl font-bold uppercase"
        style={{ fontFamily: "Nunito", marginTop: "-3rem" }}
      >
        WE ACCEPT
      </h4>
      <div
        className="flex flex-wrap justify-center items-center"
        style={{ marginBottom: "30px" }}
      >
        {dataPayment &&
          dataPayment.map((item) => (
            <div key={item.id} className="mx-2 sm:mx-3 md:mx-4 lg:mx-6 xl:mx-8">
              <Link to={item.path}>
                <img
                  src={item.image}
                  alt="payment img"
                  className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-auto"
                  style={{ maxWidth: "100%" }}
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PaymentPage;
