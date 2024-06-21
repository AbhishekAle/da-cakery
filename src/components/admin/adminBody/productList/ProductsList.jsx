import React, { useState } from "react";
import {
  FaEye,
  FaPencilAlt,
  FaTrash,
  FaPlusCircle,
  FaSearch,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const ProductsList = () => {
  const [searchValue, setSearchValue] = useState("");

  const products = [
    {
      id: 1,
      productName: "Product 1",
      image: "",
      price: "$10",
      category: "Category 1",
      ratings: 4.5,
      isStock: true,
    },
    {
      id: 2,
      productName: "Product 2",
      image: "",
      price: "$15",
      category: "Category 2",
      ratings: 3.8,
      isStock: false,
    },
  ];

  return (
    <>
      <div className="container mx-auto px-8 py-8">
        <div class="flex justify-between mb-4">
          <h2 class="text-lg text-gray-700 font-semibold">Product List</h2>
          <Link to="/admin/dashboard/add/product">
            <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              <span class="mr-2">
                <FaPlusCircle />
              </span>
              Add Products
            </button>
          </Link>
        </div>

        <div className="flex justify-start mb-2">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by product name"
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="bg-white mt-2">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.N.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-l border-r border-gray-300">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-l border-r border-gray-300">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-l border-r border-gray-300">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-l border-r border-gray-300">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-l border-r border-gray-300">
                  Ratings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-l border-r border-gray-300">
                  Is Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <>
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <img
                        src={product.image}
                        alt="Product"
                        className="h-8 w-8"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.ratings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                      <span
                        className={
                          product.isStock ? "text-green-500" : "text-red-500"
                        }
                      >
                        {product.isStock ? "InStock" : "OutOfStock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-300">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          title="View"
                          onClick={() => handleView(product.id)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="text-yellow-500 hover:text-yellow-700"
                          title="Edit"
                          onClick={() => handleEdit(product.id)}
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
