import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { getHallById } from "../services/HallServices";
import LoadingPage from './../pages/Loading/LoadingPage';
const ReportTableHall = ({ hallId }) => {
  console.log(hallId)
  const [hall, setHall] = useState();
  useEffect(() => {
    getHallById(hallId).then((res) => {
      console.log((res.data.hall))
      setHall(res.data.hall);
    });
  }, []);

  return (
    <>
      {hall ? (
        <>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Hall Img</Th>
                  <Th>Hall Name</Th>
                  
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Image
                      boxSize="100px"
                      objectFit="cover"
                      src={hall.hallimgposter.url}
                      alt={hall.name}
                    />
                  </Td>
                  <Td>{hall.name}</Td>
                 
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <LoadingPage/>
      )}
    </>
  );
};

export default ReportTableHall;
