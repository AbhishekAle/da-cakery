import React from "react";
import { DataGrid } from "./GridData";

const DashBoardGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {DataGrid.map((item) => (
        <WrapperBox key={item.id}>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
            <span className="text-2xl text-white">{item.icon}</span>
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              {item.title}
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                Rs.{item.income}
              </strong>
              <span className="text-sm text-green-500 pl-2">{item.index}</span>
            </div>
          </div>
        </WrapperBox>
      ))}
    </div>
  );
};

export default DashBoardGrid;

const WrapperBox = ({ children }) => {
  return (
    <div className="bg-white rounded-sm p-4 border border-gray-200">
      {children}
    </div>
  );
};
