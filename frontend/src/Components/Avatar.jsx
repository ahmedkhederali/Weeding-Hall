import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Avatars = ({ user, index }) => {
  console.log(user)
  return (
    <Flex spacing="2">
      <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
        <Avatar
          name={`${user.firstname} ${user.lastname}`}
          src={`${user.avatar && user.avatar.url} `}
        />

        <Box>
          <Heading size="sm">{`${user.firstname} ${user.lastname}`}</Heading>
          <Text>{user.role}</Text>
        </Box>
      </Flex>
      <Flex gap="4" alignItems="center" flexWrap="wrap">
        <Box></Box>
        <Box>
          <p>Report # {index + 1} </p>
          <p>{user.phone}</p>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Avatars;
