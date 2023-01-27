import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Switch,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { Edit } from "@mui/icons-material";
import React from "react";
import { deleteUser } from "../services/UserServices";
import DrawerExample from "./EditUserPassword";
import  moment  from 'moment';

const AccountInformationTab = ({ user,refresh,setRefresh }) => {
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const currentuser = localStorage.getItem("currentuser");
  const deleteUserFun = () => {
    deleteUser(currentuser)
      .then((res) => {
        toast({
          title: "User Deleted.",
          description: "You have successfully Delete User.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        localStorage.removeItem("admin");
        localStorage.removeItem("token");
        localStorage.removeItem("currentuser");
        window.location.href = "/login";
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
  };
  return (
    <div style={{ minHeight: "219px" }}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <FormControl>
            <FormLabel>Create At</FormLabel> 
            <Input type="text" isReadOnly value={moment(user.createdAt).format("DD MMMM YYYY")} /> 
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Delete User</FormLabel>
            <Button
              color="red.500"
              variant="outline"
              _hover={{ bg: "red.500", color: "#fff" }}
              onClick={deleteUserFun}
            >
              Delete User
            </Button>
          </FormControl>
        </GridItem>
      </Grid>
      <Grid mt={5} templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              Change User Password
            </FormLabel>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl display="flex" alignItems="center">
                    <DrawerExample
                    refresh={refresh}
                    setRefresh={setRefresh}
                    user={user}
                  />
          </FormControl>
        </GridItem>
      </Grid>
      <Grid mt={5} templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              Enable Arabic Language?
            </FormLabel>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl display="flex" alignItems="center">
            <Switch id="email-alerts" />
          </FormControl>
        </GridItem>
      </Grid>
      <Grid mt={5} templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0" letterSpacing={2}>
              Enable {localStorage.getItem("chakra-ui-color-mode")=== "light"? "Dark" :"Light"} Mode?
            </FormLabel>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl display="flex" alignItems="center">
            <Switch id="email-alerts" onChange={toggleColorMode}/>
          </FormControl>
        </GridItem>
      </Grid>
    </div>
  );
};

export default AccountInformationTab;
