import React, { useEffect, useState } from "react";
import DetailsBanner from "../DetailsBanner";
import { toast } from "react-toastify";
import PaymentPage from "../../paymentPage/PaymentPage";
import SubHeader from "../../../components/header/subHeader/SubHeader";
import MetaData from "../../metaData/MetaData";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  productsDetails,
  productsFlavours,
} from "../../../redux/features/productSlice";
import {
  ItemsAddedCart,
  clearErr,
  wishListAdd,
} from "../../../redux/features/cartSlice";
import Loader from "../../../components/layout/loader/Loader";
import RecommendedProducts from "./recommendProducts/RecommendedProducts";
import { FaHeart, FaShareAlt } from "react-icons/fa";

const ProductDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const { loading, error, product, recommendedProduct } = useSelector(
    (state) => state.product
  );

  const { flavours } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const { progressing, err, cartItems, wishLists } = useSelector(
    (state) => state.cart
  );

  const userName = user?.name;

  const dispatch = useDispatch();
  const { prod_slug } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [showDelivery, setShowDelivery] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [prodMessage, setProdMessage] = useState("");
  const [isEggChecked, setIsEggChecked] = useState(false);

  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedFlavorCategory, setSelectedFlavorCategory] = useState("");

  const [selectedWeight, setSelectedWeight] = useState(1);
  const weights = [1, 2, 3, 4, 5];
  const [
    selectedFlavorCategoryPriceIncrement,
    setSelectedFlavorCategoryPriceIncrement,
  ] = useState(null);

  const [isWishListed, setIsWishListed] = useState(false);

  const handleFlavorChange = (event) => {
    const selectedFlavorId = event.target.value;
    setSelectedFlavor(selectedFlavorId);
  };

  const options1 = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "#ffd707",
    size: window.innerWidth < 600 ? 12 : 16, // Decreased size values
    isHalf: true,
    value: product?.rating,
  };

  useEffect(() => {
    dispatch(productsFlavours());
  }, [dispatch]);

  useEffect(() => {
    if (err) {
      toast.error(err);
      dispatch(clearErr());
    }
  }, [dispatch, err]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(productsDetails(prod_slug));
  }, [dispatch, error, prod_slug]);

  // const calculateTotalPrice = (basePrice, increment, weight) => {
  //   if (increment !== null) {
  //     return (basePrice + increment).toFixed(2); // Adjust to match your price format
  //   }
  //   return basePrice .toFixed(2);
  // };

  const calculateTotalPrice = (basePrice, increment, weight, isEggless) => {
    let totalPrice = basePrice * weight;
    if (isEggless) {
      totalPrice += 150;
    }
    if (increment !== null) {
      totalPrice += increment;
    }
    return totalPrice.toFixed(2);
  };

  useEffect(() => {
    if (selectedFlavorCategory) {
      const selectedFlavourCategoryItem = flavours
        .find((flavour) => flavour.id === parseInt(selectedFlavor))
        ?.items.find((item) => item.id === parseInt(selectedFlavorCategory));

      if (selectedFlavourCategoryItem) {
        setSelectedFlavorCategoryPriceIncrement(
          selectedFlavourCategoryItem.price
        );
      }
    } else {
      setSelectedFlavorCategoryPriceIncrement(null);
    }
  }, [selectedFlavorCategory, flavours]);

  const increaseQuantity = () => {
    if (product.isInstock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
    setShowDelivery(false);
    setShowInstructions(false);
  };

  const handleShowInstructions = () => {
    setShowInstructions(!showInstructions);
    setShowDetails(false);
    setShowDelivery(false);
  };

  const handleShowDelivery = () => {
    setShowDelivery(!showDelivery);
    setShowDetails(false);
    setShowInstructions(false);
  };

  const dataToSend = cartItems.flatMap((cart) =>
    cart.items.map((item) => ({
      product: item.product.id,
      quantity: item.quantity,
      message: item.message,
      is_eggless: item.is_eggless,
      flavorgroup: item.flavorgroup,
      flavorcategorie: item.flavorcategorie,
    }))
  );

  const wishListData = wishLists?.items?.map((item) => ({
    product: item.product.id,
  }));
  const handleAddWishList = (product) => {
    setIsWishListed(!isWishListed);
    if (userName) {
      const data = {
        user: userName,
        items: [
          {
            product: product.id,
          },
          ...wishListData,
        ],
      };
      dispatch(wishListAdd({ data, toast, navigate }));
    } else {
      toast.error("Please login first!");
      navigate("/login");
    }
  };

  const handleAddCart = (product) => {
    if (userName) {
      const data = {
        customer: userName,
        items: [
          {
            product: product.id,
            quantity: quantity,
            message: prodMessage,
            is_eggless: isEggChecked ? "True" : "False",
            flavorgroup: parseInt(selectedFlavor),
            flavorcategorie: parseInt(selectedFlavorCategory),
          },
          ...dataToSend, // Spread the elements of dataToSend array here
        ],
      };
      dispatch(ItemsAddedCart({ data, toast, navigate }));
    } else {
      toast.error("Please login first!");
      navigate("/login");
    }
  };

  return (
    <>
      <MetaData title="product details" />
      <DetailsBanner />
      <SubHeader />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="font-sans container mx-auto px-8 py-8 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4 bg-[#FFFFFF] border flex justify-center items-center">
                {/* Left Side Image */}
                <div
                  className="relative max-w-md mx-auto overflow-hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img
                    src={product?.product_url}
                    alt="Product"
                    className={`w-full h-auto rounded object-cover cursor-pointer transition-transform duration-300 ${
                      isHovered ? "scale-150" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 hidden md:flex justify-center items-center bg-black bg-opacity-10 rounded-md cursor-zoom-in">
                    {/* Use the same image source for the enlarged version */}
                    <img
                      src={product?.product_url}
                      alt="Product"
                      className={`w-full h-auto rounded-md ${
                        isHovered ? "scale-2" : "scale-0"
                      }`}
                      style={{
                        transformOrigin: "center",
                        transform: isHovered ? "scale(2)" : "scale(0)",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="px-4">
                <div>
                  {/* Right Side Content */}
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">
                    {product?.product_name}
                  </h2>
                  <div className="flex items-center mb-2">
                    <div className="mr-2">
                      {/* Ratings */}
                      <span className="text-yellow-500">
                        <ReactStars {...options1} />
                      </span>
                    </div>
                    <div className="mr-4">
                      {/* Reviews */}
                      <span className="text-gray-600">
                        {product?.product_views}( Customer Reviews)
                      </span>
                    </div>
                    <div className="mr-2">
                      <Link className="text-gray-400">
                        <FaShareAlt />
                      </Link>
                    </div>
                    <div>
                      <Link onClick={() => handleAddWishList(product)}>
                        <FaHeart
                          size={24}
                          className={
                            isWishListed ? "text-red-500 " : "text-gray-300"
                          }
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="mb-4">
                    {/* Price */}
                    <span className="text-3xl text-red-500 font-semibold">
                      {selectedFlavorCategory
                        ? `Rs. ${calculateTotalPrice(
                            product?.price,
                            selectedFlavorCategoryPriceIncrement,
                            selectedWeight,
                            isEggChecked
                          )}`
                        : `Rs. ${calculateTotalPrice(
                            product?.price,
                            null,
                            selectedWeight,
                            isEggChecked
                          )}`}
                    </span>

                    <hr className="border-b border-dotted w-3/5 border-gray-400 mt-2" />
                  </div>
                  {/* isInStock */}
                  {product && (
                    <p
                      className={
                        product.isInstock
                          ? "text-green-500 font-semibold"
                          : "text-red-500 font-semibold"
                      }
                    >
                      {product.isInstock ? "In Stock" : "Out of Stock"}
                    </p>
                  )}
                  {/* Quantity Control */}
                  {/* <div className="flex items-center mt-3 text-gray-700">
                    <span className="mr-2">Qty:</span>
                    <div className="flex">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded-l"
                        onClick={decreaseQuantity}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-12 px-2 py-1 text-center focus:outline-none bg-gray-100"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        min={1}
                      />
                      <button
                        className="px-2 py-1 bg-gray-200 rounded-r"
                        onClick={increaseQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div> */}

                  <div className="mb-4">
                    <p className="font-semibold text-gray-700 my-2">
                      Choose Weight (in pounds)
                    </p>
                    <div className="flex items-center">
                      {weights.map((weight) => (
                        <label
                          key={weight}
                          htmlFor={`weight${weight}`}
                          className="flex items-center mr-4"
                        >
                          <input
                            type="checkbox"
                            id={`weight${weight}`}
                            className="mr-2 h-4 w-4"
                            checked={selectedWeight === weight}
                            onChange={() => setSelectedWeight(weight)}
                          />
                          <span>{weight}lb</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    {/* Special Requests */}
                    <p className="font-semibold text-gray-700 my-1">
                      Special Requests:
                    </p>
                    <div>
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id="eggless"
                          className="mr-1 h-4 w-4"
                          checked={isEggChecked}
                          onChange={() => setIsEggChecked(!isEggChecked)}
                        />
                        <label htmlFor="eggless" className="mr-4">
                          Eggless [+ Rs.150.0/ lb]
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 md:flex md:space-x-4">
                    <div className="md:w-1/2">
                      {/* Select Flavor */}
                      <label
                        htmlFor="flavor"
                        className="font-semibold text-gray-700 mb-2 block"
                      >
                        Select Flavor Basic:
                      </label>
                      <select
                        id="flavor"
                        className="w-full border focus:outline-none rounded py-2 px-3"
                        onChange={(e) => {
                          handleFlavorChange(e);
                          setSelectedFlavor(e.target.value);
                        }}
                        value={selectedFlavor}
                      >
                        <option value="">Select flavour</option>
                        {flavours &&
                          flavours.map((flavour) => (
                            <option key={flavour.id} value={flavour.id}>
                              {flavour.flavorName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="md:w-1/2 mt-4 md:mt-0">
                      {/* Select Flavor category */}
                      <label
                        htmlFor="flavorCategory"
                        className="font-semibold text-gray-700 mb-2 block"
                      >
                        Select Flavor Category:
                      </label>
                      <select
                        id="flavorCategory"
                        className="w-full border focus:outline-none rounded py-2 px-3"
                        onChange={(e) =>
                          setSelectedFlavorCategory(e.target.value)
                        }
                        value={selectedFlavorCategory}
                      >
                        <option value="">Select flavor category</option>
                        {selectedFlavor &&
                          flavours
                            .find(
                              (flavour) =>
                                flavour.id === parseInt(selectedFlavor)
                            )
                            ?.items.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.flavorCategorieName} (+{item.price})
                              </option>
                            ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-40 my-2">
                    <h3 className="text-gray-700 font-semibold">Message</h3>
                    <textarea
                      className="col-span-40 h-12 p-2 border rounded text-sm focus:outline-none"
                      placeholder="What would you like to write on the cake?"
                      value={prodMessage}
                      onChange={(e) => setProdMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4 flex space-x-2">
                    {/* Buttons */}
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-64"
                      disabled={product?.isInstock < 1 ? true : false}
                      onClick={() => handleAddCart(product)}
                    >
                      Add to Cart{progressing && <span>.......</span>}
                    </button>
                    <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-64">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-xl text-gray-500">Product Description</h2>

            <div className="mb-4 bg-gray-50 border flex flex-col">
              <div className="flex flex-wrap">
                <h2
                  className={`py-2 px-2 font-semibold hover:text-red-500 cursor-pointer bg-accordion my-2 ${
                    showDetails ? "text-red-500 border border-red-500" : ""
                  }`}
                  onClick={handleToggleDetails}
                >
                  Product Details
                </h2>
                <h2
                  className={`text-gray-700 hover:text-red-500 font-semibold cursor-pointer py-2 px-2 mr-4 my-2 ${
                    showDelivery ? "text-red-500 border border-red-500" : ""
                  }`}
                  onClick={handleShowDelivery}
                >
                  Delivery Information
                </h2>
                <h2
                  className={`text-gray-700 py-2 hover:text-red-500 cursor-pointer font-semibold my-2 ${
                    showInstructions ? "text-red-500 border border-red-500" : ""
                  }`}
                  onClick={handleShowInstructions}
                >
                  Instructions
                </h2>
              </div>

              {showDetails && (
                <ul className="list-disc w-full sm:w-3/5 bg-[#FFFFFF] pl-6 mt-2">
                  {product?.description?.split("\n").map((line, index) => (
                    <li key={index} className="mb-2">
                      {line}
                    </li>
                  ))}
                </ul>
              )}

              {showDelivery && (
                <ul className="list-disc w-full sm:w-3/5 bg-[#FFFFFF] pl-6 mt-2">
                  <li className="text-gray-700">
                    Every cake we offer is handcrafted and since each bakery has
                    its own way of baking and designing a cake, there might be
                    slight variation in the product in terms of design and
                    shape.
                  </li>
                  <li className="text-gray-700">
                    The chosen delivery time is an estimate and depends on the
                    availability of the product and the destination to which you
                    want the product to be delivered.
                  </li>
                  <li className="text-gray-700">
                    Since cakes are perishable in nature, we attempt delivery of
                    your order only once. The delivery cannot be redirected to
                    any other address.
                  </li>
                  <li className="text-gray-700">
                    This product is hand-delivered and will not be delivered
                    along with courier products.
                  </li>
                  <li className="text-gray-700">
                    Occasionally, substitutions of flavors/designs are necessary
                    due to temporary unavailability issues.
                  </li>
                  <li className="text-gray-700">
                    Delivery available at Kathmandu, Lalitpur, and Bhaktapur.
                  </li>
                </ul>
              )}

              {showInstructions && (
                <ul className="list-disc w-full sm:w-3/5 bg-[#FFFFFF] pl-6 mt-2">
                  <li className="text-gray-700">
                    Store cream cakes in a refrigerator. Fondant cakes should be
                    stored in an air-conditioned environment.
                  </li>
                  <li className="text-gray-700">
                    Slice and serve the cake at room temperature and make sure
                    it is not exposed to heat.
                  </li>
                  <li className="text-gray-700">
                    Use a serrated knife to cut a fondant cake
                  </li>
                  <li className="text-gray-700">
                    Sculptural elements and figurines may contain wire supports
                    or toothpicks or wooden skewers for support.
                  </li>
                  <li className="text-gray-700">
                    Please check the placement of these items before serving to
                    small children.
                  </li>
                  <li className="text-gray-700">
                    The cake should be consumed within 24 hours.
                  </li>
                  <li className="text-gray-700">Enjoy your cake!</li>
                </ul>
              )}
            </div>
            <RecommendedProducts recommendedProduct={recommendedProduct} />
          </div>
        </>
      )}
      <div className="mt-8">
        <PaymentPage />
      </div>
    </>
  );
};

export default ProductDetails;
