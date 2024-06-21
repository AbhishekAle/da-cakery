import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddProduct = () => {
  const [productImage, setProductImage] = useState(null);
  const [productImgPreview, setProductImgPreview] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setProductImgPreview(URL.createObjectURL(file));
      setIsImageSelected(true);
    } else {
      setProductImage(null);
      setProductImgPreview(null);
      setIsImageSelected(false);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imgFile").click();
  };

  return (
    <>
      <div className="px-8 mt-8 md:mt-4 md:justify-end">
        <Link to="/admin/dashboard/all/products">
          <FaArrowCircleLeft size={24} />
        </Link>
      </div>
      <div className="bg-[#FFFFFF] container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div>
            <label
              htmlFor="productName"
              className="text-lg text-gray-700 font-semibold mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label
              htmlFor="productManuFacture"
              className="text-lg text-gray-700 font-semibold mb-2"
            >
              Product Manufacturer
            </label>
            <input
              type="text"
              id="productManufacture"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter product manufacture"
            />
          </div>

          <div>
            <label
              htmlFor="productPrice"
              className="text-lg text-gray-700 font-semibold mb-2"
            >
              Product Price
            </label>
            <input
              type="text"
              id="productPrice"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter product price"
            />
          </div>

          <div>
            <label
              htmlFor="productIsStock"
              className="text-lg text-gray-700 font-semibold mb-2"
            >
              Product IsStock
            </label>
            <input
              type="text"
              id="productIsStock"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter product IsStock"
            />
          </div>

          <div>
            <label
              htmlFor="productCategory"
              className="text-lg text-gray-700 font-semibold mb-2"
            >
              Product Category
            </label>
            <select
              id="productCategory"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            >
              <option value="">Select a category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              {/* Add more options for categories */}
            </select>
          </div>

          <div>
            <label
              htmlFor="productName"
              className="text-lg text-gray-700 font-semibold mb-2"
            >
              Product Ratings
            </label>
            <input
              type="text"
              id="productRatings"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter product ratings"
            />
          </div>

          <div>
            <label
              htmlFor="productDescription"
              className="text-lg text-gray-700 font-semibold mb-2"
            >
              Product Description
            </label>

            <ReactQuill theme="snow" value="" onChange="" />
          </div>

          <div className="w-64 h-64 border border-gray-300 relative mx-auto">
            {productImgPreview ? (
              <img
                src={productImgPreview}
                alt="profile"
                className="object-cover w-full h-full cursor-pointer"
                onClick={handleImageClick}
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center cursor-pointer ${
                  isImageSelected ? "border-green-500" : "border-gray-400"
                }`}
                onClick={handleImageClick}
              >
                <span>Select Image</span>
              </div>
            )}
            <input
              id="imgFile"
              type="file"
              name="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>
          <div className="flex justify-center md:justify-start mt-4">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded"
              type="submit"
              style={{ position: "relative", top: "-120px" }}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
