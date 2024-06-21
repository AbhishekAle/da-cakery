import React, { useEffect } from "react";
import AddressCard from "./AddressCard";
import { useDispatch, useSelector } from "react-redux";
import {
  allShippingDetails,
  clearError,
} from "../../../redux/features/orderSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/layout/loader/Loader";

const GetShippingInfo = ({ addDetails }) => {
  const { shippings, loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(allShippingDetails());
  }, [dispatch, error]);

  return (
    <>
      <div className=" w-full max-w-lg mx-auto h-[400px] overflow-y-auto">
        <span className="text-gray-500 my-2">
          Choose your address and click sent for confirmation:
        </span>
        {loading ? (
          <Loader />
        ) : (
          <>
            {shippings &&
              shippings.map((address, index) => (
                <AddressCard key={index} address={address} />
              ))}
          </>
        )}

        {/* Float action button */}
        <div className="fixed bottom-4 right-4">
          <button
            onClick={addDetails}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
          >
            Add Address
          </button>
        </div>
      </div>
    </>
  );
};

export default GetShippingInfo;
