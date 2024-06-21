import {
  FaUserGraduate,
  FaUserTie,
  FaChalkboard,
  FaShoppingCart,
  FaShoppingBag,
  FaUsers,
  FaCog,
  FaList,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export const items = [
  {
    key: "",
    icon: (
      <div className="fs-4">
        <MdDashboard />
      </div>
    ),
    label: "Dashboard",
  },
  {
    key: "",
    icon: (
      <div className="fs-4">
        <FaShoppingCart />
      </div>
    ),
    label: "Products",
    children: [
      {
        key: "all/products",
        icon: (
          <div className="fs-4">
            <FaList />
          </div>
        ),
        label: "All Products",
      },
    ],
  },

  {
    key: "customers",
    icon: (
      <div className="fs-4">
        <FaUsers />
      </div>
    ),
    label: "Customers",
    children: [
      {
        key: "all/customers",
        icon: (
          <div className="fs-4">
            <FaList />
          </div>
        ),
        label: "All Customers",
      },
    ],
  },
  {
    key: "orders",
    icon: (
      <div className="fs-4">
        <FaShoppingBag />
      </div>
    ),
    label: "Orders",
    children: [
      {
        key: "all/orders",
        icon: (
          <div className="fs-4">
            <FaList />
          </div>
        ),
        label: "All Orders",
      },
    ],
  },

  {
    key: "settings",
    icon: (
      <div className="fs-4">
        <FaCog />
      </div>
    ),
    label: "Settings",
    children: [
      {
        key: "all/settings",
        icon: (
          <div className="fs-4">
            <FaList />
          </div>
        ),
        label: "All Settings",
      },
    ],
  },
];
