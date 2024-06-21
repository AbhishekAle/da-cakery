import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";

export const DataGrid = [
  {
    id: 1,
    icon: <IoBagHandle />,
    title: "Total Sales",
    income: 54232,
    index: 343,
    path: "/sales",
  },
  {
    id: 2,
    icon: <IoPieChart />,
    title: "Total Expenses",
    income: 3423,
    index: -343,
    path: "/expenses",
  },
  {
    id: 3,
    icon: <IoPeople />,
    title: "Total customers",
    income: 232,
    index: -43,
    path: "/customers",
  },
  {
    id: 4,
    icon: <IoCart />,
    title: "Total Orders",
    income: 16232,
    index: -43,
    path: "/orders",
    color: "text-red-500",
  },
];
