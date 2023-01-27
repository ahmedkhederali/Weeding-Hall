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
import { Link,  useNavigate, useParams } from "react-router-dom";
import { ResetPassword } from "../../../services/UserServices";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const toast = useToast();
  const {id:token}=useParams()
  const navigate=useNavigate()
  const resetPass = () => {
  
    try {
      ResetPassword(password,confirmpassword,token)
        .then((res, err) => {
      
          toast({
            title: "Success",
            description: `${res.data.msg}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/login")
         
        })
        .catch((err) => {
          setPassword("");
          setConfirmpassword("")
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
            Reset your password?
          </Heading>
          <Spacer />

          <Link to="/forgetpass">
            <Tooltip label="Back To Forget Passeord" fontSize="md">
              <ArrowBack />
            </Tooltip>
          </Link>
        </Flex>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Password and Confirm Must Be Same
        </Text>
        <FormControl id="password">
          <Input
            placeholder="Enter New Password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl id="confirmpassword">
          <Input
            placeholder="Confirm Password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
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
            Reset Password
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
