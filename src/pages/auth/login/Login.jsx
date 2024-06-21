import React, { useEffect, useState } from "react";
import MetaData from "../../metaData/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearError, login } from "../../../redux/features/authSlice";
import Spinner from "../../../components/layout/spinner/Spinner";
import SubHeader from "../../../components/header/subHeader/SubHeader";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import decode from "jwt-decode";
import LoginImg from "../../../assets/images/login.png";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({});
  const { email, password } = loginValue;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validatedForm = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    let newErrors = {};
    if (!email) {
      newErrors.email = "Email is required!";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format!";
    }

    if (!password) {
      newErrors.password = "password is required!";
    } else if (password.length < 8) {
      newErrors.password = "password must be 8 characters long!";
    }

    setLoginError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatedForm()) {
      dispatch(login({ loginValue, navigate, toast }));
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
      <MetaData title="Login Page" />
      <SubHeader />
      <div className="min-h-screen flex flex-col sm:flex-row justify-center py-12 sm:px-6 lg:px-8 mt-[-2rem]">
        <div className="w-full sm:w-1/2 sm:pl-6">
          {/* Add your login-related image here */}
          <img src={LoginImg} alt="Login Image" className="w-full h-auto" />
        </div>

        <div className="sm:w-1/2">
          {/* Your login form code */}
          {/* ... */}
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-xl px-4 font-bold text-gray-700">
              Login to your account
            </h2>
            <p className="mt-2 text-sm px-4 text-gray-600">
              Enter your username and password to login to your account
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address*
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Email address"
                      value={email}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-200 sm:text-sm"
                    />
                    {loginError && (
                      <span className="text-red-600">{loginError.email}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password*
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
                    />
                    {loginError && (
                      <span className="text-red-600">
                        {loginError.password}
                      </span>
                    )}

                    <span
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to="/forgot/password"
                      className="font-sm text-blue-700 hover:text-blue-700"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none "
                  >
                    {loading && <Spinner />}Login
                  </button>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <div className="border-b border-gray-400 w-1/4"></div>
                  <div className="mx-4">OR LOGIN WITH</div>
                  <div className="border-b border-gray-400 w-1/4"></div>
                </div>
                <div className="flex justify-center mt-4">
                  <button className="flex items-center justify-center bg-blue-900 text-white py-2 px-4 w-44 h-11 mr-4">
                    <FaFacebook className="mr-2" />
                    Facebook
                  </button>
                  <button className="flex items-center justify-center border bg-gray-200 text-gray py-2 px-4 w-44 h-11">
                    <GoogleOAuthProvider clientId="879560108594-9ojq304cn9l6ms9tbc3kfttqrahn629g.apps.googleusercontent.com">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          const details = decode(credentialResponse.credential);
                          console.log(details);
                          console.log(credentialResponse);
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                    </GoogleOAuthProvider>
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-500">
                    Don't have an account?
                    <Link
                      to="/register"
                      className="font-sm text-blue-700 hover:text-blue-700"
                    >
                      create a new account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
