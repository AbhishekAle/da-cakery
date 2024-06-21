import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError, productsList } from "../../redux/features/productSlice";
import ReactStars from "react-rating-stars-component";
import Loader from "../../components/layout/loader/Loader";

const BestSellers = () => {
  const { loading, error, products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "#ffd707",
    size: window.innerWidth < 600 ? 12 : 16, // Decreased size values
    isHalf: true,
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(productsList());
  }, [dispatch, error]);
  return (
    <>
      <div className="bg-gray-100 py-2">
        <h2 className="text-center font-tomatoes text-red-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 mt-8">
          Some of Our
        </h2>
        <h4
          className="text-center text-gray-700 text-lg sm:text-xl font-bold uppercase mb-8 md:mb-12"
          style={{ fontFamily: "Nunito" }}
        >
          BEST SELLERS
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl p-4">
          {loading ? (
            <Loader />
          ) : (
            <>
              {products && products.length > 0 ? (
                products.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-md overflow-hidden shadow-md flex flex-col items-center hover:shadow-lg"
                  >
                    <Link to={`/product/details/${item.prod_slug}`}>
                      <div className="relative">
                        <img
                          src={item?.product_url}
                          alt="seller img"
                          className="w-full h-48 sm:h-64 object-cover object-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                        />
                      </div>
                      <div className="w-full px-4 pt-4">
                        <span
                          className="font-bold text-lg text-gray-900 hover:text-red-500"
                          style={{
                            fontSize: "18.75px",
                            fontFamily: "Nunito",
                            display: "block",
                            maxHeight: "3rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item?.product_name}
                        </span>
                        <span
                          className="text-red-500 text-sm font-bold block"
                          style={{ fontSize: "14px", fontFamily: "Nunito" }}
                        >
                          Rs.{item?.price}
                        </span>
                        <div className="text-right">
                          <span
                            className="text-gray-400 text-xs font-medium"
                            style={{ fontSize: "12px", fontFamily: "Nunito" }}
                          >
                            <ReactStars {...options} value={item.rating} />
                          </span>
                          <br />
                          <span
                            className="text-gray-400 text-xs font-medium"
                            style={{ fontSize: "12px", fontFamily: "Nunito" }}
                          >
                            {item?.product_views} reviews
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <h1 className="text-gray-700 text-center">No Data Found</h1>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BestSellers;
