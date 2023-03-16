import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  AiOutlineInstagram,
  AiOutlineTable,
  AiOutlineVideoCameraAdd,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { MdLocationOn, MdOutlineHome } from "react-icons/md";
import LoadingPage from "../Loading/LoadingPage";
import { getHallById } from "./../../services/HallServices";
import { People } from "@mui/icons-material";
import { FiDollarSign } from "react-icons/fi";
import { PhoneIcon } from "@chakra-ui/icons";
import { FaChair } from "react-icons/fa"; 
import { GiTable } from "react-icons/gi";
import { FaFacebookF } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import LiquorIcon from "@mui/icons-material/Liquor";
import CakeIcon from "@mui/icons-material/Cake";
import { updateHallByIDS } from "../../services/AdminServices/UpdateHall";
const AdminEditHall = ({ isOpen, onClose, hallId,setRefresh,refresh }) => {
  const [name, setName] = useState("");
  const [namear, setNamear] = useState("");
  const [mohafza, setMohafza] = useState("");
  const [capacity, setcapacity] = useState("");
  const [price, setPrice] = useState("");
  const [mohafzaar, setMohafzaar] = useState("");
  const [location, setLocation] = useState("");
  const [locationar, setLocationar] = useState("");
  const [phone, setPhone] = useState("");
  const [chairs, setChairs] = useState("");
  const [tables, setTables] = useState("");
  const [halltype, setHalltype] = useState("");
  const [floor, setFloor] = useState("");
  const [facebook, setFace] = useState("");
  const [instagram, setInsta] = useState("");
  const [messanger, setMesag] = useState("");
  const [whatsup, setWhat] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  //Plan 1
  const [planHeader, setPlanHeader] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planchairs, setPlanchairs] = useState("");
  const [plantables, setPlantables] = useState("");
  const [planfloors, setPlanfloors] = useState("");
  const [plancake, setPlancake] = useState("");
  const [plancans, setPlancans] = useState("");
  //Plan2
  const [planHeader1, setPlanHeader1] = useState("");
  const [planPrice1, setPlanPrice1] = useState("");
  const [planchairs1, setPlanchairs1] = useState("");
  const [plantables1, setPlantables1] = useState("");
  const [planfloors1, setPlanfloors1] = useState("");
  const [plancake1, setPlancake1] = useState("");
  const [plancans1, setPlancans1] = useState("");
  //Plan3
  const [planHeader2, setPlanHeader2] = useState("");
  const [planPrice2, setPlanPrice2] = useState("");
  const [planchairs2, setPlanchairs2] = useState("");
  const [plantables2, setPlantables2] = useState("");
  const [planfloors2, setPlanfloors2] = useState("");
  const [plancake2, setPlancake2] = useState("");
  const [plancans2, setPlancans2] = useState("");

  const [hall, setHall] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getHallById(hallId)
      .then((res) => {
        console.log(res.data.hall);
        setHall(res.data.hall);
        setName(res.data.hall.name);
        setNamear(res.data.hall.namear);
        setMohafza(res.data.hall.mohafza);
        setcapacity(res.data.hall.capacity);
        setPrice(res.data.hall.price);
        setMohafzaar(res.data.hall.mohafzaar);
        setLocation(res.data.hall.location);
        setLocationar(res.data.hall.locationar);
        setPhone(res.data.hall.phone);
        setChairs(res.data.hall.chairs);
        setTables(res.data.hall.tables);
        setHalltype(res.data.hall.halltype);
        setFloor(res.data.hall.floor);
        setFace(res.data.hall.facebook);
        setInsta(res.data.hall.instagram);
        setMesag(res.data.hall.messanger);
        setWhat(res.data.hall.whatsup);
        setVideoUrl(res.data.hall.videoUrl);
        setPlanHeader(res.data.hall.threeplan[0].planHeader);
        setPlanPrice(res.data.hall.threeplan[0].planPrice);
        setPlanchairs(res.data.hall.threeplan[0].planDes[0].planchairs);
        setPlantables(res.data.hall.threeplan[0].planDes[0].plantables);
        setPlanfloors(res.data.hall.threeplan[0].planDes[0].planfloors);
        setPlancake(res.data.hall.threeplan[0].planDes[0].plancake);
        setPlancans(res.data.hall.threeplan[0].planDes[0].plancans);

        setPlanHeader1(res.data.hall.threeplan[1].planHeader);
        setPlanPrice1(res.data.hall.threeplan[1].planPrice);
        setPlanchairs1(res.data.hall.threeplan[1].planDes[0].planchairs);
        setPlantables1(res.data.hall.threeplan[1].planDes[0].plantables);
        setPlanfloors1(res.data.hall.threeplan[1].planDes[0].planfloors);
        setPlancake1(res.data.hall.threeplan[1].planDes[0].plancake);
        setPlancans1(res.data.hall.threeplan[1].planDes[0].plancans);

        setPlanHeader2(res.data.hall.threeplan[2].planHeader);
        setPlanPrice2(res.data.hall.threeplan[2].planPrice);
        setPlanchairs2(res.data.hall.threeplan[2].planDes[0].planchairs);
        setPlantables2(res.data.hall.threeplan[2].planDes[0].plantables);
        setPlanfloors2(res.data.hall.threeplan[2].planDes[0].planfloors);
        setPlancake2(res.data.hall.threeplan[2].planDes[0].plancake);
        setPlancans2(res.data.hall.threeplan[2].planDes[0].plancans);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateHall = () => {
   
    updateHallByIDS(hallId,
      name,
      namear,
      mohafza,
      capacity,
      price,
      mohafzaar,
      location,
      locationar,
      phone,
      chairs,
      tables,
      halltype,
      floor,
      facebook,
      instagram,
      messanger,
      whatsup,
      videoUrl,)
      .then((res) => {
        toast({
          title: "Updated Success",
          description: "Hall Updated",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setRefresh(!refresh)
        onClose();
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: `${err.msg}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      {hall && (
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          size={"full"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Center fontSize={25} fontWeight="bold">
                Edit {name.toUpperCase()} Hall
              </Center>
            </DrawerHeader>

            {hall ? (
              <DrawerBody>
                <Flex mt={2} flexDirection={{ base: "column", sm: "row" }}>
                  <FormControl mr="5%">
                    <FormLabel htmlFor="hall-name" fontWeight={"normal"}>
                      Hall Name in EN
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<MdOutlineHome color="gray.300" />}
                      />
                      <Input
                        id="hall-name"
                        placeholder="Hall name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl mr="5%">
                    <FormLabel htmlFor="hall-namear" fontWeight={"normal"}>
                      Hall Name in AR
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<MdOutlineHome color="gray.300" />}
                      />
                      <Input
                        id="hall-namear"
                        placeholder="اسم القاعة "
                        name="namear"
                        value={namear}
                        onChange={(e) => setNamear(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="Governorate-name" fontWeight={"normal"}>
                      Governorate EN
                    </FormLabel>

                    <Select
                      id="Governorate-name"
                      placeholder="Governorate"
                      name="mohafza"
                      value={mohafza}
                      onChange={(e) => setMohafza(e.target.value)}
                    >
                      <option value="caior">Cairo</option>
                      <option value="menofia">Menofia</option>
                    </Select>
                  </FormControl>
                </Flex>

                <Flex mt={2} flexDirection={{ base: "column", sm: "row" }}>
                  <FormControl mr="5%">
                    <FormLabel htmlFor="capacity-name" fontWeight={"normal"}>
                      Capacity
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<People color="gray.300" />}
                      />
                      <Input
                        id="capacity-name"
                        placeholder="capacity"
                        name="capacity"
                        type={"number"}
                        value={capacity}
                        onChange={(e) => setcapacity(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl mr="5%">
                    <FormLabel htmlFor="price-namear" fontWeight={"normal"}>
                      price
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FiDollarSign color="gray.300" />}
                      />
                      <Input
                        id="price-namear"
                        placeholder="Price "
                        name="price"
                        type={"number"}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      htmlFor="Governorate1-namear"
                      fontWeight={"normal"}
                    >
                      Governorate AR
                    </FormLabel>

                    <Select
                      id="Governorate1-namear"
                      placeholder=" المحافظة "
                      name="mohafzaar"
                      value={mohafzaar}
                      onChange={(e) => setMohafzaar(e.target.value)}
                    >
                      <option value="القاهره">القاهره</option>
                      <option value="المنوفيه">المنوفيه</option>
                    </Select>
                  </FormControl>
                </Flex>

                <Flex mt={2} flexDirection={{ base: "column", sm: "row" }}>
                  <FormControl mr="5%">
                    <FormLabel htmlFor="location-name" fontWeight={"normal"}>
                      Location
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<MdLocationOn color="gray.300" />}
                      />
                      <Input
                        id="location-name"
                        placeholder="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl mr="5%">
                    <FormLabel htmlFor="location-namear" fontWeight={"normal"}>
                      Location in AR
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<MdLocationOn color="gray.300" />}
                      />
                      <Input
                        id="location-namear"
                        placeholder="مكان القاعة "
                        name="locationar"
                        value={locationar}
                        onChange={(e) => setLocationar(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="phone-name" fontWeight={"normal"}>
                      Phone
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<PhoneIcon color="gray.300" />}
                      />
                      <Input
                        id="phone-name"
                        placeholder="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                </Flex>

                <Flex flexDirection={{ base: "column", sm: "row" }}>
                  <FormControl mr="5%">
                    <FormLabel htmlFor="chairs-name" fontWeight={"normal"}>
                      Chairs
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FaChair color="gray.300" />}
                      />
                      <Input
                        id="chairs-name"
                        placeholder="Chairs"
                        name="chairs"
                        type={"number"}
                        value={chairs}
                        onChange={(e) => setChairs(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl mr="5%">
                    <FormLabel htmlFor="tables-namear" fontWeight={"normal"}>
                      Tables
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<GiTable color="gray.300" />}
                      />
                      <Input
                        id="tables-namear"
                        placeholder=" tables "
                        type={"number"}
                        name="tables"
                        value={tables}
                        onChange={(e) => setTables(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="halltype-namear" fontWeight={"normal"}>
                      Hall Type
                    </FormLabel>

                    <Select
                      id="halltype-namear"
                      placeholder=" Hall Type "
                      name="halltype"
                      value={halltype}
                      onChange={(e) => setHalltype(e.target.value)}
                    >
                      <option value="close">Close</option>
                      <option value="open">Open</option>
                    </Select>
                  </FormControl>
                </Flex>

                <Flex mt={2} flexDirection={{ base: "column", sm: "row" }}>
                  <FormControl mr="5%">
                    <FormLabel htmlFor="floor-name" fontWeight={"normal"}>
                      Number of Floor
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<AiOutlineTable color="gray.300" />}
                      />
                      <Input
                        id="floor-name"
                        placeholder="floor"
                        name="floor"
                        type={"number"}
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl mr="5%">
                    <FormLabel htmlFor="facebook-name" fontWeight={"normal"}>
                      facebook
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FaFacebookF color="gray.300" />}
                      />
                      <Input
                        id="facebook-name"
                        placeholder="facebook"
                        name="facebook"
                        value={facebook}
                        onChange={(e) => setFace(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="videoUrl-namear" fontWeight={"normal"}>
                      Hall video Url
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<AiOutlineVideoCameraAdd color="gray.300" />}
                      />
                      <Input
                        id="videoUrl-namear"
                        placeholder=" videoUrl "
                        name="videoUrl"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                </Flex>

                <Flex mt={2} flexDirection={{ base: "column", sm: "row" }}>
                  <FormControl mr="5%">
                    <FormLabel htmlFor="messanger-name" fontWeight={"normal"}>
                      messanger
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FaFacebookMessenger color="gray.300" />}
                      />
                      <Input
                        id="messanger-name"
                        placeholder="messanger"
                        name="messanger"
                        value={messanger}
                        onChange={(e) => setMesag(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl mr="5%">
                    <FormLabel htmlFor="whatsup-namear" fontWeight={"normal"}>
                      whatsup
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<AiOutlineWhatsApp color="gray.300" />}
                      />
                      <Input
                        id="whatsup-namear"
                        placeholder=" whatsup "
                        name="whatsup"
                        value={whatsup}
                        onChange={(e) => setWhat(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="instagram-namear" fontWeight={"normal"}>
                      instagram
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<AiOutlineInstagram color="gray.300" />}
                      />
                      <Input
                        id="instagram-namear"
                        placeholder=" instagram "
                        name="instagram"
                        value={instagram}
                        onChange={(e) => setInsta(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                </Flex>

                <Box mt={4}>
                  <Center fontSize={20} fontWeight={"bold"}>
                    Plan 1
                  </Center>
                  <FormControl>
                    <FormLabel htmlFor="headerText" fontWeight={"normal"}>
                      PLan Header
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<TextSnippetIcon color="gray.300" />}
                      />
                      <Input
                        value={planHeader}
                        onChange={(e) => setPlanHeader(e.target.value)}
                        name="headerText"
                        placeholder="Header Text"
                      />
                    </InputGroup>
                  </FormControl>

                  <Flex flexDirection={{ base: "column", sm: "row" }}>
                    <FormControl mr={"5%"}>
                      <FormLabel htmlFor="planPrice" fontWeight={"normal"}>
                        PLan Price
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FiDollarSign color="gray.300" />}
                        />
                        <Input
                          value={planPrice}
                          onChange={(e) => setPlanPrice(e.target.value)}
                          name="planPrice"
                          placeholder="Plan Price"
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl mr={"5%"}>
                      <FormLabel htmlFor="planchairs" fontWeight={"normal"}>
                        PLan Chairs
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FaChair color="gray.300" />}
                        />
                        <Input
                          value={planchairs}
                          onChange={(e) => setPlanchairs(e.target.value)}
                          name="planchairs"
                          placeholder="Plan Chairs"
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="plancans" fontWeight={"normal"}>
                        Plan Cans
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<LiquorIcon color="gray.300" />}
                        />
                        <Input
                          value={plancans}
                          onChange={(e) => setPlancans(e.target.value)}
                          name="plancans"
                          placeholder="Plan Cans"
                        />
                      </InputGroup>
                    </FormControl>
                  </Flex>

                  <Flex flexDirection={{ base: "column", sm: "row" }}>
                    <FormControl mr={"5%"}>
                      <FormLabel htmlFor="plantables" fontWeight={"normal"}>
                        Plan Tables
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<GiTable color="gray.300" />}
                        />
                        <Input
                          value={plantables}
                          onChange={(e) => setPlantables(e.target.value)}
                          name="plantables"
                          type={"number"}
                          placeholder="Plan Table"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl mr={"5%"}>
                      <FormLabel htmlFor="planfloors" fontWeight={"normal"}>
                        Plan Floors
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<AiOutlineTable color="gray.300" />}
                        />
                        <Input
                          value={planfloors}
                          onChange={(e) => setPlanfloors(e.target.value)}
                          name="planfloors"
                          placeholder="Plan Floor"
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="plancake" fontWeight={"normal"}>
                        Plan Cake
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<CakeIcon color="gray.300" />}
                        />
                        <Input
                          value={plancake}
                          onChange={(e) => setPlancake(e.target.value)}
                          name="plancake"
                          placeholder="Plan Cake"
                        />
                      </InputGroup>
                    </FormControl>
                  </Flex>
                </Box>

                <Box mt={4}>
                  <Center fontSize={20} fontWeight={"bold"}>
                    Plan 2
                  </Center>
                  <FormControl>
                    <FormLabel htmlFor="headerText1" fontWeight={"normal"}>
                      PLan Header
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<TextSnippetIcon color="gray.300" />}
                      />
                      <Input
                        value={planHeader1}
                        onChange={(e) => setPlanHeader1(e.target.value)}
                        name="headerText1"
                        placeholder="Header Text"
                      />
                    </InputGroup>
                  </FormControl>

                  <Flex flexDirection={{ base: "column", sm: "row" }}>
                    <FormControl mr={"5%"}>
                      <FormLabel htmlFor="planPrice1" fontWeight={"normal"}>
                        PLan Price
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FiDollarSign color="gray.300" />}
                        />
                        <Input
                          value={planPrice1}
                          onChange={(e) => setPlanPrice1(e.target.value)}
                          name="planPrice1"
                          placeholder="Plan Price"
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl mr={"5%"}>
                      <FormLabel htmlFor="planchairs1" fontWeight={"normal"}>
                        PLan Chairs
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FaChair color="gray.300" />}
                        />
                        <Input
                          value={planchairs1}
                          onChange={(e) => setPlanchairs1(e.target.value)}
                          name="planchairs1"
                          placeholder="Plan Chairs"
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="plancans1" fontWeight={"normal"}>
                        Plan Cans
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<LiquorIcon color="gray.300" />}
                        />
                        <Input
                          value={plancans1}
                          onChange={(e) => setPlancans1(e.target.value)}
                          name="plancans1"
                          placeholder="Plan Cans"
                        />
                      </InputGroup>
                    </FormControl>
                  </Flex>

                  <Flex flexDirection={{ base: "column", sm: "row" }}>
                    <FormControl mr={"5%"}>
                      <FormLabel htmlFor="plantables1" fontWeight={"normal"}>
                        Plan Tables
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<GiTable color="gray.300" />}
                        />
                        <Input
                          value={plantables1}
                          onChange={(e) => setPlantables1(e.target.value)}
                          name="plantables1"
                          type={"number"}
                          placeholder="Plan Table"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl mr={"5%"}>
                      <FormLabel htmlFor="planfloors1" fontWeight={"normal"}>
                        Plan Floors
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<AiOutlineTable color="gray.300" />}
                        />
                        <Input
                          value={planfloors1}
                          onChange={(e) => setPlanfloors1(e.target.value)}
                          name="planfloors1"
                          placeholder="Plan Floor"
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="plancake1" fontWeight={"normal"}>
                        Plan Cake
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<CakeIcon color="gray.300" />}
                        />
                        <Input
                          value={plancake1}
                          onChange={(e) => setPlancake1(e.target.value)}
                          name="plancake1"
                          placeholder="Plan Cake"
                        />
                      </InputGroup>
                    </FormControl>
                  </Flex>
                </Box>

                <Box mt={4}>
                  <Center fontSize={20} fontWeight={"bold"}>
                    Plan 3
                  </Center>
                  <FormControl>
                    <FormLabel htmlFor="headerText2" fontWeight={"normal"}>
                      PLan Header
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<TextSnippetIcon color="gray.300" />}
                      />
                      <Input
                        value={planHeader2}
                        onChange={(e) => setPlanHeader2(e.target.value)}
                        name="headerText2"
                        placeholder="Header Text"
                      />
                    </InputGroup>
                  </FormControl>

                  <Flex flexDirection={{ base: "column", sm: "row" }}>
                    <FormControl mr={"5%"}>
                      <FormLabel htmlFor="planPrice2" fontWeight={"normal"}>
                        PLan Price
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FiDollarSign color="gray.300" />}
                        />
                        <Input
                          value={planPrice2}
                          onChange={(e) => setPlanPrice2(e.target.value)}
                          name="planPrice2"
                          placeholder="Plan Price"
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl mr={"5%"}>
                      <FormLabel htmlFor="planchairs2" fontWeight={"normal"}>
                        PLan Chairs
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FaChair color="gray.300" />}
                        />
                        <Input
                          value={planchairs2}
                          onChange={(e) => setPlanchairs2(e.target.value)}
                          name="planchairs2"
                          placeholder="Plan Chairs"
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="plancans2" fontWeight={"normal"}>
                        Plan Cans
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<LiquorIcon color="gray.300" />}
                        />
                        <Input
                          value={plancans2}
                          onChange={(e) => setPlancans2(e.target.value)}
                          name="plancans2"
                          placeholder="Plan Cans"
                        />
                      </InputGroup>
                    </FormControl>
                  </Flex>

                  <Flex flexDirection={{ base: "column", sm: "row" }}>
                    <FormControl mr={"5%"}>
                      <FormLabel htmlFor="plantables2" fontWeight={"normal"}>
                        Plan Tables
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<GiTable color="gray.300" />}
                        />
                        <Input
                          value={plantables2}
                          onChange={(e) => setPlantables2(e.target.value)}
                          name="plantables2"
                          type={"number"}
                          placeholder="Plan Table"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl mr={"5%"}>
                      <FormLabel htmlFor="planfloors2" fontWeight={"normal"}>
                        Plan Floors
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<AiOutlineTable color="gray.300" />}
                        />
                        <Input
                          value={planfloors2}
                          onChange={(e) => setPlanfloors2(e.target.value)}
                          name="planfloors2"
                          placeholder="Plan Floor"
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="plancake2" fontWeight={"normal"}>
                        Plan Cake
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<CakeIcon color="gray.300" />}
                        />
                        <Input
                          value={plancake2}
                          onChange={(e) => setPlancake2(e.target.value)}
                          name="plancake2"
                          placeholder="Plan Cake"
                        />
                      </InputGroup>
                    </FormControl>
                  </Flex>
                </Box>
              </DrawerBody>
            ) : (
              <LoadingPage />
            )}

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={updateHall}>
                Update
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default AdminEditHall;
