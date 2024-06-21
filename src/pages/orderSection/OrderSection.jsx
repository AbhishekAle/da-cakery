import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../redux/features/productSlice";
import Loader from "../../components/layout/loader/Loader";

const OrderSection = () => {
  const { loading, error, categoryProducts } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryProducts && categoryProducts.length > 0 && (
                <div className="col-span-1 md:col-span-1 relative">
                  <img
                    src={categoryProducts[0].image1}
                    alt={categoryProducts[0].category_name}
                    className="w-full h-auto md:object-cover md:h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity bg-black bg-opacity-50">
                    <Link
                      to={`/category/related/products/${categoryProducts[0].category_slug}`}
                      className="bg-white text-black py-2 px-4 rounded-full font-bold text-sm"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              )}
              <div className="col-span-1 md:col-span-1 grid grid-cols-2 gap-4">
                {categoryProducts &&
                  categoryProducts.slice(1).map((category) => (
                    <div className="relative" key={category.category_name}>
                      <img
                        src={category.image1}
                        alt={category.category_name}
                        className="w-full h-auto md:object-cover md:h-full"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity cursor-pointer">
                        <div className="flex items-center justify-center h-full">
                          <span className="text-white py-2 px-4 rounded-full font-bold text-sm">
                            <Link
                              to={`/category/related/products/${category.category_slug}`}
                            >
                              View More
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderSection;
