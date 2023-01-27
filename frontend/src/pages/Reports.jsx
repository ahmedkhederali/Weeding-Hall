import {
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Spacer,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatars from "../Components/Avatar";
import ReportTableHall from "../Components/ReportTableHall";
import { getUserByID } from "../services/AuthServices";
import {
  DeleteReportByID,
  getReportByID,
  getReportByUserID,
  updateReportByID,
} from "../services/ReportServices";
import CommonPage from "./CommonPage";
import { SearchOff } from "@mui/icons-material";
import  moment  from 'moment';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [des, setDes] = useState("");
  const toast = useToast();
  const [refresh, setRefresh] = useState(false);
  // id of each report open
  const [reportId, setReportId] = useState("");
  const userId = localStorage.getItem("currentuser");
  useEffect(() => {
    // toast({
    //   title: "Report Page .",
    //   description: "You can't Delete Report Before Open It.",
    //   status: "warning",
    //   position: 'top-center',
    //   duration: 3000,
    //   isClosable: true,
    // });
    getUserByID(userId)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
    getReportByUserID(userId)
      .then((res) => {
        setReports(res.data.reports);
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: "SomeThing Went Wrong Try again",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }, [refresh]);
  const editReport = async (id) => {
    const x = await getReportByID(id);
    setDes(x.data.report.content);
    setReportId(x.data.report._id);
    onOpen();
  };

  const saveChanges = () => {
    updateReportByID(reportId, des)
      .then((res) => {
        toast({
          title: "Report Edit.",
          description: "You have successfully Updated Report.",
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
          description: "SomeThing Went Wrong Try again",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  const deleteReport=()=>{
    DeleteReportByID(reportId)
    .then((res) => {
      toast({
        title: "Report Delete.",
        description: "You have successfully Delete Report.",
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
        description: "You Must Open Report and Read It Then Delete It,SomeThing Went Wrong Try again",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    });
  }
  return (
    <>
      <CommonPage />
      <Box ml={{ base: 0, md: 60 }}>
     
        <Center mt={{ base: 5 }} mb={{ base: 5 }}>
          <Heading mb={4} size="lg">
            Reports
          </Heading>
        </Center>
        {reports.length !== 0 ? (
          reports?.map((item, index) => (
            <Flex ml={2} key={item._id}>
           
              <Box boxSize="sm" flex={1} ml={1} p={{ base: "0px", md: "2" }}>
             <Flex>
              <Box></Box>
              <Spacer/>
              <Box
              backgroundColor={"red.700"} 
              lineHeight={"15px"} textAlign="center"
              cursor="pointer" padding="3px"
              m={1} width={"20px"} height={"20px"}
              borderRadius="2px" fontWeight={"bold"} 
              onClick={deleteReport}
              >X</Box>
             </Flex>
                <Avatars user={user} index={index} />
                <Box>
                  <Text mt={2} mb={2} onClick={() => editReport(item._id)}>
                    {item.content}
                  </Text>
            
                    <hr />
                

                  <Box mt={2}>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Create By</span> :{" "}
                      {item.name}
                    </Text>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Create At</span> :{" "}
                      {moment(item.createdAt).format("DD MMMM YYYY")}
                    </Text>
                    <Text> 
                      <span style={{ fontWeight: "bold" }}>Phone</span> :{" "}
                      {item.phone}
                    </Text>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Report Status</span>{" "}
                      : {item.status}
                    </Text>
                  </Box>
                </Box>
                <ReportTableHall hallId={item.hallId} />
              </Box>
            </Flex>
          ))
        ) : (
          <Box display="flex" justifyContent="center" minH={{ base: "60vh" }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              mt={10}
              p={3}
            >
              <Icon color="#314E89" fontSize={100} as={SearchOff} />
              <Heading textAlign="center" fontSize={30} mt={8}>
                Sorry, we couldn't find any Report.
              </Heading>
              <Text textAlign="center" fontSize={24} mt={2} fontWeight={300}>
                But If You have any problem please Tell US
              </Text>
            </Box>
          </Box>
        )}
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Edit Content Of Report
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea
                  id="desc"
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
                  minH="400px"
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={saveChanges}>
              Save Changes
            </Button>
         
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Reports;
