import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Loader from "./components/layout/loader/Loader";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import About from "./pages/aboutUs/About";
import MainLayout from "./components/admin/sidebar/MainLayout";
import AdminDashBoard from "./components/admin/dashboard/AdminDashBoard";
import ProductsList from "./components/admin/adminBody/productList/ProductsList";
import AddProduct from "./components/admin/adminBody/addProduct/AddProduct";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/changePassword/ChangePassword";
import ProtectedRoute from "./components/layout/protectedRoute/ProtectedRoute";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import ProductDetails from "./pages/productsDetailsBanner/productDetails/ProductDetails";
import { useSelector } from "react-redux";
import CategoryRelatedProducts from "./pages/orderWedding/CategoryRelatedProducts";
import ShippingDetails from "./pages/shippingInfo/ShippingDetails";
import ConfirmOrder from "./pages/confirmOrder/ConfirmOrder";
import MyOrders from "./pages/myOrders/MyOrders";
import NoCartDetails from "./pages/cart/noCart/NoCartDetails";
import Payment from "./pages/payment/Payment";
import OrderSuccess from "./pages/orderSuccess/OrderSuccess";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import TermsConditions from "./pages/termsConditions/TermsConditions";
import MyWishList from "./pages/myWishList/MyWishList";
import AllFeatureProducts from "./pages/allSearchProducts/AllFeatureProducts";
import Unauthorize from "./pages/unauthorize/Unauthorize";
import ScrollTop from "./components/layout/scrollTop/ScrollTop";

const ContactUs = lazy(() => import("./pages/contact/ContactUs"));

const CartDetails = lazy(() => import("./pages/cart/CartDetails"));

const Home = lazy(() => import("./pages/home/Home"));

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <ToastContainer position="bottom-right" />

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/admin/da-bakery/dashboard-panel"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  is_admin={user?.is_admin}
                >
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashBoard />} />
              <Route path="add/product" element={<AddProduct />} />
              <Route path="all/products" element={<ProductsList />} />
            </Route>
            {/* <Route path="/admin/dashboard" element={<AdminRoutes />} /> */}
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route
                      path="/all/features-products/:keyword"
                      element={<AllFeatureProducts />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route
                      path="/terms/conditions"
                      element={<TermsConditions />}
                    />

                    <Route
                      path="/reset/password/:uid/:token"
                      element={<ResetPassword />}
                    />

                    <Route
                      path="/forgot/password"
                      element={<ForgotPassword />}
                    />

                    <Route
                      path="/profile/information"
                      element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/wishlist"
                      element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                          <MyWishList />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/change/password"
                      element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                          <ChangePassword />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/category/related/products/:category_slug"
                      element={<CategoryRelatedProducts />}
                    />

                    <Route
                      path="/product/details/:prod_slug"
                      element={<ProductDetails />}
                    />
                    <Route
                      path="/shipping/details"
                      element={
                        <ProtectedRoute>
                          <ShippingDetails />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/confirm/order"
                      element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                          <ConfirmOrder />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/payment"
                      element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                          <Payment />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/payment/success"
                      element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                          <OrderSuccess />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/cart/details"
                      element={
                        isAuthenticated ? <CartDetails /> : <NoCartDetails />
                      }
                    />

                    <Route
                      path="/my/orders"
                      element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                          <MyOrders />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/order/details/:id"
                      element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                          <OrderDetails />
                        </ProtectedRoute>
                      }
                    />

                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/unauthorize" element={<Unauthorize />} />
                  </Routes>
                  <ScrollTop />
                  <Footer />
                </>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
// const AdminRoutes = () => (
//   <MainLayout hideHeader hideFooter>
//     <Route index element={<AdminDashBoard />} />
//   </MainLayout>
// );

export default App;
