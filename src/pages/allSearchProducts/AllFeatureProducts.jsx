import React, { useState } from "react";
import MetaData from "../metaData/MetaData";
import SubHeader from "../../components/header/subHeader/SubHeader";
import MyImg from "../../assets/images/RecommendImg.jpg";
import {
  FaChevronLeft,
  FaChevronRight,
  FaThLarge,
  FaThList,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

const AllFeatureProducts = () => {
  const [sortBy, setSortBy] = useState("default"); // State for sort by
  const [viewType, setViewType] = useState("grid"); // State for view type

  // ... (categories and products arrays)
  const categories = [
    "All",
    "Chocolate",
    "ButterScotch",
    "Vanilla",
    "CupCakes",
    "Anniversary",
    "Birthday",
    "Wedding",
  ];
  const products = [
    { id: 1, name: "Product 1", price: 19.99, prodImg: MyImg },
    { id: 2, name: "Product 2", price: 29.99, prodImg: MyImg },
    { id: 3, name: "Product 3", price: 39.99, prodImg: MyImg },
    { id: 4, name: "Product 4", price: 49.99, prodImg: MyImg },
    { id: 5, name: "Product 1", price: 19.99, prodImg: MyImg },
    { id: 6, name: "Product 2", price: 29.99, prodImg: MyImg },
    { id: 7, name: "Product 3", price: 39.99, prodImg: MyImg },
    { id: 8, name: "Product 4", price: 49.99, prodImg: MyImg },
    // Add more products...
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Number of products per page

  // Function to handle sorting change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    // Implement sorting logic based on the selected value
  };

  // Function to toggle between grid and list view
  const toggleViewType = () => {
    setViewType((prevViewType) => (prevViewType === "grid" ? "list" : "grid"));
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    // Calculate the total number of pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calculate the range of products to display on the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <MetaData title="search result" />
      <SubHeader />

      <div className="bg-[#F9F9F9] flex flex-col lg:flex-row justify-center mt-8 my-5 mx-12 space-y-4 lg:space-y-0 lg:space-x-8">
        {/* Sidebar */}

        <div className="lg:w-1/4 border px-4 py-4 rounded shadow bg-[#fff]">
          <div className="flex flex-col justify-start h-full">
            <div className="my-2 text-gray-500 text-base sm:text-lg font-bold mb-0 pl-8">
              Category
            </div>
            <hr />
            {/* Centered categories */}
            <div className="flex flex-col">
              {categories.map((category, index) => (
                <Link
                  to={`/category/${category.toLowerCase()}`}
                  key={index}
                  className="flex items-center pl-8" // Added this class and adjusted padding
                >
                  <BiChevronRight className="mr-2" /> {/* Icon */}
                  {category}
                </Link>
              ))}
            </div>
            {/* Other sidebar links */}
            <div className="my-2 text-gray-500 text-base sm:text-lg font-bold mb-0 pl-8">
              Price Range
            </div>
            <hr />
          </div>
        </div>
        {/* Products section */}
        <div className=" rounded shadow lg:w-3/4 p-4">
          <div className="flex justify-between items-center mb-4">
            {/* Sort by dropdown */}
            <div className="flex items-center">
              <div className="text-gray-500 hidden md:block my-auto whitespace-no-wrap mr-2">
                Sort by:
              </div>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="border px-4 py-2 rounded-sm focus:ring-red-500 focus:border-red-500 focus:outline-none"
              >
                <option value="default">Default</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="lowToHigh">Price: Low to High</option>
              </select>
            </div>

            {/* Grid/List view toggle */}
            <div className="flex items-center">
              <div
                className={`cursor-pointer mr-2 ${
                  viewType === "grid" ? "text-blue-500" : "text-gray-500"
                }`}
                onClick={toggleViewType}
              >
                <FaThLarge size={20} />
              </div>
              <div
                className={`cursor-pointer ${
                  viewType === "list" ? "text-blue-500" : "text-gray-500"
                }`}
                onClick={toggleViewType}
              >
                <FaThList size={20} />
              </div>
            </div>
          </div>
          <hr />
          {/* Products grid or list */}
          <div
            className={`grid ${
              viewType === "list" ? "" : "grid-cols-4 gap-4"
            } space-y-4`}
          >
            {/* Products cards */}
            {products.map((product) => (
              <div
                key={product.id}
                className={`p-4 rounded shadow ${
                  viewType === "list"
                    ? "flex items-start"
                    : "flex flex-col items-center"
                }`}
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={product.prodImg}
                    alt={product.name}
                    className="product-image w-full hover-img h-32 md:h-36 lg:h-40 xl:h-48 object-contain"
                  />
                </div>
                {viewType === "list" && (
                  <div className="flex flex-col ml-4">
                    <div className="font-bold mb-1">{product.name}</div>
                    <div className="text-gray-600">Rs.{product.price}</div>
                  </div>
                )}
                {viewType === "grid" && (
                  <div className="flex flex-col mt-2">
                    <div className="font-bold mb-1">{product.name}</div>
                    <div className="text-gray-600">Rs.{product.price}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Pagination */}

          <div className="flex justify-end mt-4">
            <button
              onClick={goToPreviousPage}
              className="px-3 py-1 mr-2 rounded border text-gray-500 text-sm"
            >
              <FaChevronLeft />
            </button>

            <span className="px-3 py-1 border rounded text-gray-500 text-sm">
              {currentPage}
            </span>

            <button
              onClick={goToNextPage}
              className="px-3 py-1 ml-2 rounded border text-gray-500 text-sm"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllFeatureProducts;
