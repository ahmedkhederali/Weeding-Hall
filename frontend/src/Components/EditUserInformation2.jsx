import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Edit } from "@mui/icons-material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { getUserByID } from "../services/AuthServices";
import { editUserFun } from "../services/UserServices";
import EditUserValidations from "../validations/EditUserValidate";
import validate from "../validations/EditUserValidate";

export default function DrawerExample({ refresh, setRefresh ,user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();
const inital={
  firstname: user ? user.firstname : "",
  lastname: user ? user.lastname : "",
  email: user ? user.email : "",
  phone: user ? user.phone : ""
}


  const currentuser = localStorage.getItem("currentuser");
  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    isValid,
    resetForm,
  } = useFormik({
    initialValues:inital,
    onSubmit: (values) => {
      editUserFun(
        currentuser,
        values.firstname,
        values.lastname,
        values.email,
        values.phone
      )
        .then((res) => {
         
          toast({
            title: "Success",
            description: `${res.message}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setRefresh(!refresh);
          onClose();
        })
        .catch((err) => {
          toast({
            title: "Error!",
            description: `${err.response.data.msg}`,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    },
    validationSchema: EditUserValidations,
  });
  return (
    <>
      <Edit ref={btnRef} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit your account</DrawerHeader>

          <DrawerBody>
            {user && (
              <Stack spacing="24px">
                <Box>
                  <FormControl
                    isInvalid={touched.firstname && errors.firstname}
                  >
                    <FormLabel htmlFor="username1">First Name</FormLabel>
                    <Input
                      id="username1"
                      name="firstname"
                      placeholder="Enter First Name"
                      onChange={handleChange}
                      value={values.firstname }
                    />
                    {touched.firstname && (
                      <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Box>

                <FormControl
                    isInvalid={touched.lastname && errors.lastname}
                  >
                    <FormLabel htmlFor="username2">Last Name</FormLabel>
                    <Input
                      id="username2"
                      name="lastname"
                      placeholder="Enter Last Name"
                      onChange={handleChange}
                      value={values.lastname }
                    />
                    {touched.lastname && (
                      <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Box>
                <FormControl
                    isInvalid={touched.email && errors.email}
                  >
                    <FormLabel htmlFor="username3">Email Address</FormLabel>
                    <Input
                      id="username3"
                      name="email"
                      placeholder="Enter Email Address"
                      onChange={handleChange}
                      value={values.email }
                    />
                    {touched.email && (
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    )}
                  </FormControl>

                 
                </Box>
                <Box>
                <FormControl
                    isInvalid={touched.email && errors.email}
                  >
                    <FormLabel htmlFor="username4">Phone Number</FormLabel>
                    <Input
                      id="username4"
                      name="phone"
                      placeholder="Enter Phone Number"
                      onChange={handleChange}
                      value={values.phone }
                    />
                    {touched.phone && (
                      <FormErrorMessage>{errors.phone}</FormErrorMessage>
                    )}
                  </FormControl>

        
                </Box>
              </Stack>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              validate={validate}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
