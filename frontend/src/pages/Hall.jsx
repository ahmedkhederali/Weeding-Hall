import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  Select,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { SearchOff } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardOfHall from "../Components/CardOfHall";
import SmallWithSocial from "../Components/Footer";
import { getAllHalls } from "./../services/HallServices";
import CommonPage from "./CommonPage";
import LoadingPage from "./Loading/LoadingPage";

const Hall = () => {
  const [property, setPropertity] = useState([]);
  const [nameHall, setNameHall] = useState("");
  const [mohafza, setMohafza] = useState("");
  const [typeHall, setTypeHall] = useState("");
  const [price, setPrice] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAllHalls(mohafza, typeHall, nameHall, price).then((res) => {
      setPropertity(res.data.halls);
    });
    
  }, [mohafza, typeHall, nameHall, price,refresh]);
  const EmptyAllFiled = ({}) => {
    setMohafza("");
    setNameHall("");
    setPrice("");
    setTypeHall("");
  };

  return (
    <>
      <CommonPage />
      <Box ml={{ base: 0, md: 60 }}>
      {/*Filter Component */}
        <Box>
          <Grid
            templateAreas={`
                  " main nav"
                  `}
            gridTemplateRows={"50px 1fr"}
            gridTemplateColumns={"1fr"}
            gap="1"
            p={2}
            paddingBottom={0}
            fontWeight="bold"
          >
            <GridItem pl="2" area={"main"}>
              <Input
                placeholder="Search By Hall Name"
                value={nameHall}
                onChange={(e) => setNameHall(e.target.value)}
              />
            </GridItem>
            <GridItem pl="2" area={"nav"}>
              <Button colorScheme="teal" size="md">
                Search..
              </Button>
            </GridItem>
          </Grid>
          <Grid
            templateAreas={`"header nav footer"`}
            gridTemplateRows={"1fr"}
            gridTemplateColumns={"1fr 1fr 1fr "}
            p={2}
            gap="1"
            fontWeight="bold"
          >
            <GridItem pl="2" area={"header"}>
              <Select
                placeholder="Governorate"
                value={mohafza}
                onChange={(e) => setMohafza(e.target.value)}
              >
                <option value="cairo">Cairo</option>
                <option value="menofia">Menufia</option>
              </Select>
            </GridItem>
            <GridItem pl="2" area={"nav"}>
              <Select
                placeholder="Type"
                value={typeHall}
                onChange={(e) => setTypeHall(e.target.value)}
              >
                <option value="open">Open</option>
                <option value="close">Close</option>
              </Select>
            </GridItem>

            <GridItem pl="2" area={"footer"}>
              <Select
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="price[lte]=6000">Lower or Equal 6000</option>
                <option value="price[gt]=6000">More Than 6000</option>
              </Select>
            </GridItem>
          </Grid>
        </Box>
        
        {property.length === 0 ? (
          <Box display="flex" justifyContent="center" minH={{ base: "60vh" }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              mt={10}
              p={3}
            >
              <Icon color="#314E89" fontSize={100} as={SearchOff} />
              <Heading textAlign="center" fontSize={30} mt={8}>
                Sorry, we couldn't find what you are looking for.
              </Heading>
              <Text textAlign="center" fontSize={24} mt={2} fontWeight={300}>
                But don't give up! Check out our Halls and find anyone for you
                wedding!
              </Text>
              <Button
                variant="solid"
                fontSize={20}
                px={10}
                mt={10}
                colorScheme="facebook"
                onClick={EmptyAllFiled}
              >
                Empty Filter...
              </Button>
            </Box>
          </Box>
        ) : (
          <Wrap
            alignSelf={{ base: "center", lg: "flex-start" }}
            spacing="15px"
            justify={{ base: "center", "2xl": "flex-start" }}
          >
            {
              property ?
              property?.map((item, index) => (
                <WrapItem key={index}>
                  <CardOfHall item={item} hallid={item._id} refresh={refresh}  setRefresh={setRefresh}/>
                </WrapItem>
              )): (<LoadingPage/>)
              }
          </Wrap>
        )}
      </Box>
      <Box ml={{ base: 0, md: 60 }} mt={{ base: 10 }}>
        <SmallWithSocial />
      </Box>
    </>
  );
};

export default Hall;
