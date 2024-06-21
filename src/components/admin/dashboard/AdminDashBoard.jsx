import React from "react";
import DashBoardGrid from "./dashboardGrid/DashBoardGrid";
import TransactionsChart from "./TransactionsChart/TransactionsChart";
import BuyerProfilePieChart from "./buyerProfilePieChart/BuyerProfilePieChart";

const AdminDashBoard = () => {
  return (
    <>
      <div className="flex flex-col gap-4 mt-4 px-4">
        <DashBoardGrid />
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Use flex-col for mobile and flex-row for larger screens */}
          <div className="w-full md:w-2/3">
            {/* Adjust the width of the TransactionsChart */}
            <TransactionsChart />
          </div>
          <div className="w-full md:w-1/3">
            {/* Adjust the width of the BuyerProfilePieChart */}
            <BuyerProfilePieChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
