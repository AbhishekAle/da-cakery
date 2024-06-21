import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError, productPopular } from "../../redux/features/productSlice";
import Loader from "../../components/layout/loader/Loader";

const PopularFlavours = () => {
  const { loading, error, popularProducts } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(productPopular());
  }, [dispatch, error]);

  return (
    <>
      <div className="bg-white">
        <h2 className="text-center font-tomatoes text-red-500 text-3xl md:text-4xl lg:text-5xl mb-4 mt-8">
          Most Popular
        </h2>
        <h4
          className="text-center text-xl font-bold uppercase mb-8 md:mb-12"
          style={{ fontFamily: "Nunito" }}
        >
          FLAVOURS
        </h4>
        {loading ? (
          <Loader />
        ) : (
          <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              <>
                {popularProducts && popularProducts.length > 0 ? (
                  popularProducts &&
                  popularProducts.map((item) => (
                    <div key={item.id}>
                      <Link to={`/product/details/${item.prod_slug}`}>
                        <div className="p-4 shadow-md rounded-lg">
                          <img
                            src={item?.product_url}
                            alt="flavours img"
                            className="w-full h-auto md:h-64 object-cover rounded-lg mb-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                          />
                          <span
                            className="font-bold text-lg hover:text-red-500"
                            style={{
                              fontSize: "20px",
                              fontFamily: "Nunito",
                            }}
                          >
                            {item?.product_name}
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <>
                    <h1 className="text-center">No data found</h1>
                  </>
                )}
              </>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PopularFlavours;
