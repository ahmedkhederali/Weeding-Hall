import {
  Box,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { checkifThieranthorBookIntheSameDay, checkifThieranthorBookIntheSameDayDuringBook } from "../services/BookService";
import { getHallById } from './../services/HallServices';

const Step2 = ({
  hallName,hallPrice,hallPhone,hallLocation,date,cake,priceOfOneCake,cans,pricOneCans,
  setHallName,setHallPrice,setHallPhone,setHallLocation,setDate,setCake,setPriceCake,setCans,setPriceOfOneCans
}) => {
const {id}=useParams();
const toast = useToast(); 
const handleDateFun = (e) => {
  checkifThieranthorBookIntheSameDayDuringBook( e, id).then(
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
    <Box mt={{ base: 2, md: 5 }}>
      <Center mb={1}>
        <Heading fontSize={20}>Hall Information </Heading>
      </Center>

      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="hall-name" fontWeight={"normal"}>
            Hall name
          </FormLabel>
          <Input id="hall-name" placeholder="Hall name" isReadOnly value={hallName} onChange={()=>{}}/>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="price" fontWeight={"normal"}>
            Hall Price
          </FormLabel>
          <Input id="price" placeholder="Price" isReadOnly value={hallPrice} onChange={()=>{}}/>
        </FormControl>
      </Flex>

      <Flex mt="1%" mb={"2%"}>
        <FormControl mr="5%">
          <FormLabel htmlFor="hallphone" fontWeight={"normal"}>
            Hall Phone
          </FormLabel>
          <Input id="hallphone" placeholder="Phone Number" isReadOnly value={hallPhone} onChange={()=>{}}/>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="hallloc" fontWeight={"normal"}>
            Hall Location
          </FormLabel>
          <Input id="hallloc" placeholder="Hall Location" isReadOnly value={hallLocation} onChange={()=>{}}/>
        </FormControl>
      </Flex>

      <FormControl mt="2%">
        <FormLabel htmlFor="dateofWedding" fontWeight={"normal"} >
          Date Of Weeding
        </FormLabel>
        <Input
          id="dateofWedding"
          placeholder="Select Date Of Weeding"
          type={"date"}
          value={date} 
          //onChange={(e)=>setDate(e.target.value)}
          onChange={(e) => handleDateFun(e.target.value)}
          
        />
      </FormControl>

      <Flex mt={"2%"}>
        <FormControl mr="5%">
          <FormLabel htmlFor="hall-cake" fontWeight={"normal"}>
            Number Of Cake
          </FormLabel>
          <Input
            id="hall-cake"
            placeholder="Number Of Cake"
            type="number"
            min={0}
            max={5000}
            value={cake} onChange={(e)=>setCake(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="hallcake" fontWeight={"normal"}>
            Price Of one Cake
          </FormLabel>
          <Select id="hallcake" placeholder="Select price"  value={priceOfOneCake} onChange={(e)=>setPriceCake(e.target.value)}>
            <option value="5">5 EGP</option>
            <option value="12">12 EGP </option>
            <option value="21">21 EGP </option>
          </Select>
        </FormControl>
      </Flex>

      <Flex mt={"2%"} mb={"2%"}>
        <FormControl mr="5%">
          <FormLabel htmlFor="hall-cans" fontWeight={"normal"}>
            Number Of Cans
          </FormLabel>
          <Input
            id="hall-cans"
            placeholder="Number Of cans"
            type="number"
            min={0}
            max={5000}
            value={cans} onChange={(e)=>setCans(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="hallCan" fontWeight={"normal"}>
            Price Of one cans
          </FormLabel>
          <Select id="hallCan" placeholder="Select option"  value={pricOneCans} onChange={(e)=>setPriceOfOneCans(e.target.value)}>
            <option value="5">5 EGP</option>
            <option value="10">10 EGP</option>
            <option value="15">15  EGP</option>
          </Select>
        </FormControl>
      </Flex>
    </Box>
  );
};

export default Step2;
