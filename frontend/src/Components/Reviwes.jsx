import { ReactNode, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import {
  Home,
  HomeMaxOutlined,
  LocationCity,
  LocationCityRounded,
  People,
  Star,
} from "@mui/icons-material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ChaletIcon from "@mui/icons-material/Chalet";
import { BiDollar } from "react-icons/bi";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import TableBarIcon from "@mui/icons-material/TableBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Testimonial = ({ children }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name, title }) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} alt={name} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles({ hall }) {
  console.log(hall);

  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}>
      <Container maxW={"7xl"} py={5} as={Stack} spacing={5}>
        <Box align={"center"}>
          <Heading>Service Details</Heading>
          <Text>All you need to know about the Hall</Text>
        </Box>
        <Box display="flex" flexDirection={{ base: "column", sm: "column" ,md:"column",xl:"row"}}>
          <FormControl mt={1} me={{ base: 0, sm: 2 }}>
            <FormLabel fontSize={20}>Hall Name</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FiUser color="gray.300" />}
              />

              <Input isReadOnly value={hall.name} onChange={(e) => {}} />
            </InputGroup>
          </FormControl>

          <FormControl mt={1} me={{ base: 0, sm: 2 }}>
            <FormLabel fontSize={20}>Hall Type</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<ChaletIcon color="gray.300" />}
              />

              <Input isReadOnly value={hall.halltype} onChange={(e) => {}} />
            </InputGroup>
          </FormControl>

          <FormControl mt={1} me={{ base: 0, sm: 2 }}>
            <FormLabel fontSize={20}>Hall Phone</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FiUser color="gray.300" />}
              />

              <Input isReadOnly value={hall.phone} onChange={(e) => {}} />
            </InputGroup>
          </FormControl>
        </Box>

        <Box display="flex" flexDirection={{ base: "column", sm: "column" ,md:"column",xl:"row"}}>
          <FormControl mt={1} me={{ base: 0, sm: 2 }}>
            <FormLabel fontSize={20}>Hall capacity</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<People color="gray.300" />}
              />

              <Input isReadOnly value={hall.capacity} onChange={(e) => {}} />
            </InputGroup>
          </FormControl>
          <FormControl mt={1} me={{ base: 0, sm: 2 }}>
            <FormLabel fontSize={20}>Hall Governorate</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<LocationCity color="gray.300" />}
              />
              <Input isReadOnly value={hall.mohafza} onChange={(e) => {}} />
            </InputGroup>
          </FormControl>

          <FormControl mt={1} me={{ base: 0, sm: 2 }}>
            <FormLabel fontSize={20}>Hall Location</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AddLocationIcon color="gray.300" />}
              />

              <Input isReadOnly value={hall.location} onChange={(e) => {}} />
            </InputGroup>
          </FormControl>
        </Box>

        <Box display="flex" flexDirection={{ base: "column", sm: "column" ,md:"column",xl:"row"}}>
          <FormControl mt={1} me={{ base: 0, sm: 2 }}>
            <FormLabel fontSize={20}>#Chairs</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<ChairAltIcon color="gray.300" />}
              />
              <Input isReadOnly value={hall.chairs} onChange={(e) => {}} />
            </InputGroup>
          </FormControl>

          <FormControl mt={1} me={{ base: 0, sm: 2 }}>
            <FormLabel fontSize={20}>#Tables</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<TableBarIcon color="gray.300" />}
              />
              <Input isReadOnly value={hall.tables} onChange={(e) => {}} />
            </InputGroup>
          </FormControl>
          <FormControl mt={1} me={{ base: 0, sm: 2 }}>
            <FormLabel fontSize={20}>Hall floor</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Home color="gray.300" />}
              />
              <Input isReadOnly value={hall.floor} onChange={(e) => {}} />
            </InputGroup>
          </FormControl>
        </Box>

        <Box display="flex" flexDirection={{ base: "column", sm: "column" ,md:"column",xl:"row"}}>
          <FormControl mt={1} me={{ base: 0, sm: 2 }}>
            <FormLabel fontSize={20}>#Likes</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FavoriteIcon color="gray.300" />}
              />

              <Input isReadOnly value={hall.likes} onChange={(e) => {}} />
            </InputGroup>
          </FormControl>

          <FormControl mt={1} me={{ base: 0, sm: 2 }}>
            <FormLabel fontSize={20}>Hall Rate</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Star color="gray.300" />}
              />
              <Input isReadOnly value={hall.rate} onChange={(e) => {}} />
            </InputGroup>
          </FormControl>

          <FormControl mt={1} me={{ base: 0, sm: 2 }}>
            <FormLabel fontSize={20}>Hall Price</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BiDollar color="gray.300" />}
              />

              <Input isReadOnly value={hall.price} onChange={(e) => {}} />
            </InputGroup>
          </FormControl>
        </Box>
      </Container>
    </Box>
  );
}
