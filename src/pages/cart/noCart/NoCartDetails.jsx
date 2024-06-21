import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";

const NoCartDetails = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center my-5">
        <RiShoppingCartLine size={60} className="text-gray-500 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">There are 0 items in your cart.</p>
        <Link
          to="/"
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    </>
  );
};

export default NoCartDetails;
