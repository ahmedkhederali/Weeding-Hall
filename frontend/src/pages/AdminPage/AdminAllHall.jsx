import { DeleteIcon, EditIcon, Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdSearchOff } from "react-icons/md";
import { DeleteAdminHallByID } from "../../services/AdminServices/DeleteHall";
import { getAdminAllHall } from "../../services/AdminServices/GetAllHall";
import CommonPage from "../CommonPage";
import AdminEditHall from "./AdminEditHall";
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { useNavigate } from "react-router-dom";
const AdminAllHall = () => {
  const [halls, setHall] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [hallID, setHallID] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nagivate=useNavigate()
  const toast = useToast();
  useEffect(() => {
    getAdminAllHall()
      .then((res) => {
        setHall(res.data.halls);
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: `${err.message}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }, [refresh]);

  //Delete Hall
  const onClickDelete = (id, public_id) => {
    DeleteAdminHallByID(id, public_id)
      .then((res) => {
        toast({
          title: "Delete Hall.",
          description: "You have Deleted Hall",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setRefresh(!refresh);
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: `${err.message}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  const onClickEdit = (id) => {
    setHallID(id);
    onOpen(true);
  };
  return (
    <>
      <CommonPage />
      <Box ml={{ base: 0, md: 60 }}>
        <Center>
          <Heading>All Hall</Heading>
        </Center>
        <Box>
          {halls.length > 0 ? (
            <Box>
              <TableContainer p={3}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Image</Th>

                      <Th>Name</Th>
                      <Th>Location</Th>
                      <Th>Goverment</Th>
                      <Th>Phone</Th>
                      <Th>Price</Th>
                      <Th>Hall Type</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {halls.map((hall) => {
                      return (
                        <Tr key={hall._id}>
                          <Td>
                            <Image
                              width={70}
                              height={70}
                              src={hall.hallimgposter.url}
                            />
                          </Td>

                          <Td>{hall.name}</Td>
                          <Td>{hall.location}</Td>
                          <Td>{hall.mohafza}</Td>
                          <Td>{hall.phone}</Td>
                          <Td>{hall.price} $</Td>
                          <Td>{hall.halltype}</Td>
                          <Td>
                            <Button
                              onClick={() => onClickEdit(hall._id)}
                              mr={2}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                            mr={2}
                              onClick={() =>
                                onClickDelete(
                                  hall._id,
                                  hall.hallimgposter.public_id
                                )
                              }
                            >
                              <DeleteIcon />
                            </Button>
                            <Button
                              onClick={() =>
                                nagivate(`/admin/images/${hall._id}`)
                              }
                            >
                              <LinearScaleIcon />
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
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
                <Icon color="#314E89" fontSize={100} as={MdSearchOff} />
                <Heading textAlign="center" fontSize={30} mt={8}>
                  Sorry, we couldn't find Any Hall.
                </Heading>
                <Text textAlign="center" fontSize={24} mt={2} fontWeight={300}>
                  But don't give up! We Will added Alot Of Hall Near
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {hallID && <AdminEditHall isOpen={isOpen} onClose={onClose} hallId={hallID} refresh={refresh} setRefresh={setRefresh}/>}
    </>
  );
};

export default AdminAllHall;
