import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import  StarRatings  from 'react-star-ratings';

const LikesCardMini = ({ item ,ratings}) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mx={2}
      key={item._id}
    >
      <Image
        width="282px"
        height="155px"
        src={item.hallimgposter.url}
        alt={item.hallimgposter.public_id}
      />

      <Box p="5">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {item.mohafza}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {item.chairs} Chairs &bull; {item.tables} Tables
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {item.name}
        </Box>

        <Box display="flex" mt="2" alignItems="center">
        <StarRatings
                starDimension={"20"}
                starSpacing={"2"}
                rating={ratings}
                starRatedColor="#FFD700"
                numberOfStars={5}
                name="rating"
              />
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" color="gray.600" fontSize="sm" mx={1}>
            <Link to={`/hall/${item._id}`}>
              <Button colorScheme="teal" variant="outline">
                Go To Hall WebSite
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LikesCardMini;
