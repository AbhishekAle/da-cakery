import React, { useEffect, useState } from "react";
import MetaData from "../metaData/MetaData";
import SubHeader from "../../components/header/subHeader/SubHeader";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaKey, FaShoppingCart, FaStar, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/layout/loader/Loader";
import {
  clearError,
  profile,
  profileUpdate,
} from "../../redux/features/authSlice";
import Spinner from "../../components/layout/spinner/Spinner";

const Profile = () => {
  const { isLoading, loading, error, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateValue, setUpdateValue] = useState({
    name: "",
    email: "",
    phone_No: "",
    role: "",
  });

  const { name, email, phone_No, role } = updateValue;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUpdateValue({ ...updateValue, [name]: value });
  };

  useEffect(() => {
    if (user) {
      setUpdateValue({
        name: user.name || "",
        email: user.email || "",
        phone_No: user.phone_No || "",
        role: user.is_user || "",
      });
      setAvatarPreview(user?.avatar_url || "");
    }
  }, [user]);
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setAvatar(file); // Update the avatar state with the file object
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateForm = new FormData();
    updateForm.append("name", name);
    updateForm.append("avatar", avatar);

    dispatch(profileUpdate({ updateForm, navigate, toast }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(profile());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="profile" />
      <SubHeader />

      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col lg:flex-row justify-center mt-8 my-5 space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="lg:w-1/4 border px-4 py-4 border-gray-300">
            {/* Sidebar */}
            <div className="flex flex-col justify-start h-full">
              <div className="my-2 text-gray-700 text-base sm:text-lg font-bold mb-0">
                Orders
              </div>
              <hr />
              <Link to="/my/orders">
                <FaShoppingCart className="inline-block mr-2" />
                <span>My Orders</span>
              </Link>
              <Link to="/my/reviews">
                <FaStar className="inline-block mr-2" />
                <span>My reviews</span>
              </Link>
              <Link to="/wishlist">
                <FaHeart className="inline-block mr-2" />
                <span>My WishList</span>
              </Link>
              <div className="my-2  text-gray-700 text-base sm:text-lg font-bold mb-0">
                Security
              </div>
              <hr />
              <Link to="/change/password">
                <FaKey className="inline-block mr-2" />
                <span>ChangePassword</span>
              </Link>
              <Link>
                <FaUser className="inline-block mr-2" />

                <span>Update Profile</span>
              </Link>
            </div>
          </div>

          <div className="lg:w-2/5 lg:pl-4 lg:pr-4">
            <form onSubmit={handleSubmit} className="lg:pr-4">
              <div className="mb-4 w-1/2">
                <label htmlFor="name" className="block mb-2 text-gray-700">
                  NAME
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="border focus:outline-none border-gray-300 px-2 py-1 w-80"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              {/* Email */}
              <div className="mb-4 w-1/2">
                <label htmlFor="email" className="block mb-2 text-gray-700">
                  EMAIL
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="border focus:outline-none border-gray-300 px-2 py-1 w-80"
                  value={email}
                  onChange={handleChange}
                  disabled
                />
              </div>
              {/* Mobile No */}
              <div className="mb-4 w-1/2">
                <label htmlFor="phone text-gray-700">Phone number</label>

                <input
                  id="phone_No"
                  name="phone_No"
                  type="number"
                  className="border focus:outline-none border-gray-300 px-2 py-1 w-80"
                  value={phone_No}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className="mb-4 w-1/2">
                <label htmlFor="role" className="block mb-2 text-gray-700">
                  ROLES
                </label>
                <input
                  id="role"
                  name="is_user"
                  type="text"
                  className="border focus:outline-none border-gray-300 px-2 py-1 w-80"
                  value={role ? "normal Users" : "admin"}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded">
                {isLoading && <Spinner />}Save
              </button>
            </form>
          </div>
          <div className="lg:w-1/4">
            <div className="w-56 h-56 border border-gray-300 relative mx-auto">
              {/* Image Upload */}
              <label
                htmlFor="imgFile"
                className="w-full h-full flex items-center justify-center cursor-pointer"
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="profile"
                    className="object-cover w-full h-full cursor-pointer"
                    // onClick={handleImageClick}
                  />
                ) : (
                  <span>Select Image</span>
                )}
              </label>
              <input
                id="imgFile"
                type="file"
                name="avatar"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
