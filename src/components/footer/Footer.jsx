import React from "react";
import {
  FaFacebook,
  FaPhone,
  FaInstagram,
  FaLinkedin,
  FaMapMarker,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import GooglePay from "../../assets/images/GooglePay.png";
import AppStore from "../../assets/images/AppStore.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="font-sans bg-gray-900 text-white py-8">
        <div className="container mx-auto flex flex-wrap justify-center">
          {/* Deals and offers */}
          <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
            <h4 className="text-lg font-bold mb-4 text-center">
              Inside Deals and offers
            </h4>
            <div className="flex flex-col items-center">
              <Link to="/google-play">
                <img
                  src={GooglePay}
                  alt="Google Pay"
                  className="w-32 h-auto mb-2"
                />
              </Link>
              <Link to="/app-store">
                <img src={AppStore} alt="App Store" className="w-32 h-auto" />
              </Link>
            </div>
          </div>
          {/* Links */}
          <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
            <h4 className="text-lg font-bold mb-4">Links</h4>
            <ul className="list-reset">
              <li className="mb-2">
                <Link to="/about" className="hover:text-gray-400">
                  About us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="hover:text-gray-400">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="hover:text-gray-400">
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="hover:text-gray-400">
                  FAQ's
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="hover:text-gray-400">
                  Hiring
                </Link>
              </li>
            </ul>
          </div>
          {/* Policies */}
          <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
            <h4 className="text-lg font-bold mb-4">Policies</h4>
            <ul className="list-reset">
              <li className="mb-2">
                <Link to="/terms/conditions" className="hover:text-gray-400">
                  Terms & Conditions
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms/conditions" className="hover:text-gray-400">
                  Data Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms/conditions" className="hover:text-gray-400">
                  Return Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms/conditions" className="hover:text-gray-400">
                  Refund Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms/conditions" className="hover:text-gray-400">
                  G-Cash Policy
                </Link>
              </li>
            </ul>
          </div>
          {/* Find us */}
          <div className="w-full md:w-1/4 px-4 md:mb-0">
            <h4 className="text-lg font-bold mb-4">GET IN TOUCH WITH US</h4>
            <ul className="list-reset">
              <li className="mb-2">
                <Link
                  to="email:info@ohocake.com"
                  className="hover:text-gray-400"
                >
                  <span className="inline-block mr-2">
                    <MdEmail />
                  </span>
                  Email: info@ohocake.com
                </Link>
              </li>
              <li className="mb-2">
                <Link to="tel:015911306" className="hover:text-gray-400">
                  <span className="inline-block mr-2">
                    <FaPhone />
                  </span>
                  Phone: 015911306
                </Link>
              </li>
              <li className="mb-2">
                <Link to="Aloknagar, Kathmandu" className="hover:text-gray-400">
                  <span className="inline-block mr-2">
                    <FaMapMarker />
                  </span>
                  Address: Aloknagar, Kathmandu
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">
                  <span className="inline-block mr-2">
                    <FaFacebook />
                  </span>
                  Facebook
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">
                  <span className="inline-block mr-2">
                    <FaInstagram />
                  </span>
                  Instagram
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:text-gray-400">
                  <span className="inline-block mr-2">
                    <FaLinkedin />
                  </span>
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="bg-gray-900 text-center text-gray-400 mt-2">
          2023 Cake Company | All rights reserved.
        </p>
      </footer>
    </>
  );
};

// {
//    <iframe
//   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.851835961906!2d85.33144727520518!3d27.69097387619189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199328e344bd%3A0x1e439982e75c14c4!2sSmart%20Tech%20Solution%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1684069044044!5m2!1sen!2snp"
//   width="600"
//   height="450"
//   style="border:0;"
//   allowfullscreen=""
//   loading="lazy"
//   referrerpolicy="no-referrer-when-downgrade"
// ></iframe>;
// }

export default Footer;
