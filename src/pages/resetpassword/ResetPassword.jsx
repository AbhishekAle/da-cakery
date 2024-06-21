import React, { useEffect, useState } from "react";
import Spinner from "../../components/layout/spinner/Spinner";
import MetaData from "../metaData/MetaData";
import Forgot from "../../assets/images/Forgot.png";
import SubHeader from "../../components/header/subHeader/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError, passwordReset } from "../../redux/features/authSlice";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid, token } = useParams();

  const [resetValue, setResetValue] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { newPassword, confirmPassword } = resetValue;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setResetValue({ ...resetValue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword)
      return toast.error("Field must be filled!");
    dispatch(passwordReset({ uid, token, resetValue, navigate, toast }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);
  return (
    <>
      <MetaData title="reset password" />
      <SubHeader />
      <div className="container my-5">
        <div className="flex flex-col md:flex-row justify-center">
          <div className="md:w-6/12 mb-4 md:mb-0">
            <img
              src={Forgot}
              alt="Forgot Password"
              className="w-3/4 h-auto object-contain max-w-full max-h-full"
            />
          </div>
          <div className="md:w-6/12 flex flex-col justify-center">
            <h2 className="text-gray-700 text-2xl font-semibold">
              Reset your password?
            </h2>

            <form onSubmit={handleSubmit} className="">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-gray-700">
                  new Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter newPassword"
                  value={newPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full md:w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-yellow-200 sm:text-sm"
                />
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
                    placeholder="Enter confirm Password"
                    value={confirmPassword}
                    onChange={handleChange}
                    className="appearance-none block w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-yellow-200 sm:text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                {loading && <Spinner />}SAVE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
