import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Box } from "@chakra-ui/react";
import "./payment.css";
import CheckoutForm from "./ChackoutForm";
import LoadingPage from "./../pages/Loading/LoadingPage";

const stripePromise = loadStripe(
  "pk_test_51KfhXZHSobqaG5Hhg9QYpAN4mqFZw4AWJqffY5bSzhjqMBJjKR8pH82ar2WZqdrBQU1idFaEq0T42tGdXCzD9RKI00EauNycn5"
);

const Payment = ({
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
}) => {
    const [totalprice,setTotalPrice]=useState(Number(cake) * Number(priceOfOneCake) + Number(cans) * Number(pricOneCans) + Number(hallPrice))

    
console.log("totalprice ",totalprice)
  const [clientSecret, setClientSecret] = useState("");
  console.log(totalprice);
  useEffect(() => {
    fetch(`http://localhost:5000/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: totalprice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret ? (
        <Box
          className="payment"
          display="flex"
          justifyContent="center"
          p={{ base: 0, md: 5 }}
        >
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm
              hallRef={hallRef}
                firstname={firstname}
                lastname={lastname}
                firstnamear={firstnamear}
                lastnamear={lastnamear}
                religion={religion}
                religionar={religionar}
                email={email}
                address={address}
                addressar={addressar}
                nationalid={nationalid}
                phone={phone}
                hallName={hallName}
                hallPhone={hallPhone}
                hallLocation={hallLocation}
                hallPrice={hallPrice}
                date={date}
                cake={cake}
                priceOfOneCake={priceOfOneCake}
                cans={cans}
                pricOneCans={pricOneCans}
                totalprice={totalprice}
              />
            </Elements>
          )}
        </Box>
      ) : (
        <LoadingPage textAlign="cener" />
      )}
    </>
  );
};

export default Payment;
