import React from "react";
import MetaData from "../metaData/MetaData";
import Search from "../search/Search";
import OrderSection from "../orderSection/OrderSection";
import SomeCategory from "../categorySection/SomeCategory";
import BestSellers from "../bestSellers/BestSellers";
import PopularFlavours from "../popularFlavours/PopularFlavours";
import NewsLetter from "../newsLetter/NewsLetter";
import PaymentPage from "../paymentPage/PaymentPage";

const Home = () => {
  return (
    <>
      <MetaData title="Oho Cake" />
      <div className="mt-8">
        <Search />
      </div>
      <div className="mt-8">
        <OrderSection />
      </div>
      <div className="mt-8">
        <SomeCategory />
      </div>
      <div className="mt-8 ">
        <BestSellers />
      </div>
      <div className="mt-8">
        <PopularFlavours />
      </div>
      <div className="mt-8">
        <NewsLetter />
      </div>
      <div className="mt-8">
        <PaymentPage />
      </div>
    </>
  );
};

export default Home;
