import React from "react";
import MetaData from "../metaData/MetaData";
import SubHeader from "../../components/header/subHeader/SubHeader";

const ContactUs = () => {
  return (
    <>
      <MetaData title="Oho-Contact Us" />
      <SubHeader />
      <div className="font-sans flex flex-col md:flex-row justify-between items-center py-10 px-5 mx-4 ">
        <div className="w-full md:w-1/2 flex-grow overflow-hidden md:pr-10">
          <div className="min-h-full" style={{ width: "100%" }}>
            <iframe
              title="Smart Tech Solution Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.851835961906!2d85.33144727520518!3d27.69097387619189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199328e344bd%3A0x1e439982e75c14c4!2sSmart%20Tech%20Solution%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1684069044044!5m2!1sen!2snp"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              height="300px" // change this value
              width="700px"
            ></iframe>
          </div>
          <div className=" py-4">
            <p className="font-medium text-lg">
              Smart Tech Solution Pvt. Ltd..
            </p>
            <p className="mt-2 text-gray-500">Aloknagar, Kathmandu</p>
            <p className="mt-2 text-gray-500">Phone: 015911306</p>
            <p className="mt-2 text-gray-500">Email: info@ohocake.com</p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h4 className="text-xl font-bold text-gray-500 px-5">
            SEND US A MESSAGE
          </h4>
          <form className=" rounded-lg overflow-hidden px-5 py-4">
            <div className="flex flex-col mb-4 md:flex-row">
              <div className="flex-grow md:mr-2">
                <label
                  htmlFor="first_name"
                  className="font-medium text-gray-500 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent w-full"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="flex-grow md:ml-2">
                <label
                  htmlFor="last_name"
                  className="font-medium mb-2 text-gray-500 "
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent w-full"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="contact_number"
                className="font-medium mb-2 text-gray-500"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="contact_number"
                name="contact_number"
                className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent w-full"
                placeholder="Enter your contact number"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="message"
                className="text-lg font-medium mb-2 text-gray-500 "
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className=" border-2 focus:outline-none focus:ring-0 focus:ring-blue-200 rounded-lg py-2 px-3 h-40 w-full"
                placeholder="Enter your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white  py-2 px-4 rounded w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
