import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const RecommendedProducts = ({ recommendedProduct }) => {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "#ffd707",
    size: window.innerWidth < 600 ? 12 : 16,
    isHalf: true,
    value:
      recommendedProduct && recommendedProduct.length > 0
        ? recommendedProduct[0]?.product?.rating
        : 0,
  };
  return (
    <div className="font-sans mx-auto max-w-7xl p-4">
      <h2 className="text-2xl text-gray-500 font-semibold mb-4">
        Recommended Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendedProduct && recommendedProduct.length > 0 ? (
          recommendedProduct.map((item) => (
            <div
              key={item.id}
              className="rounded-md overflow-hidden shadow-md flex flex-col items-center hover:shadow-lg"
            >
              <Link to={`/product/details/${item.prod_slug}`}>
                <div className="relative">
                  <img
                    src={item?.product_url}
                    alt="recommend img"
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
      </div>
    </div>
  );
};

export default RecommendedProducts;
