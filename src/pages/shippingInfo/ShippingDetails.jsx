import React, { useEffect, useState } from "react";
import MetaData from "../metaData/MetaData";
import CheckOutSteps from "../../components/checkOutSteps/CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import SubHeader from "../../components/header/subHeader/SubHeader";
import {
  RiCalendarLine,
  RiMapPinLine,
  RiPhoneLine,
  RiTimeLine,
  RiUserLine,
  RiUserSharedLine,
} from "react-icons/ri";

import Loader from "../../components/layout/loader/Loader";
import {
  clearError,
  ordersDistrict,
  shippingAdd,
} from "../../redux/features/orderSlice";
import GetShippingInfo from "./getShippingInfo/GetShippingInfo";

const Pseudonym = [
  "Home",
  "Office",
  "Friend",
  "Cousin",
  "School",
  "College",
  "Cafe",
  "Others",
];

const ShippingDetails = () => {
  const { error, loading, districts } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [altPhoneNo, setAltPhoneNo] = useState("");
  const [alies, setAlies] = useState("");
  const [district, setDistrict] = useState("");
  const [location, setLocation] = useState("");
  const [landMark, setLandmark] = useState("");

  const [showMore, setShowMore] = useState(true);

  const [shippingError, setShippingError] = useState({});

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const validatedForm = () => {
    let newErrors = {};

    // Trim and check if the fields are empty or contain only whitespace
    if (!fullName || fullName.trim() === "") {
      newErrors.fullName = "Full Name is required!";
    }
    if (!phoneNo || phoneNo.trim() === "") {
      newErrors.phoneNo = "Mobile Number is required!";
    } else if (phoneNo.length !== 10) {
      newErrors.phoneNo = "Phone number must be a 10-digit number!";
    }

    if (!altPhoneNo || altPhoneNo.trim() === "") {
      newErrors.altPhoneNo = "Alternate Mobile Number is required!";
    } else if (altPhoneNo.length !== 10) {
      newErrors.altPhoneNo =
        "Alternative Phone number must be a 10-digit number!";
    }

    if (!alies || alies.trim() === "") {
      newErrors.alies = "Alias is required!";
    }
    if (!district || district.trim() === "") {
      newErrors.district = "District is required!";
    }
    if (!location || location.trim() === "") {
      newErrors.location = "Location is required!";
    }
    if (!landMark || landMark.trim() === "") {
      newErrors.landMark = "Landmark is required!";
    }

    setShippingError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addDetails = () => {
    setShowMore(false);
  };

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (validatedForm()) {
      const shippingValue = {
        user: user.name,
        fullName,
        phoneNo,
        altPhoneNo,
        alies,
        district,
        location,
        landMark,
      };
      dispatch(shippingAdd({ shippingValue, toast }));
      setShowMore(true);
    } else {
      return toast.warning("Invalid Input!");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(ordersDistrict());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Shipping Details" />
      <SubHeader />
      <CheckOutSteps activeStep={0} />

      {showMore ? (
        <GetShippingInfo addDetails={addDetails} />
      ) : (
        <>
          <div className="min-h-screen flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-xl font-bold text-gray-700">
                Shipping Details
              </h2>

              <form className=" my-4" onSubmit={shippingSubmit}>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <RiUserLine className="inline-block mr-2" />
                      FullName
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="bg-gray-50 border border-gray-300 text-gray-00 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none px-4"
                      placeholder="e.g., John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {shippingError && (
                      <span className="text-red-600">
                        {shippingError.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <RiPhoneLine className="inline-block mr-2" />
                      Phone No
                    </label>
                    <input
                      type="number"
                      id="phoneNo"
                      className="bg-gray-50 border border-gray-300 text-gray-00 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none px-4"
                      placeholder="e.g., +1 123-456-7890"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                    {shippingError && (
                      <span className="text-red-600">
                        {shippingError.phoneNo}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="alterNativePhoneNo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <RiUserSharedLine className="inline-block mr-2" />
                      AlterNative PhoneNo
                    </label>
                    <input
                      type="number"
                      id="alterNativePhoneNo"
                      className="bg-gray-50 border border-gray-300 text-gray-00 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none px-4"
                      placeholder="e.g., +1 987-654-3210"
                      value={altPhoneNo}
                      onChange={(e) => setAltPhoneNo(e.target.value)}
                    />
                    {shippingError && (
                      <span className="text-red-600">
                        {shippingError.altPhoneNo}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="alias"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Alias
                    </label>
                    <select
                      id="alias"
                      className="bg-gray-50 border border-gray-300 px-4 text-gray-700 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                      value={alies}
                      onChange={(e) => setAlies(e.target.value)}
                    >
                      <option value="">Select alias</option>
                      {Pseudonym.map((aliasOption) => (
                        <option key={aliasOption} value={aliasOption}>
                          {aliasOption}
                        </option>
                      ))}
                    </select>
                    {shippingError && (
                      <span className="text-red-600">
                        {shippingError.alies}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="district"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      District
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 px-4 text-gray-700 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    >
                      <option value="">Select district</option>
                      {districts &&
                        districts.map((districtOption) => (
                          <option
                            key={districtOption.id}
                            value={districtOption.district_name}
                          >
                            {districtOption.district_name}
                          </option>
                        ))}
                    </select>
                    {shippingError && (
                      <span className="text-red-600">
                        {shippingError.district}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      <RiMapPinLine className="inline-block mr-2" />
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="bg-gray-50 border border-gray-300 px-4 text-gray-00 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                      placeholder="e.g., New York"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    {shippingError && (
                      <span className="text-red-600">
                        {shippingError.location}
                      </span>
                    )}
                  </div>

                  {/* <div>
                <label
                  htmlFor="selectedDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <RiCalendarLine className="inline-block mr-2" />
                  Select Date
                </label>
                <DatePicker
                  id="selectedDate"
                  className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-00 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none px-4"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date"
                  required
                />
              </div> */}

                  {/* <div>
                <label
                  htmlFor="selectedTime"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <RiTimeLine className="inline-block mr-2" />
                  Select Time
                </label>
                <DatePicker
                  id="selectedTime"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-00 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none px-4"
                  selected={selectedTime}
                  onChange={(time) => setSelectedTime(time)}
                  placeholderText="Select time"
                  required
                />
              </div> */}
                </div>
                <div>
                  <label
                    htmlFor="landMark"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <RiMapPinLine className="inline-block mr-2" />
                    Nearest Landmark
                  </label>
                  <input
                    type="text"
                    id="landMark"
                    className="bg-gray-50 border border-gray-300 text-gray-00 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none px-4"
                    placeholder="e.g., Central Park"
                    value={landMark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                  {shippingError && (
                    <span className="text-red-600">
                      {shippingError.landMark}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center mt-6">
                  <button
                    type="submit"
                    className={`w-full bg-red-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm cursor-pointer focus:outline-none`}
                  >
                    {loading && <Loader />}Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ShippingDetails;
