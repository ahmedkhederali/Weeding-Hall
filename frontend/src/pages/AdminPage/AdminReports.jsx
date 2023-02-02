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

import Avatars from "../../Components/Avatar";
import ReportTableHall from "../../Components/ReportTableHall";
import { SearchOff } from "@mui/icons-material";
import  moment  from 'moment';
import CommonPage from "../CommonPage";
import { getAllReport } from "../../services/ReportServices";
import { getUserByID } from "../../services/AuthServices";


const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState({});
  const toast = useToast();
  const [refresh, setRefresh] = useState(false);
  const userId = localStorage.getItem("currentuser");

  useEffect(() => {

 

    getAllReport()
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
          //  onClick={deleteReport}
           >X</Box>
          </Flex>
             <Avatars user={reports[index].userId} index={index} />
             <Box>
               <Text mt={2} mb={2} >
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
       
      
      </>
    )
   
  
};




export default AdminReports;
