import React, { useEffect, useState } from "react";
import { Divider, Box, Text, Avatar } from "@chakra-ui/react";
import moment from "moment";
import useGetNameById from "./../Hooks/useGetNameById";
import { Flex } from "@chakra-ui/react";

const Comment = ({ authorId, commentText, createdAt  , refreshes ,setRefresh }) => {
  const [name] = useGetNameById(authorId);
  const [author, setAuthor] = useState("");
  useEffect(() => {
    setAuthor(name);
  }, [name]);

  return (
    <Box p={2}>
      <Divider />
      <Box display="flex" mt={{ base: 5, md: 10 }} fontSize={20}>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Avatar name={author && author} size="xs" src={author} px={2} />
          <Text mr={2} fontWeight={600}>
            {" "}
            {author}{" "}
          </Text>
        </Flex>
        |
        <Text ml={2} fontWeight={300}>
          {moment(createdAt).format("DD MMMM YYYY")}
        </Text>
      </Box>
      <Text mt={5} mb={{ base: 5, md: 10 }}>
        {commentText}
      </Text>
      <Divider />
    </Box>
  );
};

export default Comment;
