import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Image,
  Input,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { Camera, CameraAltSharp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DrawerExample from "../../../Components/EditUserInformation2";
import SmallWithSocial from "../../../Components/Footer";
import UserProfileTabs from "../../../Components/UserProfileTabs";
import { getUserByID } from "../../../services/AuthServices";
import { changeProfileImg } from "../../../services/UserServices";
import CommonPage from "../../CommonPage";
import LoadingPage from "../../Loading/LoadingPage";
const Profile = () => {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState("");

  const toast = useToast();
  const [refresh, setRefresh] = useState(false);
  const currentuser = localStorage.getItem("currentuser");
  useEffect(() => {
    getUserByID(currentuser)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: "Wrong email or password.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }, [refresh]);

  //Handle Upload Images
  const handleUpload = async (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        if (reader.result) {
          const x = reader.result;
          changeProfileImg(currentuser, x).then((res) => {
            setRefresh(!refresh);
          });
        }
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <CommonPage />
      { user.avatar ? (
        <Box ml={{ base: 0, md: 60 }} mt={{ base: 10 }}>
          <Center mt={{ base: 0, md: 30 }}>
            <Box>
              <Box position="relative">
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={
                    user.avatar
                      ? user.avatar.url
                      : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  }
                  alt="UserName"
                />
                <Box
                  position="absolute"
                  top="40%"
                  right="-40%"
                  p={2}
                  borderRadius={"30%"}
                  cursor="pointer"
                >
                  <DrawerExample
                    refresh={refresh}
                    setRefresh={setRefresh}
                    user={user}
                  />
                </Box>
                <Box
                  position="absolute"
                  top="45%"
                  right="-30%"
                  p={2}
                  borderRadius={"30%"}
                  cursor="pointer"
                >
                  <label htmlFor="upload-photo" className="labelimg" ml="-20px">
                    <CameraAltSharp />
                  </label>
                  <Input
                    type="file"
                    onChange={handleUpload}
                    name="photo"
                    id="upload-photo"
                    accept="image/*"
                  />
                </Box>
              </Box>

              <Center
                fontWeight={"bold"}
              >{`${user.firstname} ${user.lastname}`}</Center>
              <Center fontWeight={"light"}>{`${user.email}`}</Center>
            </Box>
            <Box></Box>
          </Center>
          <Box ml={{ base: 0, md: 10 }} mt={{ base: 10, md: 20 }}>
            <UserProfileTabs user={user} refresh={refresh} setRefresh={setRefresh} />
          </Box>
          <SmallWithSocial />
        </Box>
      ) : (<LoadingPage/>)}
    </>
  );
};

export default Profile;
