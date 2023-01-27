import React, { useState } from "react";
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
} from "@chakra-ui/react";

import { FiDollarSign } from "react-icons/fi";

import { MdLocationOn } from "react-icons/md";

const ThreePlans = ({ onClose, isOpen, setThreeplan }) => {
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
  const planDes = [
    {
      planchairs,
      plantables,
      planfloors,
      plancake,
      plancans,
    },
  ];

  const planDes1 = [
    {
      planchairs:planchairs1,
      plantables:plantables1,
      planfloors:planfloors1,
      plancake:plancake1,
      plancans:plancans1,
    },
  ];

  const planDes2 = [
    {
      planchairs:planchairs2,
      plantables:plantables2,
      planfloors:planfloors2,
      plancake:plancake2,
      plancans:plancans2,
    },
  ];

  const saved = () => {
    const obj = [
      {
        planHeader,
        planPrice,
        planDes,
      },
      {
        planHeader:planHeader1,
        planPrice:planPrice1,
        planDes:planDes1,
      },
      {
        planHeader:planHeader2,
        planPrice:planPrice2,
        planDes:planDes2,
      },
    ];
    setThreeplan(obj);
    onClose();
  };
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"full"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontWeight={"bold"} textAlign={"center"} letterSpacing={2}>Three PLans</DrawerHeader>

        <DrawerBody>
          <Box mt={4}>
            <Center fontSize={20} fontWeight={"bold"}>Plan 1</Center>
            <FormControl>
              <FormLabel htmlFor="headerText" fontWeight={"normal"}>
                PLan Header
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdLocationOn color="gray.300" />}
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
                    children={<MdLocationOn color="gray.300" />}
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
                    children={<MdLocationOn color="gray.300" />}
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
                    children={<MdLocationOn color="gray.300" />}
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
                    children={<FiDollarSign color="gray.300" />}
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
                    children={<MdLocationOn color="gray.300" />}
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
            <Center fontSize={20} fontWeight={"bold"}>Plan 2</Center>
            <FormControl>
              <FormLabel htmlFor="headerText1" fontWeight={"normal"}>
                PLan Header
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdLocationOn color="gray.300" />}
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
                    children={<MdLocationOn color="gray.300" />}
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
                    children={<MdLocationOn color="gray.300" />}
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
                    children={<MdLocationOn color="gray.300" />}
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
                    children={<FiDollarSign color="gray.300" />}
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
                    children={<MdLocationOn color="gray.300" />}
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
            <Center fontSize={20} fontWeight={"bold"}>Plan 3</Center>
            <FormControl>
              <FormLabel htmlFor="headerText2" fontWeight={"normal"}>
                PLan Header
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdLocationOn color="gray.300" />}
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
                    children={<MdLocationOn color="gray.300" />}
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
                    children={<MdLocationOn color="gray.300" />}
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
                    children={<MdLocationOn color="gray.300" />}
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
                    children={<FiDollarSign color="gray.300" />}
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
                    children={<MdLocationOn color="gray.300" />}
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

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={saved}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ThreePlans;
