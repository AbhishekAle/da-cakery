import React from "react";
import Stepper from "react-stepper-horizontal";

const CheckOutSteps = ({ activeStep }) => {
  const steps = [
    {
      title: "Shipping Details",
    },
    {
      title: "Confirm Order",
    },
    {
      title: "Payment",
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  const stepperStyles = {
    connectorLineColor: "red",
    activeColor: "#28a745",
    completeColor: "#28a745",
  };

  return (
    <>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        style={stepStyles}
        {...stepperStyles}
      />
    </>
  );
};

export default CheckOutSteps;
