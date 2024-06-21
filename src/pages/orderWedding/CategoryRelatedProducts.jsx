import React from "react";
import OrderBanner from "./orderBanner/OrderBanner";
import MetaData from "../metaData/MetaData";
import SubHeader from "../../components/header/subHeader/SubHeader";
import RelatedProducts from "./relatedProducts/RelatedProducts";

const CategoryRelatedProducts = () => {
  return (
    <>
      <MetaData title="Order wedding-Cake" />
      <div>
        <OrderBanner />
      </div>
      <div className="mt-8">
        <MetaData title="related products" />
        <SubHeader />
        <RelatedProducts />
      </div>
    </>
  );
};

export default CategoryRelatedProducts;
