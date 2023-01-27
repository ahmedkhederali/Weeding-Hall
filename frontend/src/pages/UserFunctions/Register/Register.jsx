import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  Input,
  Text,
  InputRightElement,
  Button,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";

import RegisterValidations from "../../../validations/RegisterValidations";
import { Register as Signup } from "../../../services/AuthServices";

const Register = () => {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    handleChange,
    values,
    resetForm,
    handleBlur,
    touched,
    isValid,
    errors,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      firstnamear: "",
      lastnamear: "",
      email: "",
      password: "",
      phone: "0",
      terms: false,
    
    },
    onSubmit: (values) => {
      if (values.phone.length === 11) {
        Signup(
          values.firstname,
          values.lastname,
          values.firstnamear,
          values.lastnamear,
          values.email,
          values.password,
          values.phone,
        )
          .then((result) => {
        
            if (result.data.user) {
              navigate("/login");
              toast({
                title: "Welcome to Weegin Hall WebSite!",
                description: "You have successfully registered.",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
            }
          })
          .catch((err) => {
            resetForm();
            toast({
              title: "Error!",
              description: `${err.response.data.msg}`,
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          });
      } else {
        toast({
          title: "Error!",
          description: "Please enter a valid phone number.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    },
    validationSchema: RegisterValidations,
  });
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      mt={5}
    >
      <Box width={{ base: "100vw", sm: "500px" }} p={2}>
        <Text
          textAlign="center"
          color={"teal"}
          fontSize={32}
          fontWeight={600}
          mb={10}
        >
          Create New Acount
        </Text>
        <Box display="flex" flexDirection={{ base: "column", sm: "row" }}>
          <FormControl
            mt={3}
            width={{ base: "100%", sm: "50%" }}
            me={{ base: 0, sm: 2 }}
            isInvalid={touched.firstname && errors.firstname}
          >
            <FormLabel fontSize={20}>First Name</FormLabel>
            <Input
              name="firstname"
              placeholder="Enter First Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstname}
            />
            {touched.firstname && (
              <FormErrorMessage>{errors.firstname}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            mt={3}
            width={{ base: "100%", sm: "50%" }}
            isInvalid={touched.lastname && errors.lastname}
          >
            <FormLabel fontSize={20}>Last Name</FormLabel>
            <Input
              name="lastname"
              placeholder="Enter Last Name"
              onChange={handleChange}
              value={values.lastname}
              onBlur={handleBlur}
            />
            {touched.lastname && (
              <FormErrorMessage>{errors.lastname}</FormErrorMessage>
            )}
          </FormControl>
        </Box>
        
        <Box display="flex" flexDirection={{ base: "column", sm: "row" }}>
          <FormControl
            mt={3}
            width={{ base: "100%", sm: "50%" }}
            me={{ base: 0, sm: 2 }}
            isInvalid={touched.firstnamear && errors.firstnamear}
          >
            <FormLabel fontSize={20}>First Name In Arabic</FormLabel>
            <Input
              name="firstnamear"
              placeholder="Enter First Name In Arabic"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstnamear}
            />
            {touched.firstnamear && (
              <FormErrorMessage>{errors.firstnamear}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            mt={3}
            width={{ base: "100%", sm: "50%" }}
            isInvalid={touched.lastnamear && errors.lastnamear}
          >
            <FormLabel fontSize={20}>Last Name in Arabic</FormLabel>
            <Input
              name="lastnamear"
              placeholder="Enter Last Name in Arabic"
              onChange={handleChange}
              value={values.lastnamear}
              onBlur={handleBlur}
            />
            {touched.lastnamear && (
              <FormErrorMessage>{errors.lastnamear}</FormErrorMessage>
            )}
          </FormControl>
        </Box>

        <FormControl mt={3} isInvalid={touched.email && errors.email}>
          <FormLabel fontSize={20}>Email</FormLabel>
          <Input
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
          />
          {touched.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>
        <FormControl mt={3} isInvalid={touched.phone && errors.phone}>
          <FormLabel fontSize={20}>Phone</FormLabel>
          <Input
            type="tel"
            name="phone"
            maxLength={11}
            pattern="[0-9]"
            placeholder="Enter Phone"
            onChange={handleChange}
            value={values.phone}
            onBlur={handleBlur}
          />
          {touched.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
        </FormControl>
        <FormControl mt={3} isInvalid={touched.password && errors.password}>
          <FormLabel fontSize={20}>Password</FormLabel>
          <InputGroup size="md">
            <Input
              name="password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                variant="ghost"
                onClick={() => setShow(!show)}
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {touched.password && (
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          )}
        </FormControl>
        <Checkbox
          name="terms"
          isChecked={values.terms}
          onChange={handleChange}
          mt={5}
        >
          I agree the <strong>Terms of Service</strong> and{" "}
          <strong>Privacy Policy</strong>.
        </Checkbox>
        <Button
          mt={5}
          width="100%"
          variant="solid"
          colorScheme="facebook"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          Register
        </Button>

        <br />
        <Text my={3} width="100%" textAlign="center">
          or
        </Text>
        <Button
          width="100%"
          variant="outline"
          colorScheme="facebook"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
