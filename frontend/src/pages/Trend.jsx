import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardOfHall from "../Components/CardOfHall";
import SmallWithSocial from "../Components/Footer";
import { getTrendHall } from "../services/HallServices";
import CommonPage from "./CommonPage";
import LoadingPage from "./Loading/LoadingPage";

const Trend = () => {
  const [trend, setTrend] = useState([]);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentuser");
  useEffect(() => {
    getTrendHall().then((result) => {
      setTrend(result.data.hall);
    });
  }, [currentUser]);
  if (currentUser !== "") {
    return (
      <>
        <CommonPage />
        {trend.length !== 0 ? (
          <Box ml={{ base: 0, md: 60 }}>
            <Center mt={{ base: 5 }} mb={{ base: 5 }}>
              <Heading mb={4} size="lg">
                Five Top Rate Hall
              </Heading>
            </Center>
            <Wrap
              alignSelf={{ base: "center", lg: "flex-start" }}
              spacing="15px"
              justify={{ base: "center", "2xl": "flex-start" }}
            >
              {trend &&
                trend?.map((item, index) => (
                  <WrapItem key={index}>
                    <CardOfHall item={item} />
                  </WrapItem>
                ))}
            </Wrap>
          </Box>
        ) : (
          <LoadingPage />
        )}
        {/* <Box ml={{ base: 0, md: 60 }} mt={{ base: 10 }}>
            <SmallWithSocial />
          </Box> */}
      </>
    );
  }
};

export default Trend;
