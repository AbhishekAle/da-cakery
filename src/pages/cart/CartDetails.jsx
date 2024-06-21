import React, { useEffect, useState } from "react";
import {
  FaTrash,
  FaShoppingBasket,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../metaData/MetaData";
import SubHeader from "../../components/header/subHeader/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  ItemsDeleteCart,
  allItemsCart,
  clearErr,
  decrementItem,
  incrementItem,
} from "../../redux/features/cartSlice";
import { toast } from "react-toastify";
import Loader from "../../components/layout/loader/Loader";

const CartDetails = () => {
  const { cartItems, err, progressing } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (err) {
      toast.error(err);
      dispatch(clearErr());
    }
  }, [err, dispatch]);

  useEffect(() => {
    dispatch(allItemsCart());
  }, [dispatch]);

  const handleIncrement = (productSlug) => {
    const product = cartItems
      .flatMap((cart) => cart.items) // Flatten the items array
      .find((item) => item.product.prod_slug === productSlug);

    if (product && product.product.isInstock > product.quantity) {
      dispatch(incrementItem(productSlug));
    } else {
      toast.warning("Product is out of stock or quantity limit reached");
    }
  };

  const handleDecrement = (productSlug) => {
    dispatch(decrementItem(productSlug));
  };

  // const handleRemoveItem = (id) => {
  //   dispatch(ItemsDeleteCart({ id, toast }));
  // };

  const handleDeleteItem = (id) => {
    // Display the confirmation dialog
    setShowConfirm(true);
  };

  const handleConfirmDelete = (id) => {
    // Dispatch the delete action
    dispatch(ItemsDeleteCart({ id, toast }));

    // Close the confirmation dialog
    setShowConfirm(false);
  };

  const checkOutHandler = () => {
    if (!user) {
      navigate("/login?redirect=/shipping");
    } else if (user.id !== userId) {
      toast.error("Sorry, you are not authorized to proceed!");
    } else {
      navigate("/shipping/details");
    }
  };

  const subTotal =
    cartItems && Array.isArray(cartItems)
      ? cartItems
          .flatMap((cart) =>
            cart.items?.map(
              (item) => Number(item.product.price) * Number(item.quantity)
            )
          )
          .reduce((acc, cost) => acc + cost, 0)
      : 0;

  const deliveryCharge = 100;
  const total = subTotal + deliveryCharge;

  return (
    <>
      <MetaData title="view cart" />
      <SubHeader />
      {progressing ? (
        <Loader />
      ) : (
        <>
          <div className="flex px-4 py-4 flex-col bg-gray-50 md:flex-row">
            {/* Left Column */}
            <div className="md:w-2/3 p-4">
              <h3 className="text-2xl text-gray-700 font-semibold px-2 my-3">
                My Cart
              </h3>
              {cartItems && cartItems.length > 0 ? (
                <>
                  {cartItems.flatMap((cart) =>
                    cart.items?.map((item) => (
                      <>
                        <div key={item.id} className="flex items-start mb-4">
                          <img
                            src={item.product.product_url}
                            alt="Product"
                            className="p-2 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain object-top"
                          />

                          <div className="flex flex-col px-12">
                            <h2 className="text-lg font-semibold text-gray-700">
                              {item.product.product_name}
                            </h2>
                            <div className="flex items-center mt-2 text-gray-700">
                              <span className="mr-2">Quantity:</span>
                              <div className="flex ml-auto">
                                <button
                                  className="px-3 py-1 bg-gray-200 rounded-l"
                                  onClick={() =>
                                    handleDecrement(item.product.prod_slug)
                                  }
                                >
                                  -
                                </button>
                                <span className="w-16 px-3 py-1 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  className="px-3 py-1 bg-gray-200 rounded-r"
                                  onClick={() =>
                                    handleIncrement(item.product?.prod_slug)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <h2 className="text-gray-700 my-1">
                              Price: Rs.{item.product.price}
                            </h2>
                          </div>
                        </div>
                        <div className="flex items-center px-8">
                          <div className="flex justify-center">
                            <Link className="border mr-2 p-2">
                              <AiOutlineHeart />
                            </Link>
                            <div className="relative">
                              <button
                                className="flex items-center justify-center p-2 text-red-500 transition duration-300 ease-in-out transform border hover:bg-red-50 hover:text-red-600"
                                onClick={() => setShowConfirm(true)}
                              >
                                <FaTrash className="mr-1" />
                              </button>
                              {showConfirm && (
                                <div className="fixed inset-0 flex items-center justify-center z-50">
                                  <div className="bg-white p-8 rounded-lg shadow-md">
                                    <p className="text-gray-800">
                                      Are you sure you want to delete this
                                      product?
                                    </p>
                                    <div className="mt-6 flex justify-center">
                                      <div
                                        className="cursor-pointer text-red-500 hover:text-red-600"
                                        onClick={() =>
                                          handleConfirmDelete(item.id)
                                        }
                                      >
                                        <FaCheckCircle className="text-3xl" />{" "}
                                      </div>
                                      <div
                                        className="ml-4 cursor-pointer text-blue-500 hover:text-blue-700"
                                        onClick={() => setShowConfirm(false)}
                                      >
                                        <FaTimesCircle className="text-3xl" />{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <h3 className="ml-auto text-sm lg:text-base text-gray-700 font-semibold">
                            Sub-Total: Rs.{item.product.price * item.quantity}
                          </h3>
                        </div>
                      </>
                    ))
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FaShoppingBasket className="text-4xl text-gray-400 mb-4" />
                  <h2 className="text-xl text-gray-500 mb-4">
                    Your cart is empty
                  </h2>
                </div>
              )}

              <hr className="my-2" />
              {/* Add more product details here */}

              <div className="mt-4 flex justify-end">
                <Link to="/">
                  <button className="text-sm  px-4 py-2 bg-[#103755] text-white rounded">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:w-1/3 p-4 bg-[#FFFFFF]">
              <div className="flex flex-col h-full">
                <h3 className="text-2xl text-gray-700 mb-4">Order Summary</h3>
                <hr className="w-full border-dotted border-gray-300 mb-4" />
                {cartItems && cartItems.length > 0 ? (
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-semibold">
                      Selected {cartItems.length} item(s) Price
                    </span>
                    <p className="text-right font-bold text-gray-700">
                      Rs {subTotal}
                    </p>
                  </div>
                ) : (
                  <h1>No Data found</h1>
                )}
                <div className="flex justify-between my-2">
                  <span className="text-gray-700 font-semibold">
                    Delivery charge
                  </span>
                  <p className="text-right text-gray-700 font-bold">Rs 100</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="border border-gray-300 rounded-lg p-4 max-w-sm w-full">
                    <h3 className="text-center font-semibold text-gray-700 mb-4">
                      VOUCHER CODE
                    </h3>
                    <div className="flex items-center">
                      <input
                        className="inputbox flex-grow mr-2 bg-primary border border-primary py-2 px-3 rounded-lg focus:outline-none"
                        placeholder="Enter voucher code"
                      />
                      <button
                        type="button"
                        className="bg-red-600 btn-green hover:bg-red-700 text-white w-16 self-start disabled:cursor-not-allowed disabled:opacity-75 py-2 px-3 rounded-md"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between my-5">
                  <span className="text-gray-700 font-semibold">
                    Total payable
                  </span>

                  <p className="text-right text-gray-700 font-bold">
                    Rs {total}
                  </p>
                </div>
                <hr className="w-full border-dotted border-gray-300 mb-4" />

                <button
                  onClick={checkOutHandler}
                  className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white rounded mt-4 w-full"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartDetails;

//  {
//    cartItems && cartItems.length > 0 ? (
//      cartItems[0].items?.map((item) => (
//        <>
//          <div className="flex items-start mb-4">
//            <img
//              src={item.product.product_url}
//              alt="Product"
//              className="p-2 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain object-top"
//            />

//            <div className="flex flex-col px-12">
//              <h2 className="text-lg font-semibold text-gray-700">
//                {item.product.product_name}
//              </h2>
//              <div className="flex items-center mt-2 text-gray-700">
//                <span className="mr-2">Quantity:</span>
//                <div className="flex ml-auto">
//                  <button
//                    className="px-3 py-1 bg-gray-200 rounded-l"
//                    onClick={() => handleDecrement(item.prod_slug)}
//                  >
//                    -
//                  </button>
//                  <input
//                    type="text"
//                    className="w-16 px-3 py-1 text-center focus:outline-none"
//                    value={item.quantity}
//                  />
//                  <button
//                    className="px-3 py-1 bg-gray-200 rounded-r"
//                    onClick={() => handleIncrement(item.prod_slug)}
//                  >
//                    +
//                  </button>
//                </div>
//              </div>
//              <h2 className="text-gray-700 my-1">
//                Price: Rs.{item.product.price}
//              </h2>
//            </div>
//          </div>
//          <div className="flex items-center px-8">
//            <div className="flex justify-center">
//              <Link className="border mr-2 p-2 text-red-500">
//                <FaHeart />
//              </Link>
//              <Link className="border p-2 text-red-500">
//                <FaTrash onClick={() => handleRemoveItem(item.prod_slug)} />
//              </Link>
//            </div>
//            <h3 className="ml-auto text-sm lg:text-base text-gray-700 font-semibold">
//              Sub-Total: Rs.{item.product.price * item.quantity}
//            </h3>
//          </div>
//        </>
//      ))
//    ) : (
//      <div className="flex flex-col items-center justify-center">
//        <FaShoppingBasket className="text-4xl text-gray-400 mb-4" />
//        <h2 className="text-xl text-gray-500 mb-4">Your cart is empty</h2>
//      </div>
//    );
//  }
