import React from "react";
import OrderBanner from "../orderWedding/orderBanner/OrderBanner";
import AnniversaryProducts from "./anniversaryProducts/anniversaryProducts";

const AnniversaryCake = () => {
  return (
    <>
      <div>
        <OrderBanner />
      </div>
      <div className="mt-8">
        <AnniversaryProducts />
      </div>
    </>
  );
};

export default AnniversaryCake;
