import React, { useEffect } from "react";
import "./ConfirmOrder.css";
import MetaData from "../metaData/MetaData";
import SubHeader from "../../components/header/subHeader/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckOutSteps from "../../components/checkOutSteps/CheckOutSteps";
import { toast } from "react-toastify";
import {
  allShippingDetails,
  clearError,
} from "../../redux/features/orderSlice";
import Loader from "../../components/layout/loader/Loader";

const ConfirmOrder = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { shippings, loading, error } = useSelector((state) => state.order);

  const location = useLocation();
  const addressData = location.state?.address;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const proceedToPayment = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment", { state: { addressData } });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(allShippingDetails());
  }, [dispatch, error]);

  const subTotal =
    cartItems && Array.isArray(cartItems)
      ? cartItems
          .flatMap((cart) =>
            cart.items?.map(
              (item) => Number(item.product.price) * Number(item.quantity)
            )
          )
          .reduce((acc, cost) => acc + cost, 0)
      : 0;

  //   const shippingCharges = subtotal > 1000 ? 0 : 200;
  const shippingCharges = 100;

  const tax = subTotal * 0.18;

  const totalPrice = subTotal + tax + shippingCharges;

  // const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;
  return (
    <>
      <MetaData title="confirm order" />
      <SubHeader />
      <CheckOutSteps activeStep={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <span className="text-gray-600 font-bold">Shipping Info</span>
            {loading ? (
              <Loader />
            ) : (
              <div>
                {addressData ? (
                  <div className="confirmShippingAreaBox">
                    <div>
                      <p>Name:</p>
                      <span>{addressData.fullName}</span>
                    </div>
                    <div>
                      <p>Contact:</p>
                      <span>
                        {addressData.phoneNo},{addressData.altPhoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Alias:</p>
                      <span>{addressData.alies}</span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {addressData.location}, {addressData.district},
                        {addressData.landMark}
                      </span>
                    </div>
                  </div>
                ) : (
                  shippings &&
                  shippings.map((shipping, index) => (
                    <div key={shipping.id} className="confirmShippingAreaBox">
                      <div>
                        <p>Name:</p>
                        <span>{shipping?.fullName}</span>
                      </div>
                      <div>
                        <p>Contact:</p>
                        <span>
                          {shipping.phoneNo},{shipping.altPhoneNo}
                        </span>
                      </div>
                      <div>
                        <p>Alias:</p>
                        <span>{shipping.alies}</span>
                      </div>
                      <div>
                        <p>Address:</p>
                        <span>
                          {shipping.location}, {shipping.district},
                          {shipping.landMark}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div className="confirmCartItems">
            <span className="text-gray-600 font-bold">Your Cart Items:</span>
            <div className="confirmCartItemsContainer">
              {cartItems && cartItems.length > 0 ? (
                cartItems.flatMap((cart) =>
                  cart.items.map((item) => (
                    <div key={item.id}>
                      <img src={item.product.product_url} alt="Product" />
                      <Link to={`/product/details/${item.product.prod_slug}`}>
                        {item.product.product_name}
                      </Link>
                      <span>
                        {item.quantity} X Rs.{item.product.price} =
                        <b>Rs.{item.product.price * item.quantity}</b>
                      </span>
                    </div>
                  ))
                )
              ) : (
                <>
                  <h1 className="text-center">No Data found</h1>
                </>
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <span className="text-gray-600 font-bold">Order Summery</span>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs.{subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs.{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>Rs.{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span className="text-gray-600 font-bold">Rs.{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
