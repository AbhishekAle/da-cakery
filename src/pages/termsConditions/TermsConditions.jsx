import React from "react";
import MetaData from "../metaData/MetaData";
import SubHeader from "../../components/header/subHeader/SubHeader";

const TermsConditions = () => {
  return (
    <>
      <MetaData title="Oho cake privacy and policy" />
      <SubHeader />
      <div className="font-sans bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-4">
            <span className="text-red-500">Privacy</span> & Policy
          </h1>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Introduction</h2>
            <p>
              Welcome to Oho Cake Bakery's Privacy & Policy page. At Oho Cake
              Bakery, we are committed to safeguarding your privacy and ensuring
              the security of the information you provide to us.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow mt-4">
            <h2 className="text-xl font-semibold mb-2">
              Information Collection
            </h2>
            <p>
              When you use our online bakery shop, we may collect personal
              information such as your name, email address, shipping address,
              and payment details. This information is used solely for the
              purpose of processing and delivering your orders.
            </p>
            <p>
              Additionally, we may collect non-personal information, such as
              browsing patterns and website usage statistics, to improve your
              shopping experience and optimize our website.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow mt-4">
            <h2 className="text-xl font-semibold mb-2">Data Usage</h2>
            <p>
              Oho Cake Bakery uses your personal information to process orders,
              provide customer support, and improve our services. We do not
              share your information with third parties for marketing purposes.
            </p>
            <p>
              By using our website, you consent to the collection and use of
              your information as described in this Privacy & Policy.
            </p>
          </div>

          {/* Return Policy Section */}
          <div className="bg-white p-6 rounded shadow mt-4">
            <h2 className="text-xl font-semibold mb-2">Return Policy</h2>
            <p>
              At Oho Cake Bakery, we want you to be completely satisfied with
              your order. If you receive a product that is damaged or doesn't
              meet your expectations, please contact us within 3 days of
              receiving your order, and we will assist you with a return or
              replacement.
            </p>
            <p>
              Please note that personalized or custom-made items may not be
              eligible for return unless they are defective or incorrect due to
              our error.
            </p>
          </div>

          {/* Refund Policy Section */}
          <div className="bg-white p-6 rounded shadow mt-4">
            <h2 className="text-xl font-semibold mb-2">Refund Policy</h2>
            <p>
              In the event of a return, you may be eligible for a refund or
              replacement. Refunds will be processed within 5 business days
              after we receive the returned product. If a replacement is not
              available, a refund will be issued to your original payment
              method.
            </p>
            <p>
              For custom-made or personalized items, refunds will only be issued
              in the case of defects or errors caused by our bakery.
            </p>
          </div>

          {/* G-Cash Policy Section */}
          <div className="bg-white p-6 rounded shadow mt-4">
            <h2 className="text-xl font-semibold mb-2">G-Cash Policy</h2>
            <p>
              Oho Cake Bakery accepts G-Cash as a payment method for your
              convenience. When using G-Cash, please ensure that the payment is
              completed successfully before confirming your order. Any issues
              related to G-Cash transactions should be addressed with G-Cash's
              customer support.
            </p>
            <p>
              Oho Cake Bakery is not responsible for any problems arising from
              G-Cash transactions, including payment failures or unauthorized
              use of your G-Cash account.
            </p>
          </div>

          {/* Add more sections about data protection, cookies, user rights, etc. */}

          <div className="bg-white p-6 rounded shadow mt-4">
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p>
              If you have any questions or concerns about our Privacy & Policy,
              please contact our team at privacy@ohocakes.com. We are here to
              assist you and provide further information.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
