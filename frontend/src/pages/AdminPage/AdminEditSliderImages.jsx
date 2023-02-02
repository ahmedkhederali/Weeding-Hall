import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHallById } from "../../services/HallServices";
import LoadingPage from "../Loading/LoadingPage";
import CommonPage from "../CommonPage";
import {
  Box,
  Button,
  Divider,
  Heading,
  Icon,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AddImageModal from "../../Components/AddImageModal";
import { Favorite } from "@mui/icons-material";
import HideImageIcon from "@mui/icons-material/HideImage";
import { DeleteImageInCloundayAndUpdateSlider } from "../../services/AdminServices/UploadImageInSlider";
const AdminEditSliderImages = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hall, setHall] = useState({});
  const [refresh,setRefresh]=useState(false)
  const { id } = useParams();
  const nagivate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getHallById(id)
      .then((res) => {
        setHall(res.data.hall);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [refresh]);

  //delete image
  const deleteImage=(e,index)=>{
    DeleteImageInCloundayAndUpdateSlider(e,id,index).then((res)=>{
        toast({
            title: "image Deleted",
            description: `${res.data.msg}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setRefresh(!refresh)
    }).catch((err)=>{
        toast({
            title: "Error!",
            description: `${err.response.data.msg}`,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
    })
  }
  return (
    <>
      <CommonPage />
      <Box
      display="flex"  flexDirection={{ base: "column", sm: "row" }}
        mt={{ base: 5 }}
        ml={{ base: 0, md: 60 }}
        justifyContent={{base:"flex-start",sm:"space-between",md:"space-between" ,xl:"space-between"}}
        my={5}
        px={6}
      >
        <Text fontSize={{ base: 20, md: 30 }} fontWeight={500}>
          Admin Image Panel
        </Text>
        <Button onClick={onOpen}>Add Image</Button>
      </Box>
      {hall && hall.imgs && hall.imgs.length === 0 ? (
        <Box mt={{ base: 5 }} ml={{ base: 0, md: 60 }} textAlign={"center"}>
          <Divider></Divider>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mt={2}
            p={3}
          >
            <Icon color="#314E89" fontSize={50} as={HideImageIcon} />
            <Heading textAlign="center" fontSize={22} mt={8}>
              You don't have any Image For Hall
            </Heading>
            <Button
              variant="solid"
              fontSize={18}
              px={8}
              mt={8}
              colorScheme="facebook"
              onClick={() => nagivate("/")}
            >
              Go To All Halls
            </Button>
          </Box>
        </Box>
      ) : hall && hall.imgs && hall.imgs.length > 0 ? (
        <Box display="flex" flexDirection={{ base: "column", sm: "row" }} flexWrap='wrap'
          mt={{ base: 5 }} ml={{ base: "auto", md: 60 }}
        >
          {hall.imgs.map((item, index) => (
            <Box
              key={item._id}
              minWidth={{base:100 ,md:260}}
              maxWidth={{base:200 , md:400}}
              my={8}
             mx={{base:"auto",sm:2,md:3}}
            >
              <Image src={item.url} width="100%" height="100%" />
              <Button width="100%" onClick={()=>{deleteImage(item.public_id,index)}}>Delete</Button>
            </Box>
          ))}
        </Box>
      ) : (
        <LoadingPage />
      )}

      {hall && hall._id && (
        <AddImageModal hallId={hall._id} isOpen={isOpen} onClose={onClose} refresh={refresh} setRefresh={setRefresh} />
      )}
    </>
  );
};

export default AdminEditSliderImages;
