import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { OrderSingleDetail, clearError } from "../../redux/features/orderSlice";
import MetaData from "../metaData/MetaData";
import SubHeader from "../../components/header/subHeader/SubHeader";
import Loader from "../../components/layout/loader/Loader";
import { FaArrowLeft } from "react-icons/fa";

const OrderDetails = () => {
  const { loading, error, order } = useSelector((state) => state.order);
  const {
    user,
    order_status,
    payment_method,
    totalPrice,
    shipping_details: {
      alies,
      alternativeNo,
      districts,
      fullname,
      landmark,
      location,
      phoneNumber,
    } = {},
  } = order || {};

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    if (id) {
      dispatch(OrderSingleDetail(id));
    }
  }, [dispatch, error, id]);

  return (
    <>
      <MetaData title="Order Details" />
      <SubHeader />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container mx-auto py-10 px-4">
            <h3 className="text-3xl text-gray-500 font-bold mb-4">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link to="/my/orders" className="mr-2">
                  <FaArrowLeft />
                </Link>
                Order # {order && order.id}
              </div>
            </h3>
            <hr className="my-4" />
            <h4 className="text-2xl text-gray-500 font-bold mt-8 mb-4">
              Shipping Info
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-white border rounded">
                {/* Shipping Info details */}
                <h2 className="text-gray-500 font-bold">Order By:</h2>
                <p className="mb-2">
                  <strong>Name: </strong>
                  {user ? user.name : "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Email: </strong>
                  {user ? user.email : "N/A"}
                </p>
                <h2 className="text-gray-500 font-bold">Order to:</h2>
                <p className="mb-2">
                  <strong>FullName: </strong>
                  {fullname ? fullname : "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Contact: </strong>
                  {phoneNumber || "N/A"}, {alternativeNo || ""}
                </p>
                <p className="mb-2">
                  <strong>Alias: </strong>
                  {alies ? alies : "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Address: </strong>
                  {districts || "N/A"}, {location || ""}, {landmark || ""}
                </p>
              </div>
              <div className="p-4 bg-white border rounded">
                {/* Order Status and Payment details */}
                <p className="mb-2">
                  <strong>Order Status: </strong>{" "}
                  <span
                    className={`order_status ${
                      order_status === "Delivered"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order_status}
                  </span>
                </p>
                <p className="mb-2">
                  <strong>Ordered On: </strong>{" "}
                  {order &&
                    order.created &&
                    new Date(order.created).toLocaleString()}
                </p>
                <p className="mb-2">
                  <strong>Total Price: </strong>{" "}
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">
                    Rs.{totalPrice}
                  </span>
                </p>
                <p className="mb-2">
                  <strong>Payment Status: </strong>{" "}
                  {payment_method === "cod" ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                      Paid
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                      Unpaid
                    </span>
                  )}
                </p>
              </div>
            </div>
            <hr className="my-8" />
            <h4 className="text-2xl text-gray-500 font-bold mt-8 mb-4">
              Order Items:
            </h4>
            {order && order.items ? (
              order.items.map((item) => (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4"
                  key={item.id}
                >
                  <div className="flex justify-center">
                    <img
                      src={item.product.product_url}
                      alt="orderDetails"
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded shadow-lg cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-white border rounded">
                    {/* Product details */}
                    <h5 className="text-xl font-bold">
                      {item.product.product_name}
                    </h5>
                    <p className="text-lg">
                      Rs. {item.product.price} X {item.quantity}
                    </p>
                  </div>
                  <div className="p-4 bg-white border rounded">
                    {/* Subtotal */}
                    <p>
                      <strong>Subtotal:</strong>{" "}
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                        Rs. {item.product.price * item.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No order items found.</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
