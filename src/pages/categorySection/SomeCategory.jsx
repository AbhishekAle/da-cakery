import React, { useEffect } from "react";
import { categoryData } from "./CategoryData.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearError,
  productsCategory,
} from "../../redux/features/productSlice.jsx";
import Loader from "../../components/layout/loader/Loader.jsx";

const SomeCategory = () => {
  const { loading, error, categoryProducts } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(productsCategory());
  }, [dispatch, error]);

  return (
    <>
      <h2 className="text-center font-tomatoes text-red-500 text-3xl md:text-4xl lg:text-5xl mb-4">
        Some of Our
      </h2>
      <h4
        className="text-center text-xl font-bold uppercase mb-8 md:mb-12"
        style={{ fontFamily: "Nunito" }}
      >
        Categories
      </h4>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-wrap justify-center">
            {categoryProducts && categoryProducts.length > 0 ? (
              categoryProducts.map((item, index) => (
                <div
                  key={index}
                  className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-1 my-2 p-2 rounded-lg shadow-lg bg-white flex flex-col justify-center items-center ${
                    index % 2 === 0
                      ? "order-first sm:order-none"
                      : "order-last sm:order-none"
                  }`}
                >
                  <Link to={`/category/related/products/${item.category_slug}`}>
                    <div className="relative">
                      <div className="h-40 w-40 lg:h-48 lg:w-48 rounded-full overflow-hidden mx-auto">
                        <div className="spinner h-32 w-32 lg:h-40 lg:w-40 mx-auto">
                          <img
                            src={item.image2}
                            alt="category img"
                            className="h-32 w-32 lg:h-40 lg:w-40 rounded-full object-cover object-center absolute inset-0"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                  <p className="text-center text-red-500 mt-2">
                    {item.category_name}
                  </p>
                </div>
              ))
            ) : (
              <h1>No Data found</h1>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SomeCategory;
