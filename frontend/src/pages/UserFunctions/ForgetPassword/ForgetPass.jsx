import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Spacer,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ForgetPassword } from "../../../services/UserServices";


export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const resetPass = () => {
    try {
      ForgetPassword(email)
        .then((res, err) => {
      
          toast({
            title: "Success",
            description: `${res.data.message}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
         
        }).catch((err) => {
          setEmail("");
          toast({
            title: "Error!",
            description: `${err.response.data.msg}`,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    } catch (error) {
      toast({
        title: "Error!",
        description: `${error.message}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Flex>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Forgot your password?
          </Heading>
          <Spacer />

          <Link to="/login">
            <Tooltip label="Back To Login" fontSize="md">
              <ArrowBack />
            </Tooltip>
          </Link>
        </Flex>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={resetPass}
          >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
