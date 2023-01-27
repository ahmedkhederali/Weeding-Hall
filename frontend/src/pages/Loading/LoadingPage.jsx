import { Box, Spinner, Stack } from "@chakra-ui/react";
import React from "react";

const LoadingPage = () => {
  return (
    <Box ml={{base:0,md:60}} alignContent={"center"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Stack direction="row" spacing={4}>
        <Spinner size="xl" />
      </Stack>
    </Box>
  );
};

export default LoadingPage;
