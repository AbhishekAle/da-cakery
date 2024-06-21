import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../metaData/MetaData";
import SubHeader from "../../components/header/subHeader/SubHeader";
import { toast } from "react-toastify";
import { clearError, orderList } from "../../redux/features/orderSlice";
import Loader from "../../components/layout/loader/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.order);
  // const orderItems = orders.flatMap((order) => order.items);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    dispatch(orderList());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />
      <SubHeader />
      <div className="font-sans marker:container mx-auto px-8 py-8">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4">
          {`${user.name} - Orders`}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">
                  <div className="text-gray-500 flex items-center">
                    Order ID
                    <div className="ml-1 h-4 bg-gray-300 w-px"></div>
                  </div>
                </th>
                <th className="py-2 px-4 border-b">
                  <div className="text-gray-500 flex items-center">
                    Status
                    <div className="ml-1 h-4 bg-gray-300 w-px"></div>
                  </div>
                </th>
                <th className="py-2 px-4 border-b">
                  <div className="text-gray-500 flex items-center">
                    Items Qty
                    <div className="ml-1 h-4 bg-gray-300 w-px"></div>
                  </div>
                </th>
                <th className="py-2 px-4 border-b">
                  <div className="text-gray-500 flex items-center">
                    Amount
                    <div className="ml-1 h-4 bg-gray-300  w-px"></div>
                  </div>
                </th>
                <th className="py-2 px-4 border-b">
                  <div className="text-gray-500 flex items-center">
                    Action
                    <div className="ml-1 h-4 bg-gray-300 w-px"></div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    <Loader />
                  </td>
                </tr>
              ) : (
                <>
                  {orders && orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td className="py-2 px-4 border-b">{order.id}</td>
                        <td className="py-2 px-4 border-b">
                          <span
                            className={`order_status ${
                              order.order_status === "Delivered"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {order.order_status}
                          </span>
                        </td>
                        {order.items.length > 0 ? (
                          <>
                            <td className="py-2 px-4 border-b">
                              {order.items[0].quantity}
                            </td>
                            <td className="py-2 px-4 border-b">
                              Rs.{order.totalPrice}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-2 px-4 border-b" colSpan="2">
                              <div className="flex justify-center">
                                No data found
                              </div>
                            </td>
                          </>
                        )}
                        <td className="py-2 px-4 border-b">
                          <Link
                            to={`/order/details/${order.id}`}
                            className="flex items-center justify-center h-8 w-8 bg-red-500 rounded-md text-white"
                          >
                            <FaEye />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-2 px-4 border-b" colSpan="5">
                        <div className="flex justify-center">No data found</div>
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
