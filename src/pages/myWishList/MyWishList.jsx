import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaShoppingCart,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";
import SubHeader from "../../components/header/subHeader/SubHeader";
import MetaData from "../metaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  ItemsAddedCart,
  allWhishList,
  clearErr,
} from "../../redux/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/layout/loader/Loader";
import { Tooltip } from "react-tippy";
import { toast } from "react-toastify";

const MyWishList = () => {
  const { progressing, err, wishLists } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const userName = user?.name;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const handleAddToCart = (item) => {
    if (userName) {
      const data = {
        customer: userName,
        items: [
          {
            product: item.product.id,
          },
        ],
      };
      dispatch(ItemsAddedCart({ data, toast }));
    } else {
      toast.error("please login first!");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (err) {
      toast.error(err);
      dispatch(clearErr());
    }
    dispatch(allWhishList());
  }, [dispatch, err]);

  const handleConfirmDelete = (itemId) => {
    // setWishList(wishList.filter((item) => item.id !== itemId));
  };

  return (
    <>
      <MetaData title="Oho-wishlist" />
      <SubHeader />
      <div className="bg-[#F5F5F5] font-sans container mx-auto p-4 overflow-x-auto">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4"> Wishlist</h2>
        <table className="bg-[#fff] min-w-full border-collapse">
          <thead>
            <tr className="text-gray-500">
              <th className="border p-2">Item</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Unit Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {progressing ? (
              <tr>
                <td colSpan="4" className="text-center">
                  <Loader />
                </td>
              </tr>
            ) : wishLists?.items?.length > 0 ? (
              wishLists?.items?.map((item) => (
                <tr key={item.product.id}>
                  <td className="border p-2 text-center">
                    <Link to={`/product/details/${item.product.prod_slug}`}>
                      <img
                        src={item?.product?.product_url}
                        alt={item?.product?.product_name}
                        className="w-20 h-20 object-contain mx-auto"
                      />
                    </Link>
                  </td>
                  <td className="border p-2">
                    <p className="text-center">{item?.product?.product_name}</p>
                  </td>
                  <td className="border p-2 ">
                    <p className="text-center text-red-500">
                      Rs {item.product.price}
                    </p>
                  </td>
                  <td className="border p-2 text-center">
                    <div className="flex w-full justify-center items-center">
                      {item.product.isInstock ? (
                        <Tooltip title="Add to Cart" position="top">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md mr-2 flex items-center"
                          >
                            <FaShoppingCart />
                          </button>
                        </Tooltip>
                      ) : null}
                      <Tooltip title="Remove from Wishlist" position="top">
                        <button
                          onClick={() => setShowConfirm(true)}
                          className="text-red-600 flex items-center"
                        >
                          <FaTrash />
                        </button>
                      </Tooltip>
                    </div>
                    <div className="relative mt-4">
                      {showConfirm && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                          <div className="bg-white p-8 rounded-lg shadow-md">
                            <p className="text-gray-800">
                              Are you sure you want to delete this product?
                            </p>
                            <div className="mt-6 flex justify-center">
                              <div
                                className="cursor-pointer text-red-500 hover:text-red-600"
                                onClick={() =>
                                  handleConfirmDelete(item.product.id)
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
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="4">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyWishList;
