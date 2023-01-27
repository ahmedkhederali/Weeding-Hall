import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";
import { useColorModeValue, useToast } from "@chakra-ui/react";
import { addedNewBook } from "../services/BookService";

const ChackoutForm = ({
  hallRef,
  firstname,
  lastname,
  firstnamear,
  lastnamear,
  religion,
  email,
  religionar,

  address,
  addressar,
  nationalid,
  phone,

  hallName,
  hallPrice,
  hallPhone,
  hallLocation,
  date,
  cake,
  priceOfOneCake,
  cans,
  pricOneCans,
  totalprice,
}) => {
  
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  var payByPaymentGetway;

  const colors2 = useColorModeValue("black.300", "white.900");
  const toast = useToast();

  console.log(elements);
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    // Add Book To Database
    addedNewBook(
      hallRef,
      firstname,
      lastname,
      firstnamear,
      lastnamear,
      religion,
      email,
      religionar,
      address,
      addressar,
      nationalid,
      phone,
      hallName,
      hallPrice,
      hallPhone,
      hallLocation,
      date,
      cake,
      priceOfOneCake,
      cans,
      pricOneCans,
      totalprice,
      payByPaymentGetway=true
    )
    .then((res) => {
      console.log(res)
      toast({
        title: "Add New Book.",
        description: "You have successfully Book A Day For Weeding",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    })
    .catch((err) => {
      toast({
        title: "Error!",
        description: `${err.message}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    });

    const baseUrl = window.location.origin;
    // console.log(baseUrl)  =>http://localhost:3000
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${baseUrl}/bookpage`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");

      setIsLoading(false);
    }
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      color={colors2}
      style={{ color: "red" }}
    >
      <PaymentElement id="payment-element" color={colors2} />
      <button id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default ChackoutForm;
