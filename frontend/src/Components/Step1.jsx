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
} from "@chakra-ui/react";
import React from "react";

const Step1 = ({
  setFirstname,
  firstname,
  lastname,
  setLastname,
  firstnamear,
  lastnamear,
  email,
  setEmail,
  address,
  addressar,
  nationalid,
  phone,
  religion,
  setReigion,
  religionar,
  setReigionar,
  setPhone,
  setNationalId,
  setAddressar,
  setAddress,
  setLastnamear,
  setFirstnamear,
}) => {
  return (
    <Box mt={{ base: 2, md: 5 }}>
      <Center>
        <Heading fontSize={20}>Personal Information </Heading>
      </Center>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            First name
          </FormLabel>
          <Input
            id="first-name"
            placeholder="First name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Last name
          </FormLabel>
          <Input
            id="last-name"
            placeholder="Last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </FormControl>
      </Flex>
      <Flex mt={"2%"}>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-namear" fontWeight={"normal"}>
            الاسم الاول 
          </FormLabel>
          <Input
            id="first-namear"
            placeholder="ادخل الاسم الاول "
            value={firstnamear}
            onChange={(e) => setFirstnamear(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last-namear" fontWeight={"normal"}>
          الاسم الاخير 
          </FormLabel>
          <Input
            id="last-namear"
            placeholder="ادخل الاسم الاخير"
            value={lastnamear}
            onChange={(e) => setLastnamear(e.target.value)}
          />
        </FormControl>
      </Flex>

      <FormControl mr="5%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <Flex mt={"1%"}>
        <FormControl mr="5%">
          <FormLabel htmlFor="address" fontWeight={"normal"}>
            Address
          </FormLabel>
          <Input
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="addressar" fontWeight={"normal"}>
            عنوانك 
          </FormLabel>
          <Input
            id="addressar"
            placeholder="ادخل عنوانك"
            value={addressar}
            onChange={(e) => setAddressar(e.target.value)}
          />
        </FormControl>
      </Flex>

      <FormControl mt="1%">
        <FormLabel htmlFor="nationalid" fontWeight={"normal"}>
          National ID
        </FormLabel>
        <Input
          id="nationalid"
          placeholder="National ID"
          value={nationalid}
          onChange={(e) => setNationalId(e.target.value)}
        />
      </FormControl>
      <Flex mt="1%" mb={"1%"}>
      <FormControl mr="5%">
      <FormLabel htmlFor="nationalid" fontWeight={"normal"}>
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

        <FormControl >
          <FormLabel htmlFor="hallName" fontWeight={"normal"}>
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
        
      </Flex>
      <FormControl >
          <FormLabel htmlFor="phone" fontWeight={"normal"}>
            Phone
          </FormLabel>
          <Input
            id="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormControl>
      
    </Box>
  );
};

export default Step1;
