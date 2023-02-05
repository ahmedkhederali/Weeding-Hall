import { PhoneIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { People } from "@mui/icons-material";
import React, { useState } from "react";
import { FiDollarSign, FiUser } from "react-icons/fi";
import { FaChair, FaFacebookF, FaFacebookMessenger } from "react-icons/fa";
import { GiTable } from "react-icons/gi";

import { MdLocationOn, MdOutlineHome } from "react-icons/md";
import CommonPage from "../CommonPage";
import {
  AiOutlineInstagram,
  AiOutlineTable,
  AiOutlineVideoCameraAdd,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import ThreePlans from "./ThreePlans";
import { CreateAdminHall } from "./../../services/AdminServices/CreateHall";
import { useNavigate } from "react-router-dom";

const CreateHall = () => {
  const [allData, setAllData] = useState({});
  const [avatar, setAvatar] = useState("");
  const [slider, setSlider] = useState([]);
  const [imgSize, setImageSize] = useState(false);

  const toast = useToast();
  const nagivate = useNavigate();
  const [threeplan, setThreeplan] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setAllData((prev) => ({ ...prev, [name]: value }));
  };

  //Handle Upload Images Poster
  const handleUpload = async (e) => {
    debugger
    const reader = new FileReader();
    
      reader.onload = async () => {
        if (reader.readyState === 2) {
          if (reader.result) {
            const x = reader.result;
            setAvatar(x);
          }
        }
      };
    
    if (e.target.files[0].size > 57614) {
      toast({
        title: "ERROR!",
        description: `Size of Image is To large`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setImageSize(false);
      allData.hallimgposter = "";
    } else {
      setImageSize(true);
    }
    reader.readAsDataURL(e.target.files[0]);
  };
  const submit = () => {
    allData.hallimgposter = avatar;
    allData.imgs = slider;
    allData.threeplan = threeplan;
    console.log(allData);
    CreateAdminHall(allData)
      .then((res) => {
        toast({
          title: "Hall Added",
          description: `${res.data.msg}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        nagivate("/adminallhall");
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: `${err.response.data.msg}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <CommonPage />
      <Box ml={{ base: 0, md: 60 }} p={2}>
        <Center mb={5}>
          <Heading fontSize={{ base: "20px", md: "25px", xl: "30px" }}>
            Create Hall
          </Heading>
        </Center>

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
                value={allData.name}
                onChange={(e) => handleChange(e)}
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
                value={allData.namear}
                onChange={(e) => handleChange(e)}
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
              value={allData.mohafza}
              onChange={(e) => handleChange(e)}
            >
              <option value="cairo">Cairo</option>
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
                value={allData.capacity}
                onChange={(e) => handleChange(e)}
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
                value={allData.price}
                onChange={(e) => handleChange(e)}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="Governorate1-namear" fontWeight={"normal"}>
              Governorate AR
            </FormLabel>

            <Select
              id="Governorate1-namear"
              placeholder=" المحافظة "
              name="mohafzaar"
              value={allData.mohafzaar}
              onChange={(e) => handleChange(e)}
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
                value={allData.location}
                onChange={(e) => handleChange(e)}
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
                value={allData.locationar}
                onChange={(e) => handleChange(e)}
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
                value={allData.phone}
                onChange={(e) => handleChange(e)}
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
                value={allData.chairs}
                onChange={(e) => handleChange(e)}
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
                value={allData.tables}
                onChange={(e) => handleChange(e)}
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
              value={allData.halltype}
              onChange={(e) => handleChange(e)}
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
                value={allData.floor}
                onChange={(e) => handleChange(e)}
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
                value={allData.facebook}
                onChange={(e) => handleChange(e)}
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
                value={allData.videoUrl}
                onChange={(e) => handleChange(e)}
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
                value={allData.messanger}
                onChange={(e) => handleChange(e)}
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
                value={allData.whatsup}
                onChange={(e) => handleChange(e)}
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
                value={allData.instagram}
                onChange={(e) => handleChange(e)}
              />
            </InputGroup>
          </FormControl>
        </Flex>

        <Flex
          mt={2}
          flexDirection={{ base: "column", sm: "column", md: "row" }}
        >
          <FormControl mr="5%">
            <FormLabel htmlFor="hallimgposter-name" fontWeight={"normal"}>
              Hall Poster
            </FormLabel>

            <Input
              id="hallimgposter-name"
              name="hallimgposter"
              type="file"
              value={allData.hallimgposter}
              onChange={handleUpload}
              accept="image/*"
            />
          </FormControl>

          <FormControl mr="5%">
            <FormLabel htmlFor="plans-name" fontWeight={"normal"}>
              Hall Plans
            </FormLabel>

            <Button colorScheme="teal" variant="solid" onClick={onOpen}>
              Open PLans Drawer
            </Button>
          </FormControl>
        </Flex>

        <Box
          display={"flex"}
          justifyContent={{ base: "center", md: "end" }}
          mt={4}
        >
          <Button
            textAlign={"right"}
            colorScheme="teal"
            onClick={submit}
            variant="outline"
          >
            Added New Hall
          </Button>
        </Box>
      </Box>

      <ThreePlans
        isOpen={isOpen}
        onClose={onClose}
        setThreeplan={setThreeplan}
      />
    </>
  );
};

export default CreateHall;
