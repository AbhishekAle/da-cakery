import React from "react";

const NewsLetter = () => {
  return (
    <div className="font-sans bg-[#FBE8E9] p-4 md:p-14 text-center">
      <h4 className="text-xl text-gray-600 font-bold">
        BE THE FIRST ONE TO LEARN ABOUT DEALS AND OFFERS
      </h4>
      <span
        style={{
          fontSize: "1.75rem",

          lineHeight: "2.6",
          color: "#031927",
        }}
      >
        Sign up for our newsletter
      </span>
      <form className="mt-4 flex justify-center items-center">
        <input
          type="email"
          className="rounded-l-lg px-4 py-2 w-full md:w-3/5 border-t mr-0 border-b border-l border-gray-200 bg-white focus:outline-none"
          placeholder="Enter your email"
          style={{ fontSize: "1rem" }}
        />
        <button
          className="px-4 bg-red-600 text-white font-bold p-2 rounded-r-lg uppercase border-r border-gray-200"
          type="submit"
          style={{ fontSize: "1rem" }}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
