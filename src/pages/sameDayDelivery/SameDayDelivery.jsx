import React from "react";
import OrderBanner from "../orderWedding/orderBanner/OrderBanner";
import SameDeliveryProducts from "./sameDeliveryProducts/SameDeliveryProducts";

const SameDayDelivery = () => {
  return (
    <>
      <div>
        <OrderBanner />
      </div>
      <div className="mt-8">
        <SameDeliveryProducts />
      </div>
    </>
  );
};

export default SameDayDelivery;
