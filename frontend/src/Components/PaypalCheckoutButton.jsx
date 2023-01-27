import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from "@chakra-ui/react";

const PaypalCheckoutButton = (props) => {
  const toast = useToast();
  const { total, tranSucess } = props;

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderId) => {
    setPaidFor(true);
  };

  if (paidFor) {
    tranSucess(paidFor);
  }

  if (error) {
    toast({
      title: "Faild Process.",
      description: "Payment Faild....",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <PayPalScriptProvider
     
    >
      <PayPalButtons
        onClick={(data, actions) => {
          const hasAlreadyBoughtCourse = false;
          if (hasAlreadyBoughtCourse) {
            setError("You Already Booked");
            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "SuccessFul Process",
                amount: {
                  value: total,
                },
              },
            ],
          });
        }}
        onApprove={async (data, action) => {
          const order = await action.order.capture();
          handleApprove(data.orderID);
        }}
        onCancel={() => {
          toast({
            title: "Faild.",
            description: "Payment Fail....",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }}
        onError={(err) => {
          setError(err);
          console.log("PayPal Checkout onError", err);
        }}
        onSuccess={(payment) => {
          tranSucess(payment);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckoutButton;
