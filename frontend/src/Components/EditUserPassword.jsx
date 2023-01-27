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
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Edit } from "@mui/icons-material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { changePassword, editUserFun } from "../services/UserServices";
import EditUserPassword from "../validations/EditUserPassword";
import EditUserValidations from "../validations/EditUserValidate";
import validate from "../validations/EditUserValidate";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function DrawerExample({ refresh, setRefresh, user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();
  const [show, setShow] = useState(false);

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
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    onSubmit: (values) => {
      changePassword(values.password, values.confirmpassword, currentuser)
        .then((res) => {
    
          toast({
            title: "Success",
            description: `${res.data.msg}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setRefresh(!refresh);
          values.password = "";
          values.confirmpassword = "";
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
    validationSchema: EditUserPassword,
  });
  return (
    <>
      <Edit ref={btnRef} onClick={onOpen} cursor="pointer" />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit User Password</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormControl isInvalid={touched.firstname && errors.firstname}>
                  <FormLabel htmlFor="pass1">New Password</FormLabel>

                  <InputGroup size="md">
                    <Input
                      id="pass1"
                      name="password"
                      type={show ? "text" : "password"}
                      placeholder="Enter New Password"
                      onChange={handleChange}
                      value={values.password}
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
              </Box>
              <Box>
                <FormControl
                  isInvalid={touched.confirmpassword && errors.confirmpassword}
                >
                  <FormLabel htmlFor="pass2">Confirm Password</FormLabel>
                 


<InputGroup size="md">
<Input
                    id="pass2"
                    name="confirmpassword"
                    type={show ? "text" : "password"}
                    placeholder="Enter Confirm Password"
                    onChange={handleChange}
                    value={values.confirmpassword}
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

                  {touched.confirmpassword && (
                    <FormErrorMessage>
                      {errors.confirmpassword}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Box>
            </Stack>
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
