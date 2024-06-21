import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import PaymentPage from "../../paymentPage/PaymentPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearError,
  productRelated,
} from "../../../redux/features/productSlice";
import Loader from "../../../components/layout/loader/Loader";

const RelatedProducts = () => {
  const { loading, error, relatedProducts } = useSelector(
    (state) => state.product
  );

  const { category_slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(productRelated(category_slug));
  }, [dispatch, category_slug]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-gray-100">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto max-w-7xl"
              style={{ padding: "20px" }}
            >
              {relatedProducts && relatedProducts.length > 0 ? (
                relatedProducts &&
                relatedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-md overflow-hidden shadow-md flex flex-col items-center hover:shadow-lg"
                  >
                    <Link to={`/product/details/${item.prod_slug}`}>
                      <div className="relative">
                        <img
                          src={item.product_url}
                          alt="seller img"
                          className="w-full object-cover object-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
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
                          {item.product_name}
                        </span>
                        <span
                          className="text-red-500 text-sm font-bold block"
                          style={{ fontSize: "14px", fontFamily: "Nunito" }}
                        >
                          Rs.{item.price}
                        </span>
                        <div className="text-right">
                          <span
                            className="text-gray-400 text-xs font-medium"
                            style={{ fontSize: "12px", fontFamily: "Nunito" }}
                          >
                            {item.rating}
                            <FaStar className="text-yellow-400 inline-block" />
                          </span>
                          <br />
                          <span
                            className="text-gray-400 text-xs font-medium"
                            style={{ fontSize: "12px", fontFamily: "Nunito" }}
                          >
                            {item.product_views} reviews
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <h1>No Data Found</h1>
              )}
            </div>
          </div>
        </>
      )}
      <div className="mt-8">
        <PaymentPage />
      </div>
    </>
  );
};

export default RelatedProducts;
