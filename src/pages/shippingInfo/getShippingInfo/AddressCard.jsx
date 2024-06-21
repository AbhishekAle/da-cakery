import React from "react";
import { AiOutlineSend } from "react-icons/ai"; // Import the FiEdit2 icon from react-icons/fi
import { useNavigate } from "react-router-dom";

const AddressCard = ({ address }) => {
  const navigate = useNavigate();

  const handleSend = () => {
    navigate("/confirm/order", { state: { address } });
  };
  return (
    <div className="bg-[#fff] shadow-md rounded p-4 mb-4 flex justify-between">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Full Name : {address.fullName}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contact : {address.phoneNo}, {address.altPhoneNo}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Alias : {address.alies}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Address : {address.location}, {address.district}, {address.landMark}
        </label>
      </div>
      <AiOutlineSend
        onClick={handleSend}
        size={24}
        className="text-gray-600 cursor-pointer"
      />
    </div>
  );
};

export default AddressCard;
