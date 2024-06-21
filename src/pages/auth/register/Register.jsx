import React, { useEffect, useState } from "react";
import MetaData from "../../metaData/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../redux/features/authSlice";
import { clearError } from "../../../redux/features/authSlice";
import Spinner from "../../../components/layout/spinner/Spinner";
import SubHeader from "../../../components/header/subHeader/SubHeader";
import RegisterImg from "../../../assets/images/Register.png";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPromotionsChecked, setIsPromotionsChecked] = useState(false);
  const [registerError, setRegisterError] = useState({});
  const [registerValue, setRegisterValue] = useState({
    name: "",
    email: "",
    phone_No: "",
    password: "",
    password2: "",
  });

  const { name, email, phone_No, password, password2 } = registerValue;
  const validatedForm = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const mobileRegex = /^[0-9]+$/;
    let newErrors = {};
    if (!name) {
      newErrors.name = "name is required!";
    }
    if (!phone_No) {
      newErrors.phone_No = "phone_No is required!";
    } else if (!mobileRegex.test(phone_No)) {
      newErrors.phone_No = "Mobile number should contain only numbers!";
    } else if (phone_No.length !== 10) {
      newErrors.phone_No = "phone_No must be 10 digit!";
    }
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
    if (!password2) {
      newErrors.password2 = "confirmPassword is required!";
    } else if (password2.length < 8) {
      newErrors.password2 = "confirm password must be 8 characters long!";
    }
    if (password !== password2) {
      newErrors.password2 = "password do not match!";
    }

    setRegisterError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setRegisterValue({ ...registerValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatedForm()) {
      dispatch(register({ registerValue, navigate, toast }));
    } else {
      return toast.error("Invalid input!");
    }
  };

  const handlePromotionsCheckboxChange = () => {
    setIsPromotionsChecked(!isPromotionsChecked);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);
  return (
    <>
      <MetaData title="register" />
      <SubHeader />
      <div className="font-sans min-h-screen flex flex-col sm:flex-row justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:w-1/2 sm:pl-6">
          {/* Add your related UI image here */}
          <img
            src={RegisterImg}
            alt="register UI Image"
            className="w-full h-auto"
          />
        </div>
        <div className="sm:w-1/2">
          {/* Your registration form code */}
          {/* ... */}
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-xl font-bold text-gray-700">
              Create a new account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              <Link to="/" className="text-sm">
                Create your account to easily place orders and keep track of
                them.
              </Link>
            </p>
            <div className="bg-[#fff] py-4 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm">
                  <div>
                    <label htmlFor="full-name" className="block mb-1">
                      Full name*
                    </label>
                    <input
                      id="full-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Full Name"
                      value={name}
                      onChange={handleChange}
                      className="appearance-none rounded-s relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm"
                    />
                    {registerError.name && (
                      <span className="text-red-600">{registerError.name}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email">Email address*</label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Email address"
                      onChange={handleChange}
                      value={email}
                      className="appearance-none rounded-s relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm mt-2"
                    />
                    {registerError.email && (
                      <span className="text-red-600">
                        {registerError.email}
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-1">
                      Phone number*
                    </label>
                    <div className="flex">
                      <select
                        id="country-code"
                        name="country-code"
                        defaultValue="+977"
                        className="appearance-none rounded-sm relative w-1/4 border-t border-b border-l border-gray-300 px-3 py-2 bg-gray-100 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm"
                      >
                        <option value="+977">+977</option>
                      </select>
                      <input
                        id="phone"
                        name="phone_No"
                        type="number"
                        placeholder="Phone number"
                        onChange={handleChange}
                        value={phone_No}
                        className="appearance-none rounded-sm relative w-3/4 border border-gray-300 px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>
                    {registerError.phone_No && (
                      <span className="text-red-600">
                        {registerError.phone_No}
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password">Password*</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={password}
                      className="appearance-none rounded-s relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm mt-2"
                    />
                    {registerError.password && (
                      <span className="text-red-600">
                        {registerError.password}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password">Confirm Password*</label>
                    <input
                      id="password"
                      name="password2"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      value={password2}
                      className="appearance-none rounded-s relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm mt-2"
                    />
                    {registerError.password2 && (
                      <span className="text-red-600">
                        {registerError.password2}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-3">
                    <input
                      id="promotions-checkbox"
                      name="promotions-checkbox"
                      type="checkbox"
                      className="rounded border-gray-300 text-red-500 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 mr-2"
                      checked={isPromotionsChecked}
                      onChange={handlePromotionsCheckboxChange}
                    />
                    <label htmlFor="promotions-checkbox">
                      I want to accept promotional emails and offers.
                    </label>
                  </div>
                  <div className="flex items-center justify-center mt-6">
                    <button
                      type="submit"
                      className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white ${
                        isPromotionsChecked
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-gray-400 cursor-not-allowed"
                      } focus:outline-none`}
                      disabled={!isPromotionsChecked}
                    >
                      {loading && <Spinner />}Create Account
                    </button>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-gray-500">
                      Already have an account?
                      <Link
                        to="/login"
                        className="font-sm text-blue-700 hover:text-blue-700"
                      >
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

// <div className="font-sans min-h-screen flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
//   <div className="sm:mx-auto sm:w-full sm:max-w-md">
//     <h2 className="mt-6 text-xl font-bold text-gray-700">
//       Create a new account
//     </h2>
//     <p className="mt-2 text-sm text-gray-600">
//       <Link to="/" className="text-sm">
//         Create your account to easily place orders and keep track of them.
//       </Link>
//     </p>
//     <div className="bg-[#fff] py-4 px-4 shadow sm:rounded-lg sm:px-10">
//       <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//         <div className="rounded-md shadow-sm">
//           <div>
//             <label htmlFor="full-name" className="block mb-1">
//               Full name*
//             </label>
//             <input
//               id="full-name"
//               name="name"
//               type="text"
//               autoComplete="name"
//               placeholder="Full Name"
//               value={name}
//               onChange={handleChange}
//               className="appearance-none rounded-s relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm"
//             />
//             {registerError.name && (
//               <span className="text-red-600">{registerError.name}</span>
//             )}
//           </div>
//           <div>
//             <label htmlFor="email">Email address*</label>
//             <input
//               id="email"
//               name="email"
//               type="text"
//               placeholder="Email address"
//               onChange={handleChange}
//               value={email}
//               className="appearance-none rounded-s relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm mt-2"
//             />
//             {registerError.email && (
//               <span className="text-red-600">{registerError.email}</span>
//             )}
//           </div>
//           <div>
//             <label htmlFor="phone" className="block mb-1">
//               Phone number*
//             </label>
//             <div className="flex">
//               <select
//                 id="country-code"
//                 name="country-code"
//                 defaultValue="+977"
//                 className="appearance-none rounded-sm relative w-1/4 border-t border-b border-l border-gray-300 px-3 py-2 bg-gray-100 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm"
//               >
//                 <option value="+977">+977</option>
//               </select>
//               <input
//                 id="phone"
//                 name="phone_No"
//                 type="number"
//                 placeholder="Phone number"
//                 onChange={handleChange}
//                 value={phone_No}
//                 className="appearance-none rounded-sm relative w-3/4 border border-gray-300 px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm"
//               />
//             </div>
//             {registerError.phone_No && (
//               <span className="text-red-600">{registerError.phone_No}</span>
//             )}
//           </div>
//           <div>
//             <label htmlFor="password">Password*</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="new-password"
//               placeholder="Password"
//               onChange={handleChange}
//               value={password}
//               className="appearance-none rounded-s relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm mt-2"
//             />
//             {registerError.password && (
//               <span className="text-red-600">{registerError.password}</span>
//             )}
//           </div>

//           <div>
//             <label htmlFor="password">Confirm Password*</label>
//             <input
//               id="password"
//               name="password2"
//               type="password"
//               autoComplete="new-password"
//               placeholder="Confirm Password"
//               onChange={handleChange}
//               value={password2}
//               className="appearance-none rounded-s relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200 focus:z-10 sm:text-sm mt-2"
//             />
//             {registerError.password2 && (
//               <span className="text-red-600">
//                 {registerError.password2}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center mt-3">
//             <input
//               id="promotions-checkbox"
//               name="promotions-checkbox"
//               type="checkbox"
//               className="rounded border-gray-300 text-red-500 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 mr-2"
//               checked={isPromotionsChecked}
//               onChange={handlePromotionsCheckboxChange}
//             />
//             <label htmlFor="promotions-checkbox">
//               I want to accept promotional emails and offers.
//             </label>
//           </div>
//           <div className="flex items-center justify-center mt-6">
//             <button
//               type="submit"
//               className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white ${
//                 isPromotionsChecked
//                   ? "bg-red-500 hover:bg-red-600"
//                   : "bg-gray-400 cursor-not-allowed"
//               } focus:outline-none`}
//               disabled={!isPromotionsChecked}
//             >
//               {loading && <Spinner />}Create Account
//             </button>
//           </div>
//           <div className="mt-3 text-center">
//             <p className="text-gray-500">
//               Already have an account?
//               <Link
//                 to="/login"
//                 className="font-sm text-blue-700 hover:text-blue-700"
//               >
//                 Log in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </form>
//     </div>
//   </div>
// </div>;
