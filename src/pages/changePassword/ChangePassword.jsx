import React, { useEffect, useState } from "react";
import MetaData from "../../pages/metaData/MetaData";
import Change from "../../assets/images/updatePassword.png";
import SubHeader from "../../components/header/subHeader/SubHeader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, clearError } from "../../redux/features/authSlice";
import Spinner from "../../components/layout/spinner/Spinner";

const ChangePassword = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changePasswordValue, setChangePasswordValue] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordChangeError, setPasswordChangeError] = useState({});

  const { oldPassword, newPassword, confirmPassword } = changePasswordValue;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setChangePasswordValue({ ...changePasswordValue, [name]: value });
  };

  const validatedForm = () => {
    let newErrors = {};
    if (!oldPassword) {
      newErrors.oldPassword = "oldPassword is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "newPassword is required";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "confirmPassword is required";
    }

    setPasswordChangeError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatedForm()) {
      dispatch(changePassword({ changePasswordValue, navigate, toast }));
    } else {
      return toast.error("Invalid input!");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="change password" />
      <SubHeader />
      <div className="border border-gray-300 rounded p-4">
        <div className=" flex flex-col md:flex-row justify-center md:justify-between gap-4">
          {/* Image column */}
          <div className="md:w-1/2 flex justify-center items-center">
            {/* Replace the image source and alt text with your own */}
            <img
              src={Change}
              alt="Change img"
              className="w-3/4 h-auto object-contain max-w-full max-h-full"
            />
          </div>

          {/* Form column */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl text-gray-700 mb-6">Change Password</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="oldPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  oldPassword*
                </label>
                <div className="mt-1">
                  <input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    placeholder="old Password"
                    value={oldPassword}
                    onChange={handleChange}
                    className="appearance-none block w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-200 sm:text-sm"
                  />
                  {passwordChangeError && (
                    <span className="text-red-600">
                      {passwordChangeError.oldPassword}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  new Password*
                </label>
                <div className="mt-1">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="new password"
                    value={newPassword}
                    onChange={handleChange}
                    className="appearance-none block w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-200 sm:text-sm"
                  />
                  {passwordChangeError && (
                    <span className="text-red-600">
                      {passwordChangeError.newPassword}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  confirm Password*
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="confirm Password"
                    value={confirmPassword}
                    onChange={handleChange}
                    className="appearance-none block w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-200 sm:text-sm"
                  />
                  {passwordChangeError && (
                    <span className="text-red-600">
                      {passwordChangeError.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white  py-2 px-4 rounded"
              >
                {loading && <Spinner />}Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
