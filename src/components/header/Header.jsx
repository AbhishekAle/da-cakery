import React, { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaChartBar,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
  FaShoppingBasket,
  FaHeart,
} from "react-icons/fa";
import OhoLogo from "../../assets/images/OhoCake.png";
import { NavLink, useNavigate } from "react-router-dom";
import CakesDropDown from "./cakesDropdown/CakesDropDown";
import OccasionsDropDown from "./occasionsDropdown/OccasionsDropDown";
import { Tooltip } from "react-tippy";
import {
  HiHome,
  HiMenu,
  HiShoppingCart,
  HiUserCircle,
  HiViewGrid,
  HiX,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import decode from "jwt-decode";
import Cookies from "js-cookie";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  let totalItemsInCart = 0;

  for (const cartItem of cartItems) {
    totalItemsInCart += cartItem.items.length;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const userToken = localStorage.getItem("token");
  const userToken = Cookies.get("token");

  useEffect(() => {
    if (userToken) {
      const decodedData = decode(userToken);
      const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Convert to seconds

      if (decodedData.exp < currentTimeInSeconds) {
        // Compare with seconds
        dispatch(setLogout());
        Cookies.remove("token"); // Clear the expired token from cookies
        navigate("/login");
        toast.error("Your session has expired. Please login again.");
      }
    }
  }, [dispatch, navigate, userToken]);
  // useEffect(() => {
  //   console.log("userToken:", userToken);
  //   if (userToken) {
  //     const decodedData = decode(userToken);
  //     console.log("decodedData:", decodedData);
  //     if (decodedData.exp * 1000 < new Date().getTime()) {
  //       dispatch(setLogout());

  //       navigate("/login");
  //       toast.error("Your session has expired. Please login again.");
  //     }
  //   }
  // }, [dispatch, navigate, userToken]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
    toast.success("Logout successfully!");
  };
  const [showCakeMenu, setShowCakeMenu] = useState(false);
  const [showOccasionMenu, setShowOccasionMenu] = useState(false);

  const toggleOccasionMenu = () => {
    setShowOccasionMenu(!showOccasionMenu);
  };

  const toggleCakeMenu = () => {
    setShowCakeMenu(!showCakeMenu);
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  // useMediaQuery returns true if the screen size is less than 960px

  return (
    <>
      <header className="font-sans flex flex-wrap items-center justify-between px-4 py-3 bg-white shadow-md">
        <div className="flex items-center">
          <div className="mr-4">
            <NavLink to="/" className="flex items-center">
              <img
                className="w-16 sm:w-24 md:w-32"
                src={OhoLogo}
                alt="Oho Logo"
              />
              <span
                className="text-lg font-semibold text-gray-900 ml-2 relative hidden md:block"
                style={{ color: "#031927", fontSize: "14px" }}
                onMouseEnter={toggleCakeMenu}
                onMouseLeave={toggleCakeMenu}
              >
                CAKES
                <div
                  className="absolute bottom-0 left-0 bg-red-500 h-0.5 w-full"
                  style={{
                    transform: showCakeMenu ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
                {showCakeMenu && <CakesDropDown />}
              </span>
            </NavLink>
          </div>
          <div className="mr-4">
            <NavLink to="/" className="flex items-center">
              <span
                className="text-lg font-semibold text-gray-900 ml-2 relative hidden md:block"
                style={{ color: "#031927", fontSize: "14px" }}
                onMouseEnter={toggleOccasionMenu}
                onMouseLeave={toggleOccasionMenu}
              >
                OCCASIONS
                <div
                  className="absolute bottom-0 left-0 bg-red-500 h-0.5 w-full"
                  style={{
                    transform: showOccasionMenu ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
                {showOccasionMenu && <OccasionsDropDown />}
              </span>
            </NavLink>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-900 focus:outline-none"
          >
            <HiMenu className="h-6 w-6" />
          </button>
          <nav
            className={`${
              showMenu ? "block" : "hidden"
            } lg:block lg:items-center w-full lg:w-auto`}
          >
            <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
              <li>
                <NavLink
                  to="/about"
                  className="block lg:inline-block lg:mt-0 mr-10"
                >
                  <div className="mr-4 text-black-200 rounded-md border border-red-600 font-semibold p-2">
                    <span className="mr-2">Call us:</span>
                    <span>015911306</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <Tooltip
                  title={
                    isAuthenticated
                      ? totalItemsInCart > 0
                        ? `View Cart (${totalItemsInCart} items)`
                        : "Cart is empty"
                      : "There are 0 items in cart"
                  }
                  position="bottom"
                  trigger="mouseenter"
                >
                  {isAuthenticated ? (
                    <NavLink
                      to="/cart/details"
                      className="block lg:inline-block lg:mt-0 mr-10 relative"
                    >
                      <FaShoppingCart size={20} className="text-red-500" />
                      {totalItemsInCart > 0 && (
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 rounded-full bg-red-500 text-white w-4 h-4 flex items-center justify-center z-10">
                          {totalItemsInCart}
                        </div>
                      )}
                    </NavLink>
                  ) : (
                    <div className="block lg:inline-block lg:mt-0 mr-10 relative">
                      <FaShoppingCart size={20} className="text-red-500" />
                    </div>
                  )}
                </Tooltip>
              </li>

              <div className="relative">
                {isAuthenticated ? (
                  <>
                    <button
                      className="flex items-center text-red-600 py-2 px-4"
                      onClick={toggleDropdown}
                    >
                      <div className="flex items-center">
                        {user?.avatar_url ? (
                          <img
                            src={user?.avatar_url}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full mr-2"
                          />
                        ) : (
                          <FaUserCircle className="w-8 h-8 text-gray-500 mr-2" />
                        )}
                        <span>{user?.name}</span>
                      </div>
                      <FaAngleDown className="ml-2" />
                    </button>

                    {isOpen && (
                      <ul
                        className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-300 rounded shadow"
                        style={{ zIndex: "9999" }}
                      >
                        <li className="my-1">
                          <NavLink
                            to="/profile/information"
                            className="px-4 py-2 text-gray-800 hover:text-red-600"
                          >
                            <FaUser className="inline-block mr-2" /> Profile
                          </NavLink>
                        </li>
                        {user?.is_admin && (
                          <li className="my-1">
                            <NavLink
                              to="/admin/dashboard"
                              className="px-4 py-2 text-gray-800 hover:text-red-600"
                            >
                              <FaChartBar className="inline-block mr-2" />
                              Dashboard
                            </NavLink>
                          </li>
                        )}
                        <li className="my-1">
                          <NavLink
                            to="/my/orders"
                            className="px-4 py-2 text-gray-800 hover:text-red-600"
                          >
                            <FaShoppingBasket className="inline-block mr-2" />
                            My Orders
                          </NavLink>
                        </li>

                        <li className="my-1">
                          <NavLink
                            to="/wishlist"
                            className="px-4 py-2 text-gray-800 hover:text-red-600"
                          >
                            <FaHeart className="inline-block mr-2" />
                            My WishList
                          </NavLink>
                        </li>
                        {user && user.is_user && (
                          <li className="my-1">
                            <NavLink
                              to="/cart/details"
                              className="px-4 py-2 text-gray-800 hover:text-red-600"
                            >
                              <FaShoppingCart className="inline-block mr-2" />{" "}
                              My Cart
                            </NavLink>
                          </li>
                        )}
                        <li>
                          <button
                            className="px-4 py-2 text-gray-800"
                            onClick={handleLogout}
                          >
                            <FaSignOutAlt className="inline-block mr-2" />
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </>
                ) : (
                  <li>
                    <NavLink to="/login">
                      <button className="flex items-center text-red-600 py-2 px-4">
                        <FaUser className="mr-2" />
                        LOGIN/SIGNUP
                      </button>
                    </NavLink>
                  </li>
                )}
              </div>
            </ul>
          </nav>
        </div>
      </header>

      {/*for mobile bottom responsiveness*/}
      <div className="fixed bottom-0 left-0 right-0 bg-white z-50 lg:hidden">
        <div className="flex justify-between">
          <NavLink
            to="/"
            className="flex flex-col items-center justify-center p-2"
          >
            <HiHome className="text-xl" />
            <span className="text-sm">Home</span>
          </NavLink>
          <NavLink
            to="/categories"
            className="flex flex-col items-center justify-center p-2"
          >
            <HiViewGrid className="text-xl" />
            <span className="text-sm">Categories</span>
          </NavLink>
          {isAuthenticated ? (
            <NavLink
              to="/cart/details"
              className="flex flex-col items-center justify-center p-2"
            >
              <HiShoppingCart className="text-xl" />
              {totalItemsInCart.length > 0 && (
                <div className="absolute top-0 -mt-1 -mr-1 rounded-full bg-red-500 text-white w-4 h-4 flex items-center justify-center z-10">
                  {totalItemsInCart}
                </div>
              )}
              <span className="text-sm">Cart</span>
            </NavLink>
          ) : (
            <NavLink
              to="/cart/details"
              className="flex flex-col items-center justify-center p-2"
            >
              <HiShoppingCart className="text-xl" />

              <div className="absolute top-0 -mt-1 -mr-1 rounded-full bg-red-500 text-white w-4 h-4 flex items-center justify-center z-10">
                0
              </div>

              <span className="text-sm">Cart</span>
            </NavLink>
          )}
          {isAuthenticated ? (
            <NavLink
              to="/profile/information"
              className="flex flex-col items-center justify-center p-2"
            >
              <img
                src={user?.avatar_url}
                alt={user?.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm">Profile</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="flex flex-col items-center justify-center p-2"
            >
              <HiUserCircle className="text-xl" />
              <span className="text-sm">Profile</span>
            </NavLink>
          )}
        </div>
      </div>
      {/*for off canvas*/}
      <div
        className={`fixed top-0 right-0 bottom-0 left-0 bg-white z-50 transition-all duration-300 transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 bg-red-500">
          <h2 className="text-white font-bold text-lg">Menu</h2>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none lg:hidden"
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>
        <nav className="py-4">
          <ul className="text-gray-700">
            <li className="px-4 py-2 border-b border-gray-200">
              <NavLink
                to="/about"
                className="block lg:inline-block lg:mt-0 mr-10"
              >
                <div
                  className="mr-4 text-black-200 rounded-md border border-red-600 font-semibold p-2"
                  style={{ width: "200px" }}
                >
                  <span className="mr-2">Call us:</span>
                  <span>015911306</span>
                </div>
              </NavLink>
            </li>

            <li className="px-4 py-2 border-b border-gray-200">
              <NavLink to="/">
                <span
                  style={{ color: "#031927", fontSize: "14px" }}
                  onMouseEnter={toggleCakeMenu}
                  onMouseLeave={toggleCakeMenu}
                >
                  CAKES
                  <div
                    className="absolute bottom-0 left-0 bg-red-500 h-0.5 w-full"
                    style={{
                      transform: showCakeMenu ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                  {showCakeMenu && <CakesDropDown />}
                </span>
              </NavLink>
            </li>

            <li className="px-4 py-2 border-b border-gray-200">
              <NavLink to="/">
                <span
                  style={{ color: "#031927", fontSize: "14px" }}
                  onMouseEnter={toggleOccasionMenu}
                  onMouseLeave={toggleOccasionMenu}
                >
                  OCCASIONS
                  <div
                    className="absolute bottom-0 left-0 bg-red-500 h-0.5 w-full"
                    style={{
                      transform: showOccasionMenu ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                  {showOccasionMenu && <OccasionsDropDown />}
                </span>
              </NavLink>
            </li>

            {isAuthenticated ? (
              <>
                <li className="px-4 py-2 border-b border-gray-200">
                  <NavLink to="/my/orders" onClick={toggleMenu}>
                    <FaShoppingBasket className="inline-block mr-2" />
                    My Orders
                  </NavLink>
                </li>
                <li className="px-4 py-2 border-b border-gray-200">
                  <NavLink to="/wishlist" onClick={toggleMenu}>
                    <FaHeart className="inline-block mr-2" />
                    My WishList
                  </NavLink>
                </li>
                <li className="px-4 py-2 border-b border-gray-200">
                  <NavLink to="/cart/details" onClick={toggleMenu}>
                    <FaShoppingCart className="inline-block mr-2" />
                    My Cart
                  </NavLink>
                </li>
                <li>
                  <button
                    className="px-4 py-2 text-gray-800"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    <FaSignOutAlt className="inline-block mr-2" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              ""
            )}

            {/* add more nav links here */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
