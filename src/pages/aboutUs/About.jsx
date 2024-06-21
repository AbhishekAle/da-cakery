import React, { useState } from "react";
import AboutImg from "../../assets/images/About.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MetaData from "../metaData/MetaData";
import AboutMore from "./AboutMore";
import SubHeader from "../../components/header/subHeader/SubHeader";

const About = () => {
  const [showMore, setShowMore] = useState(false);

  const handleLearnMoreClick = () => {
    setShowMore(true);
  };

  return (
    <>
      <MetaData title="about" />
      <SubHeader />
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold leading-none sm:text-4xl">
              About <span className="text-red-500">Oho! Cake</span>
            </h2>
            <p className="mb-4 text-gray-700">
              "We bring to you an online cake delivery service where you can
              purchase and order your favorite cakes - creating a unique bakery
              shopping experience without having to hop from one shop or website
              to another looking for your desired cake. We ambitiously claim to
              deliver 100% fresh cakes at your doorstep with complete ease and
              care on the same day or as planned.
            </p>
            {showMore ? (
              <>
                <p className="mb-4 text-gray-700">
                  Our online cake delivery in Kathmandu, Bhaktapur, and Lalitpur
                  allows for cross-country purchases enabling you to send
                  delicious cakes to your parents, relatives, or friends on
                  various occasions from any part of the world. We are here to
                  create some unforgettable memories and some undying emotions
                  by helping you to send cake to your beloved ones online. We
                  invite you to celebrate your special occasions with your
                  favorite cakes from oho! cake."
                </p>
              </>
            ) : null}
            {!showMore ? (
              <Link
                to=""
                className="inline-block py-2 px-4 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                onClick={handleLearnMoreClick}
              >
                Learn More
              </Link>
            ) : null}
          </div>
          <div className="flex justify-center">
            <motion.img
              src={AboutImg}
              alt="Oho! Cake"
              className="w-full h-full max-w-md object-contain"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </div>
        {showMore ? <AboutMore /> : ""}
      </div>
    </>
  );
};

export default About;
