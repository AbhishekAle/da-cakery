import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/all/features-products/${keyword}`);
    } else {
      navigate(`/all/features-products`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center justify-center">
      <div className="flex items-center w-full lg:w-2/5 relative">
        <input
          type="text"
          placeholder="I'm searching for"
          className="text-gray border border-gray-300 w-full py-2 px-2 pr-8 focus:outline-none"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type="submit" // Change the button type to submit
          className="absolute top-0 right-0 flex items-center justify-center h-full w-10 lg:w-20 bg-red-600" // Adjusted button width
        >
          <FiSearch className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
        </button>
      </div>
    </form>
  );
};

export default Search;
