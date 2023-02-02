import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { BiUserCircle } from "react-icons/bi";
import { FiDollarSign, FiUser } from "react-icons/fi";
import { Email } from "@mui/icons-material";
import PaymentIcon from "@mui/icons-material/Payment";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import MosqueIcon from "@mui/icons-material/Mosque";
import moment from "moment";
import {
  checkifThieranthorBookIntheSameDay,
  updateBook,
} from "../services/BookService";
import BalconyIcon from "@mui/icons-material/Balcony";
import CakeIcon from "@mui/icons-material/Cake";
const EditBooked = ({ onClose, isOpen, item, setRefresh, refresh }) => {
  // All Data of First Step
  const [firstname, setFirstname] = useState(item.firstname);
  const [lastname, setLastname] = useState(item.lastname);
  const [firstnamear, setFirstnamear] = useState(item.firstnamear);
  const [lastnamear, setLastnamear] = useState(item.lastnamear);
  const [email, setEmail] = useState(item.email);
  const [religionar, setReigionar] = useState(item.religionar);
  const [address, setAddress] = useState(item.address);
  const [addressar, setAddressar] = useState(item.addressar);
  const [nationalid, setNationalId] = useState(item.nationalid);
  const [phone, setPhone] = useState(item.phone);
  const [religion, setReigion] = useState(item.religion);

  //All Data Of Second Step
  const [hallName, setHallName] = useState(item.hallName);
  const [hallPrice, setHallPrice] = useState(item.hallPrice);
  const [hallPhone, setHallPhone] = useState(item.hallPhone);
  const [hallLocation, setHallLocation] = useState(item.hallLocation);
  const [date, setDate] = useState("2024-01-13");
  const [cake, setCake] = useState(item.cake);
  const [priceOfOneCake, setPriceCake] = useState(item.priceOfOneCake);
  const [cans, setCans] = useState(item.cans);
  const [pricOneCans, setPriceOfOneCans] = useState(item.pricOneCans);
  const [totalPrice, setTotalPrice] = useState(
    cans * pricOneCans + priceOfOneCake * cake + hallPrice
  );
  const toast = useToast(); 

  useEffect(() => {
    setTotalPrice(cans * pricOneCans + priceOfOneCake * cake + hallPrice);
  }, [cans, pricOneCans, priceOfOneCake, cake, hallPrice]);

  const formateDate = async () => {
    var dates = new Date(item.date);
    var day = dates.getDate();
    var month = dates.getMonth() + 1;
    var year = dates.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;

    return today;
  };
  useEffect(() => {
    formateDate().then((res) => {
      setDate(res);
    });
  }, []);
  const saveChanges = () => {
    updateBook(
      item._id,
      item.hallRef,
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
      totalPrice
    )
      .then((res) => {
        if (res.status === "success") {
          toast({
            title: "Booked Updated.",
            description: "You have successfully Updated Book.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setRefresh(!refresh);
          onClose(true);
        } else {
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
        toast({
          title: "Error!",
          description: `${err.message}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  const handleDateFun = (e) => {
    checkifThieranthorBookIntheSameDay(item._id, e, item.hallRef).then(
      (res) => {
        if (res.status === "booked") {
          toast({
            title: "Error!",
            description: `${res.msg}`,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else {
          setDate(e);
          toast({
            title: "Free Date",
            description: "You R Lucky this date is Free To Book",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      }
    );
  };
  return (
    <Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign={"center"} fontWeight="bold">
            Edit Book Info
          </DrawerHeader>

          <DrawerBody>
            <Accordion defaultIndex={[0]} allowMultiple>
              {/* Personal Information */}
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="center"
                      fontWeight={"bold"}
                    >
                      Personal Information
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <Box
                      display="flex"
                      flexDirection={{ base: "column", sm: "row" }}
                    >
                      <FormControl
                        mt={1}
                        width={{ base: "100%", sm: "50%" }}
                        me={{ base: 0, sm: 2 }}
                      >
                        <FormLabel fontSize={20}>First Name</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<FiUser color="gray.300" />}
                          />

                          <Input
                            name="firstname"
                            placeholder="Enter First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl mt={1} width={{ base: "100%", sm: "50%" }}>
                        <FormLabel fontSize={20}>Last Name</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<FiUser color="gray.300" />}
                          />
                          <Input
                            name="lastname"
                            placeholder="Enter Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection={{ base: "column", sm: "row" }}
                    >
                      <FormControl
                        mt={1}
                        width={{ base: "100%", sm: "50%" }}
                        me={{ base: 0, sm: 2 }}
                      >
                        <FormLabel fontSize={20}>
                          First Name in Arabic
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<FiUser color="gray.300" />}
                          />
                          <Input
                            name="firstname"
                            placeholder="Enter First Name in Arabic"
                            value={firstnamear}
                            onChange={(e) => setFirstnamear(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl mt={1} width={{ base: "100%", sm: "50%" }}>
                        <FormLabel fontSize={20}>Last Name in Arabic</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<FiUser color="gray.300" />}
                          />
                          <Input
                            name="lastname"
                            placeholder="Enter Last Name in Arabic"
                            value={lastnamear}
                            onChange={(e) => setLastnamear(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection={{ base: "column", sm: "row" }}
                    >
                      <FormControl
                        mt={1}
                        width={{ base: "100%", sm: "50%" }}
                        me={{ base: 0, sm: 2 }}
                      >
                        <FormLabel fontSize={20}>Email Address</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<Email color="gray.300" />}
                          />
                          <Input
                            name="email"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl mt={1} width={{ base: "100%", sm: "50%" }}>
                        <FormLabel fontSize={20}>National ID</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<PaymentIcon color="gray.300" />}
                          />
                          <Input
                            name="nationalid"
                            placeholder="Enter National ID"
                            value={nationalid}
                            onChange={(e) => setNationalId(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection={{ base: "column", sm: "row" }}
                    >
                      <FormControl
                        mt={1}
                        width={{ base: "100%", sm: "50%" }}
                        me={{ base: 0, sm: 2 }}
                      >
                        <FormLabel fontSize={20}>Address</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<AddLocationIcon color="gray.300" />}
                          />
                          <Input
                            name="address"
                            placeholder="Enter Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl mt={1} width={{ base: "100%", sm: "50%" }}>
                        <FormLabel fontSize={20}>Address in Arabic</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<AddLocationIcon color="gray.300" />}
                          />
                          <Input
                            name="addeessar"
                            placeholder="Enter Address In Arabic"
                            value={addressar}
                            onChange={(e) => setAddressar(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection={{ base: "column", sm: "row" }}
                    >
                      <FormControl me={{ base: 0, sm: 2 }}>
                        <FormLabel htmlFor="hallName" fontSize={20}>
                          Religion
                        </FormLabel>

                        <Select
                          placeholder="Select Religion"
                          value={religion}
                          onChange={(e) => setReigion(e.target.value)}
                        >
                          <option value="muslim">Muslim</option>
                          <option value="christian">Christian</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="nationalid" fontSize={20}>
                          ديانتك
                        </FormLabel>
                        <Select
                          placeholder="اختار ديانتك"
                          value={religionar}
                          onChange={(e) => setReigionar(e.target.value)}
                        >
                          <option value="مسلم">مسلم</option>
                          <option value="مسيحي">مسيحي</option>
                        </Select>
                      </FormControl>
                    </Box>
                    <FormControl
                      mt={1}
                      width={{ base: "100%", sm: "100%" }}
                      me={{ base: 0, sm: 2 }}
                    >
                      <FormLabel fontSize={20}>Phone</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<PhoneIcon color="gray.300" />}
                        />
                        <Input
                          type="tel"
                          placeholder="Phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </InputGroup>
                    </FormControl>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
              {/* Hall Information */}
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="center"
                      fontWeight={"bold"}
                    >
                      Hall Information
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <Box
                      display="flex"
                      flexDirection={{ base: "column", sm: "row" }}
                    >
                      <FormControl
                        mt={1}
                        width={{ base: "100%", sm: "50%" }}
                        me={{ base: 0, sm: 2 }}
                      >
                        <FormLabel fontSize={20}>Hall Name</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BalconyIcon color="gray.300" />}
                          />
                          <Input
                            name="hallname"
                            placeholder="Enter Hall Name"
                            isReadOnly
                            value={hallName}
                            onChange={(e) => setHallName(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl mt={1} width={{ base: "100%", sm: "50%" }}>
                        <FormLabel fontSize={20}>Hall Price</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<FiDollarSign color="gray.300" />}
                          />
                          <Input
                            name="hallprice"
                            isReadOnly
                            placeholder="Enter Hall Price"
                            value={hallPrice}
                            onChange={(e) => setHallPrice(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection={{ base: "column", sm: "row" }}
                    >
                      <FormControl
                        mt={1}
                        width={{ base: "100%", sm: "50%" }}
                        me={{ base: 0, sm: 2 }}
                      >
                        <FormLabel fontSize={20}>Hall Location</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<AddLocationIcon color="gray.300" />}
                          />
                          <Input
                            isReadOnly
                            name="halllocation"
                            placeholder="Enter Hall Location"
                            value={hallLocation}
                            onChange={(e) => setHallLocation(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl
                        mt={1}
                        width={{ base: "100%", sm: "50%" }}
                        me={{ base: 0, sm: 2 }}
                      >
                        <FormLabel fontSize={20}>Hall Phone</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<PhoneIcon color="gray.300" />}
                          />
                          <Input
                            isReadOnly
                            type="tel"
                            placeholder="Phone number"
                            value={hallPhone}
                            onChange={(e) => setHallPhone(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                    </Box>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
              {/*Total Price Information */}
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="center"
                      fontWeight={"bold"}
                    >
                      Price & date Information
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <Box
                      display="flex"
                      flexDirection={{ base: "column", sm: "row" }}
                    >
                      <FormControl
                        mt={1}
                        width={{ base: "100%", sm: "100%" }}
                        me={{ base: 0, sm: 2 }}
                      >
                        <FormLabel fontSize={20}>Weeding Date</FormLabel>
                        <Input
                          name="date"
                          placeholder="select weeding Date"
                          type={"date"}
                          value={date}
                          onChange={(e) => handleDateFun(e.target.value)}
                        />
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection={{ base: "column", sm: "row" }}
                    >
                      <FormControl
                        mr={2}
                        mt={1}
                        width={{ base: "100%", sm: "100%" }}
                      >
                        <FormLabel fontSize={20}># Cake</FormLabel>
                        <Input
                          name="cake"
                          placeholder="Enter num Cake"
                          type={"number"}
                          value={cake}
                          onChange={(e) => setCake(e.target.value)}
                        />
                      </FormControl>

                      <FormControl mt={1}>
                        <FormLabel htmlFor="hallcake" fontSize={20}>
                          Price Of one Cake
                        </FormLabel>
                        <Select
                          id="hallcake"
                          placeholder="Select price"
                          value={priceOfOneCake}
                          onChange={(e) => setPriceCake(e.target.value)}
                        >
                          <option value="5">5 EGP</option>
                          <option value="12">12 EGP </option>
                          <option value="21">21 EGP </option>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box
                      display="flex"
                      flexDirection={{ base: "column", sm: "row" }}
                    >
                      <FormControl
                        mr={2}
                        mt={1}
                        width={{ base: "100%", sm: "100%" }}
                      >
                        <FormLabel fontSize={20}># Cans</FormLabel>
                        <Input
                          name="cans"
                          placeholder="Enter num cans"
                          type={"number"}
                          value={cans}
                          onChange={(e) => setCans(e.target.value)}
                        />
                      </FormControl>

                      <FormControl mt={1}>
                        <FormLabel htmlFor="hallcans" fontSize={20}>
                          Price Of one cans
                        </FormLabel>
                        <Select
                          id="hallcans"
                          placeholder="Select price"
                          value={pricOneCans}
                          onChange={(e) => setPriceOfOneCans(e.target.value)}
                        >
                          <option value="5">5 EGP</option>
                          <option value="10">10 EGP </option>
                          <option value="15">15 EGP </option>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <Heading textAlign={"right"}>
                        Total Price : <span>{totalPrice}</span> EGP{" "}
                      </Heading>
                    </Box>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={saveChanges}>
              Save Changes
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default EditBooked;
