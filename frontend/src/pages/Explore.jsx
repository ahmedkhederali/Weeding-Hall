import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardOfHall from "../Components/CardOfHall";
import SmallWithSocial from "../Components/Footer";
import { getExploreHall } from "../services/HallServices";
import CommonPage from "./CommonPage";
import LoadingPage from "./Loading/LoadingPage";

const Explore = () => {
  const [explore, setExplore] = useState([]);
  const currentUser = localStorage.getItem("currentuser");
  useEffect(() => {
    getExploreHall().then((result) => {
      setExplore(result.data.hall);
    });
  }, [currentUser]);
  if (currentUser !== "") {
    return (
      <>
        <CommonPage />
        {explore.length !== 0 ? (
          <Box ml={{ base: 0, md: 60 }}>
            <Center mt={{ base: 5 }} mb={{ base: 5 }}>
              <Heading mb={4} size="lg">
                Five Top Likes Hall
              </Heading>
            </Center>
            <Wrap
              alignSelf={{ base: "center", lg: "flex-start" }}
              spacing="15px"
              justify={{ base: "center", "2xl": "flex-start" }}
            >
              {explore &&
                explore?.map((item, index) => (
                  <WrapItem key={index}>
                    <CardOfHall key={index} item={item} />
                  </WrapItem>
                ))}
            </Wrap>
          </Box>
        ) : (
          <LoadingPage />
        )}
      </>
    );
  }
};

export default Explore;
