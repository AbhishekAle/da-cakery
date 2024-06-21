import React from "react";
import { Link } from "react-router-dom";

const CakesDropDown = () => {
  return (
    <div className="relative flex-col flex-1">
      <div
        className="absolute z-50 bg-white shadow-lg py-2 px-4 mt-2 rounded-lg overflow-auto overflow-y-hidden"
        style={{ maxWidth: "100vw" }} // Set the maxWidth to the viewport width
      >
        <div className="flex flex-nowrap justify-between">
          <div className="w-40 p-4 bg-gray-50 shadow-inner flex-shrink-0 min-w-0">
            {/* BY FLAVOUR */}
            <h3 className="text-md text-red-500 mb-2">BY FLAVOUR</h3>
            <div className="text-gray-700 text-sm max-h-60 overflow-y-auto">
              <ul className="inline-block mr-2 whitespace-nowrap">
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Oreo
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Mango
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Pineapple
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Strawberry
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Blueberry
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Red Velvet
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Fresh Fruits
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Chocolate
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    White Forest
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Black Forest
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Butterscotch
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Vanilla
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Truffle
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Coconut
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Mocha
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Choco Butter
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Choco Vanilla
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Brownie
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Choco Truffle
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-40 p-4">
            {/* BY TYPE */}
            <h3 className="text-md text-red-500 mb-2">BY TYPE</h3>
            <div className="text-gray-700 text-sm max-h-60 overflow-y-auto">
              <ul className="inline-block mr-2">
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Desserts
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Cartoon Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Photo Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Cakesicles
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Mini Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Cupcakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Cakes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-40 p-4 bg-gray-50 shadow-inner">
            {/* BY RECIPIENT */}
            <h3 className="text-md text-red-500 mb-2">BY RECIPIENT</h3>
            <div className="text-gray-700 text-sm max-h-60 overflow-y-auto">
              <ul className="inline-block mr-2">
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Brother
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Him
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Her
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    sister
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Husband
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Wife
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Kids
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Adults
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Pets
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-40 p-4 bg-gray-50 shadow-inner">
            {/* BY SHAPE */}
            <h3 className="text-md text-red-500 mb-2">BY SHAPE</h3>
            <div className="text-gray-700 text-sm max-h-60 overflow-y-auto">
              <ul className="inline-block mr-2">
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Heart Shaped Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Tier Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Hexagonal Shape
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Minion Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Square Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Spiderman Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Barbie Doll Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-red-500">
                    Round Cakes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakesDropDown;

//  <div className="relative flex-col flex-1">
//       <div
//         className="absolute z-50 bg-white shadow-lg py-2 px-4 mt-2 rounded-lg overflow-x-scroll"
//         style={{ maxWidth: "800px" }}
//       >
//         <div className="flex justify-between">
//           <div className="w-40 p-4 bg-gray-50 shadow-inner flex-shrink-0 min-w-0">
//             <h3 className="text-md text-red-500 mb-2">BY FLAVOUR</h3>
//             <div className="text-gray-700 text-sm max-h-60 overflow-y-auto">
//               <ul className="inline-block mr-2 whitespace-nowrap">
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Oreo
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Mango
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Pineapple
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Strawberry
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Blueberry
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Red Velvet
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Fresh Fruits
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Chocolate
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     White Forest
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Black Forest
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Butterscotch
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Vanilla
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Truffle
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Coconut
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Mocha
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Choco Butter
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Choco Vanilla
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Brownie
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Choco Truffle
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="w-40 p-4">
//             <h3 className="text-md text-red-500 mb-2">BY TYPE</h3>
//             <div className="text-gray-700 text-sm max-h-60 overflow-y-auto">
//               <ul className="inline-block mr-2">
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Desserts
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Cartoon Cakes
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Photo Cakes
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Cakesicles
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Mini Cakes
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Cupcakes
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Cookies
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Cakes
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="w-40 p-4 bg-gray-50 shadow-inner">
//             <h3 className="text-md text-red-500 mb-2">BY RECIPIENT</h3>
//             <div className="text-gray-700 text-sm max-h-60 overflow-y-auto">
//               <ul className="inline-block mr-2">
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Brother
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Him
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Her
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     sister
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Husband
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Wife
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Kids
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Adults
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Pets
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="w-40 p-4 bg-gray-50 shadow-inner">
//             <h3 className="text-md text-red-500 mb-2">BY SHAPE</h3>
//             <div className="text-gray-700 text-sm max-h-60 overflow-y-auto">
//               <ul className="inline-block mr-2">
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Heart Shaped Cakes
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Tier Cakes
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Hexagonal Shape
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Minion Cakes
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Square Cakes
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Spiderman Cakes
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Barbie Doll Cakes
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/" className="hover:text-red-500">
//                     Round Cakes
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
