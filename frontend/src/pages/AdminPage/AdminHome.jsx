import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CommonPage from "../CommonPage";
import { PieChart } from "./PieChart";
import { getTypeHallNum } from "./../../services/AdminServices/HallTypeNum";
import { BiUserCircle } from "react-icons/bi";
import { BarChart } from "./../../Components/Chart2";
import { LineChart } from "./../../Components/LineChart";
import LoadingPage from "../Loading/LoadingPage";
import { BarChart2 } from "../../Components/Charts3";

const AdminHome = () => {
  const bgd = useColorModeValue("blackAlpha.100", "whiteAlpha.300");

  const [opened, setOpened] = useState(0);
  const [closed, setClosed] = useState(0);
  const [allHall, setAllHall] = useState(0);
  const [allUser, setAllUser] = useState(0);
  const [allReport, setAllReport] = useState(0);

  const [allBook, setAllBook] = useState(0);
  const [allAdmins, setAllAdmins] = useState(0);

  useEffect(() => {
    getTypeHallNum()
      .then((res) => {
        setOpened(res.data.opened);
        setClosed(res.data.closed);
        setAllHall(res.data.allHall);
        setAllUser(res.data.allUsers);
        setAllBook(res.data.allBook);
        setAllAdmins(res.data.allAdmins);
        setAllReport(res.data.allReport);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <CommonPage />

      {allHall > 0 ? (
        <Box ml={{ base: 0, md: 60 }}>
          <Center mb={5}>
            <Heading fontSize={{ base: "20px", md: "25px", xl: "30px" }}>
              Admin Dashboard Page
            </Heading>
          </Center>
          <Flex
            mb={5}
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="center"
            textAlign={"center"}
          >
            <Box flex={1} ml={2} mr={2} mb={2} bg={bgd}>
              <Heading size="2xl"> Users</Heading>
              <Text fontSize="4xl">{allUser}</Text>
            </Box>
            
            <Box flex={1} mr={2} mb={2} bg={bgd}>
              <Heading size="2xl"> Admins</Heading>
              <Text fontSize="4xl">{allAdmins}</Text>
            </Box>
            <Box flex={1} bg={bgd} mr={2} mb={2}>
              <Heading size="2xl">Halls</Heading>
              <Text fontSize="4xl">{allHall}</Text>
            </Box>
            <Box flex={1} bg={bgd} mr={2} mb={2}>
              <Heading size="2xl">Booked</Heading>
              <Text fontSize="4xl">{allBook}</Text>
            </Box>
            <Box flex={1} mr={2} mb={2} bg={bgd}>
              <Heading size="2xl"> Reports</Heading>
              <Text fontSize="4xl">{allUser}</Text>
            </Box>
          </Flex>
          <Flex mt={4} flexDirection={{ base: "column", sm: "row" }}>
            <Box
              width={{ base: "300px", md: "500px" }}
              display="flex"
              justifyContent={"center"}
              margin="auto"
            >
              <PieChart num1={opened} num2={closed} />
            </Box>
            <Box
              width={{ base: "300px", md: "500px" }}
              display="flex"
              justifyContent={"center"}
              margin="auto"
            >
              <BarChart />
            </Box>
          </Flex>

          <Flex mt={4} flexDirection={{ base: "column", sm: "row" }}>
            <Box  width={{ base: "300px", md: "500px" }}
              display="flex"
              justifyContent={"center"}
              margin="auto">
              <LineChart />
            </Box>
            <Box
              width={{ base: "300px", md: "500px" }}
              display="flex"
              justifyContent={"center"}
              margin="auto"
            >
              <BarChart2 />
            </Box>
          </Flex>
        </Box>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default AdminHome;
