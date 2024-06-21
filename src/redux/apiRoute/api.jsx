import axios from "axios";
import Cookies from "js-cookie";

const devEnv = import.meta.env.MODE !== "production";
const devApiUrl = import.meta.env.VITE_DEV_API;
const prodApiUrl = import.meta.env.VITE_PROD_API;

const API = axios.create({
  baseURL: prodApiUrl,
});

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Get token from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// API.interceptors.request.use(
//   (config) => {
//     if (localStorage.getItem("token")) {
//       config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const userRegister = (registerValue) =>
  API.post("/register", registerValue);

export const userLogin = (loginValue) => API.post("/login", loginValue);
export const userProfile = () => API.get("/profile");
export const updatePassword = (changePasswordValue) =>
  API.post("/change/password", changePasswordValue);

//update profile
export const updateProfile = (updateForm) =>
  API.put("/update/profile", updateForm);

//forget password
export const forgotPassword = (forgotValue) =>
  API.post("/forgot/password", forgotValue);

export const resetPassword = (uid, token, resetValue) =>
  API.post(`/reset/password/${uid}/${token}`, resetValue);

//products route
export const listProducts = () => API.get("/products/list");
export const detailsProducts = (prod_slug) =>
  API.get(`/products/details/${prod_slug}`);
//popular products
export const popularProducts = () => API.get("/products/popular-products");
export const categoryProducts = () => API.get("/products/category");

export const relatedProducts = (category_slug) =>
  API.get(`/products/category/related/${category_slug}`);

//orders api
export const orderProducts = () => API.get("/orders/list");

//create order
export const createOrder = (order) => API.post("/orders/", order);
//get all orders
export const orderList = () => API.get("/orders/");

//single order
export const singleOrder = (id) => API.get(`/orders/single/order/${id}`);

//get cart orders
export const getCartItems = () => API.get("/cart/");
export const addCartItems = (data) => API.post("/cart/", data);
//delete cart
export const deleteCartItems = (id) => API.delete(`/cart/delete/${id}`);

//get district api
export const getDistrict = () => API.get("/orders/district");

//add shippingInInfo
export const addShippingDetails = (shippingValue) =>
  API.post("/orders/user/home", shippingValue);

//get shippingInfo
export const getShippingDetails = () => API.get("/orders/user/home");

//get products flavour
export const getProductFlavours = () => API.get("/products/flavor");

//get wishList
export const getWishList = () => API.get("/cart/whichlist");

//add wishList
export const addWishList = (data) => API.post("/cart/whichlist", data);
