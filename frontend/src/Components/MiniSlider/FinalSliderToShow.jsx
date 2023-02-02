import {
  Flex,
  VStack,
  Heading,
  Text,
  HStack,
  Tag,
  Button,
  Image,
  Box,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ChakraCarousel from "./ChakraCarousel";
import capsFirst from "./utils/capsFirst";

const FinalSliderToShow = ({ hall }) => {
  const colors2 = useColorModeValue("black", "white");
  return (
    <ChakraCarousel gap={32}>
      {hall.imgs &&
        hall.imgs.map((photo, index) => (
          <Flex
            key={index}
            boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
            justifyContent="space-between"
            flexDirection="column"
            overflow="hidden"
            color="balck.300"
            bg="base.d100"
            rounded={5}
            flex={1}
            p={5}
            
          >
            <VStack mb={2}>
             <Center>
             <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                textAlign="left"
                w="full"
                mb={2}
                color={colors2}
              >
                {capsFirst(`Welcome To Our ${hall.name} Hall`)}
              </Heading>
             </Center>

              <Box boxSize="xs" height={"300px"} width={"300px"}>
                <Image src={photo.url} alt="Dan Abramov" minWidth={"100%"} height={"200px"}/>
              </Box>
             
            </VStack>

            <Flex textAlign={"center"} justifyContent="center">
              <HStack spacing={2}>
                <Tag size="sm" variant="outline" colorScheme="green">
                 {hall.name}
                </Tag>
                <Tag size="sm" variant="outline" colorScheme="cyan">
                  {hall.location}
                </Tag>
              </HStack>
            </Flex>
          </Flex>
        ))}
    </ChakraCarousel>
  );
};

export default FinalSliderToShow;
