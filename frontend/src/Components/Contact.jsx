import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  useToast,
  Center,
  Stack,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addReport } from "../services/ReportServices";
import { PhoneIcon } from "@chakra-ui/icons";
import { Email } from "@mui/icons-material";
import AddLocationIcon from "@mui/icons-material/AddLocation";

export default function Contact({ hall }) {
  const colors = useColorModeValue("gray.100", "gray.900");
  const colors2 = useColorModeValue("black.300", "white.900");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  const userId = localStorage.getItem("currentuser");
  const { id: hallId } = useParams();
  const toast = useToast();

  const sendReport = () => {
    if (name.length < 3) {
      toast({
        title: "Error!",
        description: "UserName is Short...",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else if (
      phone.length < 11 ||
      phone.length > 11 ||
      (!phone.startsWith("010") &&
        !phone.startsWith("011") &&
        !phone.startsWith("012") &&
        !phone.startsWith("015"))
    ) {
      toast({
        title: "Error!",
        description: "Wrong Phone Number...",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else if (content.length < 100) {
      toast({
        title: "Error!",
        description: "Message Must Greater Than 100 Character",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      addReport(name, phone, content, userId, hallId)
        .then(() => {
          toast({
            title: "Report Saved.",
            description: "You have successfully Add Report.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setName("");
          setPhone("");
          setContent("");
        })
        .catch(() => {
          toast({
            title: "Error!",
            description: "Something Went Wrong Try Again...",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    }
  };
  return (
    <Container maxW={"7xl"} pb={5} as={Stack} spacing={5}>
      <Center>
        <Heading textAlign={"center"}>Contact</Heading>
      </Center>

      <Box display="flex" flexDirection={{ base: "column", sm: "row" }}>
        <FormControl mt={1} me={{ base: 0, sm: 2 }}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<PhoneIcon color="gray.300" />}
            />

            <Input isReadOnly value={hall.phone} onChange={(e) => {}} />
          </InputGroup>
        </FormControl>
        <FormControl mt={1} me={{ base: 0, sm: 2 }}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Email color="gray.300" />}
            />

            <Input
              isReadOnly
              value={hall.email || `test@gmil.com`}
              onChange={(e) => {}}
            />
          </InputGroup>
        </FormControl>
        <FormControl mt={1} me={{ base: 0, sm: 2 }}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AddLocationIcon color="gray.300" />}
            />

            <Input isReadOnly value={hall.location} onChange={(e) => {}} />
          </InputGroup>
        </FormControl>
      </Box>

      <Center>
        {" "}
        <Heading textAlign={"center"}>Reports</Heading>
      </Center>

      <Box display={"flex"} flexDirection={{ base: "column", sm: "row" }}>
        <FormControl id="name" mt={2} me={{ base: 0, sm: 2 }}>
          <FormLabel>Your Name</FormLabel>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              children={<BsPerson color="gray.800" />}
            />
            <Input
              type="text"
              size="md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="name" mt={2}>
          <FormLabel>Phone</FormLabel>
          <InputGroup borderColor="#E0E1E7">
            <InputLeftElement
              pointerEvents="none"
              children={<FiPhone color="gray.800" />}
            />
            <Input
              type="text"
              size="md"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>
        </FormControl>
      </Box>
      <FormControl id="name" mt={2}>
        <FormLabel>Report Description</FormLabel>
        <Textarea
          min={100}
          max={10000}
          borderColor="gray.300"
          _hover={{
            borderRadius: "gray.300",
          }}
          placeholder="message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormControl>
      <FormControl id="name" float="right" mt={2}>
        <Button
          variant="solid"
          bg="#0D74FF"
          color={colors2}
          _hover={{}}
          onClick={sendReport}
        >
          Send Report
        </Button>
      </FormControl>
    </Container>
  );
}
