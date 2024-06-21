import React from "react";
import { Link } from "react-router-dom";

const OccasionsDropDown = () => {
  return (
    <>
      <div className="relative flex-col flex-1">
        <div
          className="absolute z-50 bg-white shadow-lg py-2 px-4 mt-2 rounded-lg overflow-auto overflow-y-hidden"
          style={{ maxWidth: "100vw" }}
        >
          <div className="flex flex-nowrap justify-between">
            <div className="w-64 p-4 bg-gray-50 shadow-inner flex-shrink-0 min-w-0">
              <h3 className="text-md text-red-500 mb-2">BIRTHDAY CAKE</h3>
              <ul className="text-gray-700 text-sm">
                <li>
                  <Link to="/" className="hover:text-red-500">
                    All birthday cake
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    1st Birthday Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Birthday Photo Cakes
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-64 p-4 bg-gray-50 shadow-inner">
              <h3 className="text-md text-red-500 mb-2">ANNIVERSARY</h3>
              <ul className="text-gray-700 text-sm">
                <li>
                  <Link to="/" className="hover:text-red-500">
                    All anniversary
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    1st Anniversary Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    5th Anniversary Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    10th Anniversary Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    25th Anniversary Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    50th Anniversary Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Anniversary Cakes For Parents
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Anniversary Photo Cakes
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-64 p-4 bg-gray-50 shadow-inner">
              <h3 className="text-md text-red-500 mb-2">BABY SHOWER</h3>
              <ul className="text-gray-700 text-sm">
                <li>
                  <Link to="/" className="hover:text-red-500">
                    All baby shower
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Baby Shower For Girl
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Baby Shower For Boy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Baby Shower For Boy Or Girl
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-64 p-4 bg-gray-50 shadow-inner">
              <h3 className="text-md text-red-500 mb-2">OTHER</h3>
              <ul className="text-gray-600 text-sm">
                <li>
                  <Link to="/" className="hover:text-red-500">
                    All Other
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Valentines's Day
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Engagement Cake
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Designer Cake
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Wedding Cake
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Same Day Delivery
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OccasionsDropDown;

//  <div className="relative">
//    <div className="absolute z-50 bg-white shadow-lg py-2 px-4 mt-2 rounded-lg">
//      <div className="flex justify-between w-128">
//        <div className="w-64 p-4 bg-gray-50 shadow-inner">
//          <h3 className="text-md text-red-500 mb-2">BIRTHDAY CAKE</h3>
//          <ul className="text-gray-700 text-sm">
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                All birthday cake
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                1st Birthday Cakes
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                Birthday Photo Cakes
//              </Link>
//            </li>
//          </ul>
//        </div>
//        <div className="w-64 p-4">
//          <h3 className="text-md text-red-500 mb-2">ANNIVERSARY</h3>
//          <ul className="text-gray-700 text-sm">
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                All anniversary
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                1st Anniversary Cakes
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                5th Anniversary Cakes
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                10th Anniversary Cakes
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                25th Anniversary Cakes
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                50th Anniversary Cakes
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                Anniversary Cakes For Parents
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                Anniversary Photo Cakes
//              </Link>
//            </li>
//          </ul>
//        </div>
//        <div className="w-64 p-4 bg-gray-50 shadow-inner">
//          <h3 className="text-md text-red-500 mb-2">BABY SHOWER</h3>
//          <ul className="text-gray-700 text-sm">
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                All baby shower
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                Baby Shower For Girl
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                Baby Shower For Boy
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                Baby Shower For Boy Or Girl
//              </Link>
//            </li>
//          </ul>
//        </div>
//        <div className="w-64 p-4">
//          <h3 className="text-md text-red-500 mb-2">OTHER</h3>
//          <ul className="text-gray-600 text-sm">
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                All Other
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                Valentines's Day
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                Engagement Cake
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                Designer Cake
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                Wedding Cake
//              </Link>
//            </li>
//            <li>
//              <Link to="/" className="hover:text-red-500">
//                Same Day Delivery
//              </Link>
//            </li>
//          </ul>
//        </div>
//      </div>
//    </div>
//  </div>;
