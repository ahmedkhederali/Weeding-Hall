import React, { useEffect, useState } from "react";
import { Box, Button, Center, Heading, Icon, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import CommonPage from "./CommonPage";
import { getAllBooks } from "../services/BookService";
import { SearchOff } from "@mui/icons-material";
import TableOfBooked from "../Components/TableOfBooked";

const BookedPage = () => {
  const [books, setBooks] = useState([]);
  const [refresh,setRefresh]=useState(false)
  useEffect(() => {
    getAllBooks().then((res) => {
      setBooks(res.allBook);
    });
  }, [refresh]);
  console.log(books)
  return (
    <>
      <CommonPage />
      <Box ml={{ base: 0, md: 60 }}>
        <Center>
          <Heading mb={4} mt={2} size="lg">
            Booked{" "}
          </Heading>
        </Center>
        {books && books.length>0 ? (
          <>
          <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Full Name</Th>
              <Th>Hall Name</Th>
              <Th>Date Of Weeding</Th>
              <Th>Hall Location</Th>
              <Th>payment status</Th>
            </Tr>
          </Thead>
          <Tbody>
          
            {
              books ?.map((item,index)=>(
                <TableOfBooked key={item._id} item={item} refresh={refresh} setRefresh={setRefresh}/>
              ))
            }
            </Tbody>
        </Table>
      
      </TableContainer>
          </>
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
                Sorry, we couldn't find what you are looking for.
              </Heading>
              <Text textAlign="center" fontSize={24} mt={2} fontWeight={300}>
                But don't give up! Check out our Halls and find anyone for you
                wedding!
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default BookedPage;
