import React from "react";
import { RiCheckLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import MetaData from "../metaData/MetaData";

const OrderSuccess = () => {
  return (
    <>
      <MetaData title="payment success" />
      <div className="font-sans marker:container mx-auto px-8 py-8 text-center">
        <RiCheckLine className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-4">
          Your order has been placed successfully!
        </h2>
        <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
        <Link
          to="/my/orders"
          className="bg-red-600 text-white rounded-md px-4 py-2"
        >
          View Orders
        </Link>
      </div>
    </>
  );
};

export default OrderSuccess;
