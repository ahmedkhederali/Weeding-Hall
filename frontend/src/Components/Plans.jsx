import { ReactNode } from "react";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { FaChair, FaCheckCircle,FaWineGlass } from "react-icons/fa";
import {GiTable,GiCakeSlice} from "react-icons/gi";
import {AiOutlineTable} from "react-icons/ai";
function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "center" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function ThreeTierPricing({ hall }) {
  const x=useColorModeValue("gray.50", "gray.700")
  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
        <Text fontSize="lg" color={"white.500"}>
          There is a Three Option You can Select on of Them.
        </Text>
      </VStack>
      <Stack
        direction={{
          base: "column",
          md: "column",
          lg: "column",
          xl: "row",
          "2xl": "row",
        }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        {hall.threeplan &&
          hall.threeplan?.map((item, index) => (
            <PriceWrapper key={item._id} >
            <Box position="relative" minWidth={"294px"}>
              <Box py={4} px={12}>
              <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: "translate(-50%)" }}
            >
              {index === 1 ? (
                <Text
                textTransform="uppercase"
                bg={("red.300", "red.700")}
                px={3}
                py={1}
                color={("gray.900", "gray.300")}
                fontSize="sm"
                fontWeight="600"
                rounded="xl"
              >
                Most Popular
              </Text>
              ):""}
            </Box>
                <Text fontWeight="500" fontSize="2xl">
                  {item.planHeader}
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="5xl" fontWeight="900">
                    {item.planPrice}
                  </Text>
                  <Text fontSize="3xl" color="gray.500">
                    EGP
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={x}
                py={4}
                borderBottomRadius={"xl"}
              >
                {hall.threeplan && hall.threeplan[index].planDes?.map((i, n) => (
                    <List spacing={3} textAlign="start" px={12} key={i._id}>
                      <ListItem>
                        <ListIcon as={FaChair} color="green.500" />
                       {i.planchairs}{" "} Chair
                      </ListItem>
                      <ListItem>
                        <ListIcon as={GiTable} color="green.500" />
                        {i.plantables}{" "} Table
                      </ListItem>
                      <ListItem>
                        <ListIcon as={AiOutlineTable} color="green.500" />
                        {i.planfloors}{" "} Floor
                      </ListItem>
                      <ListItem>
                        <ListIcon as={GiCakeSlice} color="green.500" />
                        {i.plancake}{" "} Cake
                      </ListItem>
                      <ListItem>
                        <ListIcon as={FaWineGlass} color="green.500" />
                        {i.plancans}{" "} Can
                      </ListItem>
                    </List>
          ))}
               
              </VStack>
              </Box>
            </PriceWrapper>
          ))}
      </Stack>
    </Box>
  );
}
