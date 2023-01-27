import { Button, Center, Flex, Heading, useToast } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FiClipboard, FiDollarSign, FiUser } from "react-icons/fi";
import CommonPage from "./CommonPage";
import { useEffect, useState } from "react";
import Step1 from "../Components/Step1";
import Step2 from "../Components/Step2";
import Payment from "../Components/Payments";
import { useNavigate, useParams } from "react-router-dom";
import { getHallById } from "../services/HallServices";
import { addedNewBook } from "../services/BookService";

const steps = [
  { label: "Personal Information", icon: FiUser },
  { label: "Hall Information", icon: FiClipboard },
  { label: "Pay", icon: FiDollarSign },
];

export const CustomIcons = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  // All Data of First Step
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstnamear, setFirstnamear] = useState("");
  const [lastnamear, setLastnamear] = useState("");
  const [email, setEmail] = useState("");
  const [religionar, setReigionar] = useState("");
  const [address, setAddress] = useState("");
  const [addressar, setAddressar] = useState("");
  const [nationalid, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [religion, setReigion] = useState("");

  //All Data Of Second Step
  const [hallName, setHallName] = useState("");
  const [hallPrice, setHallPrice] = useState("");
  const [hallPhone, setHallPhone] = useState("");
  const [hallLocation, setHallLocation] = useState("");
  const [date, setDate] = useState("");
  const [cake, setCake] = useState(0);
  const [priceOfOneCake, setPriceCake] = useState(0);
  const [cans, setCans] = useState(0);
  const [pricOneCans, setPriceOfOneCans] = useState(0);
  var totalprice;
  var payByPaymentGetway;
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getHallById(id).then((res) => {
      setHallName(res.data.hall.name);
      setHallPrice(res.data.hall.price);
      setHallPhone(res.data.hall.phone);
      setHallLocation(res.data.hall.location);
      
    });
  }, []);
 
  // All Data to Payment

  const submit = () => {
    totalprice=( Number(cake) * Number(priceOfOneCake) + Number(cans) * Number(pricOneCans) +Number(hallPrice))
    addedNewBook(
      id,
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
      (payByPaymentGetway = false)
    )
      .then((res) => {
       if(res.status === "success"){
        toast({
          title: "Add New Book.",
          description: "You have successfully Book A Da For Weeding",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/bookpage");
       }else{
        toast({
          title: "Error!",
          description: `${res.msg}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
       }
       
      })
      .catch((err) => {
        if (err.response.data.error.code === 11000) {
          toast({
            title: "Error!",
            description: `Email is already booked Try again With anthor Email`,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error!",
            description: `Sorry There Is Some Missing Data , Please Enter All Data`,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <>
      <CommonPage />

      <Flex
        flexDir="column"
        width={"auto"}
        ml={{ base: 0, md: 60 }}
        mt={2}
        px={2}
      >
        <Center mb={2}>
          <Heading>Booking</Heading>
        </Center>
        <Steps activeStep={activeStep}>
          {steps.map(({ label, icon }, index) => (
            <Step label={label} key={label} icon={icon}>
              {index === 0 && (
                <Step1
                  firstname={firstname}
                  setFirstname={setFirstname}
                  lastname={lastname}
                  setLastname={setLastname}
                  firstnamear={firstnamear}
                  setFirstnamear={setFirstnamear}
                  lastnamear={lastnamear}
                  setLastnamear={setLastnamear}
                  address={address}
                  setAddress={setAddress}
                  setEmail={setEmail}
                  email={email}
                  addressar={addressar}
                  setAddressar={setAddressar}
                  nationalid={nationalid}
                  setNationalId={setNationalId}
                  religionar={religionar}
                  setReigionar={setReigionar}
                  phone={phone}
                  setPhone={setPhone}
                  religion={religion}
                  setReigion={setReigion}
                />
              )}
              {index === 1 && (
                <Step2
                  hallName={hallName}
                  setHallName={setHallName}
                  hallPrice={hallPrice}
                  setHallPrice={setHallPrice}
                  hallPhone={hallPhone}
                  setHallPhone={setHallPhone}
                  hallLocation={hallLocation}
                  setHallLocation={setHallLocation}
                  date={date}
                  setDate={setDate}
                  cake={cake}
                  setCake={setCake}
                  priceOfOneCake={priceOfOneCake}
                  setPriceCake={setPriceCake}
                  cans={cans}
                  setCans={setCans}
                  pricOneCans={pricOneCans}
                  setPriceOfOneCans={setPriceOfOneCans}
                />
              )}
              {index === 2 && (
                <Payment
                  hallRef={id}
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
                />
              )}
            </Step>
          ))}
        </Steps>
        {activeStep === steps.length ? (
          <>
            <Heading fontSize="xl" textAlign="center">
              Woohoo! All steps completed!
            </Heading>

            <Flex px={4} py={4} width={"auto"}>
              <Button mx="10px" mt={6} size="sm" onClick={reset}>
                Reset
              </Button>
              <Button mx="auto" mt={6} size="sm" onClick={submit}>
                Submit
              </Button>
            </Flex>
          </>
        ) : (
          <Flex width={"auto"} justify="flex-end" mt={2} mb={2}>
            <Button
              isDisabled={activeStep === 0}
              mr={4}
              onClick={prevStep}
              size="sm"
              variant="ghost"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep} colorScheme={"whatsapp"}>
              {activeStep === steps.length - 1 ? "Skip PayMent" : "Next"}
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default CustomIcons;
