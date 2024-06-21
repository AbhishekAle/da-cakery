import React, { useEffect, useState } from "react";
import MetaData from "../metaData/MetaData";
import SubHeader from "../../components/header/subHeader/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addOrder, clearError } from "../../redux/features/orderSlice";
import Spinner from "../../components/layout/spinner/Spinner";
import { clearCart } from "../../redux/features/cartSlice";

const Payment = () => {
  const { user } = useSelector((state) => state.auth);
  const { error, loading, shippings } = useSelector((state) => state.order);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("");
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const address = location.state?.addressData;

  const order = {
    user: user.name,
    shipping_details: {
      id: address ? address.id : shippings[0]?.id,
      districts: address ? address.district : shippings[0]?.district,
    },
    items: cartItems.flatMap((cart) =>
      cart.items.map((item) => ({
        product: item.product?.id,
        quantity: item.quantity,
        is_eggless: item.is_eggless,
        flavorgroup: item.flavorgroup,
        flavorcategorie: item.flavorcategorie,
      }))
    ),
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    payment_method: "cod",
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCompletePaid = (e) => {
    e.preventDefault();

    if (paymentMethod === "cash-on-delivery") {
      dispatch(addOrder({ order, navigate, toast }));

      setTimeout(() => {
        dispatch(clearCart());
      }, 4000); // 4 seconds delay (4000 milliseconds)
    } else if (paymentMethod === "online") {
      // Perform online payment logic here
      // You can redirect the user to the payment gateway or perform any necessary actions

      // Example code to simulate a successful online payment

      dispatch(addOrder({ order, navigate, toast }));
    } else {
      toast.error("There are some issues while processing payment!");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="payment" />
      <SubHeader />
      <div className="font-sans container mx-auto px-8 py-8">
        <h2 className="text-2xl font-semibold mb-4">Payment</h2>
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block font-medium text-lg">
              Select Payment Method:
            </label>
            <select
              className="mt-2 block w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="">Select an option</option>
              <option value="cash-on-delivery">Cash on Delivery</option>
              <option value="online">Online</option>
            </select>
          </div>

          {paymentMethod === "cash-on-delivery" && (
            <div className="bg-white shadow-md rounded-md p-6">
              <h3 className="text-lg font-semibold mb-2">Cash on Delivery</h3>
              <p className="text-gray-600">
                Your full and final payment is:
                <span className="font-bold">
                  Rs. {orderInfo && orderInfo.totalPrice}
                </span>
              </p>
              <p className="text-gray-600 mt-4">
                Please keep the exact amount ready as our delivery person may
                not carry change.
              </p>
              <button
                className="bg-red-600 text-white rounded-md px-4 py-2 mt-4"
                onClick={handleCompletePaid}
              >
                {loading && <Spinner />}Complete Paid
              </button>
            </div>
          )}

          {paymentMethod === "online" && (
            <div className="bg-white shadow-md rounded-md p-6">
              <h3 className="text-lg font-semibold mb-2">Online Payment</h3>
              <p className="text-gray-600">
                You will be redirected to the payment gateway for online
                payment.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
