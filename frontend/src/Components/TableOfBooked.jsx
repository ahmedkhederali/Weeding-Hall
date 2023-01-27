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
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Delete, Edit } from "@mui/icons-material";
import React from "react";
import { deleteBook, updateBookStatusPayment } from "../services/BookService";
import EditBooked from "./EditBooked";
import moment from "moment";
import PaymentIcon from "@mui/icons-material/Payment";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FawryPay } from "./fawrypay-payments";
import { sha256, sha224 } from "js-sha256";
import PaypalCheckoutButton from "./PaypalCheckoutButton";
const TableOfBooked = ({ item, setRefresh, refresh }) => {
  // Variable to store total price in it
  var totalPriceForfwery=item.totalprice;
//variable to change status of payment
var payByPaymentGetway;

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
//----------------------------start Process Of Fawry-------------------

  function checkout() {
    const configuration = {
      locale: "en", //default en
      mode: "INSIDE_PAGE", //required, allowed values [POPUP, INSIDE_PAGE, SIDE_PAGE]
    };
    FawryPay.checkout(buildChargeRequest(), configuration);
  }
  function buildChargeRequest() {
    let merchantRefNum = Math.floor(Math.random() * 100000000 + 1);
    var chargeRequest = {
      merchantCode: "+/IAAY2notjPdMFuJarK/Q==",
      merchantRefNum: merchantRefNum,
      customerMobile: "01095959595",
      customerEmail: "a@example.com",
      customerProfileId: "123",
      customerName: "",
      chargeItems: [
        {
          itemId: "6b5f",
          description: "Product 2",
          price: totalPriceForfwery,
          quantity: 1,
        }
      ],
      returnUrl: "http://localhost:3000/bookpage",
      authCaptureModePayment: false,
      secKey: "4ccd3501-fce3-4ac2-a04c-0457e9b4629e",
    };

    chargeRequest.signature = signRequest(chargeRequest);
    return chargeRequest;
  }
  function signRequest(chargeRequest) {
    var signString =
      chargeRequest["merchantCode"] + chargeRequest.merchantRefNum;
    signString +=
      chargeRequest.customerProfileId != null
        ? chargeRequest.customerProfileId
        : "";
    signString +=
      chargeRequest.returnUrl != null ? chargeRequest.returnUrl : "";
    var items = chargeRequest.chargeItems.sort(function (x, y) {
      let a = x.itemId.toUpperCase(),
        b = y.itemId.toUpperCase();
      return a == b ? 0 : a > b ? 1 : -1;
    });

    items.forEach((item) => {
      signString +=
        item.itemId + "" + item.quantity + "" + item.price.toFixed(2);
    });
    signString += chargeRequest.secKey;

    return sha256(signString);
  }

  //----------------------------End Process Of Fawry-------------------


  const DeleteBook = (id) => {
    deleteBook(id)
      .then((res) => {
        toast({
          title: "Booked Delted.",
          description: "You have successfully Delete Book.",
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
  const editBook = (id) => {
    onOpen(true);
  };
  
  
const tranSucess=async(paidFor)=>{
if(paidFor)
 {
  updateBookStatusPayment(item._id,payByPaymentGetway=true).then((res)=>{
    toast({
      title: "Success Process.",
      description: "Payment success and order updated....",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setRefresh(!refresh)
  }).catch((err)=>{
    toast({
      title: "Faild Process.",
      description: "Payment Faild....",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  })
 }
  
  

}
  return (
    <>
      <Tr>
        <Td>{`${item.firstname} ${item.lastname}`}</Td>
        <Td>{`${item.hallName}`}</Td>
        <Td>{moment(item.date).format("DD MMMM YYYY")}</Td>
        <Td>{`${item.hallLocation}`}</Td>
        <Td>{`${item.payByPaymentGetway}`}</Td>
      
        <Td>
          <Edit
            style={{ cursor: "pointer" }}
            onClick={() => editBook(item._id)}
          />
          <span style={{ margin: "9px" }}></span>
          <Delete
            style={{ cursor: "pointer" }}
            onClick={() => DeleteBook(item._id)}
          />
          <span style={{ margin: "9px" }}></span>
          {!item.payByPaymentGetway && (
            <Menu>
              <MenuButton>
                <PaymentIcon />
              </MenuButton>
              <MenuList>
                
                  <MenuItem minH="48px">
                  
                    <PaypalCheckoutButton total={totalPriceForfwery} tranSucess={tranSucess}/>
                  </MenuItem>
             
               
                  <MenuItem minH="48px"  onClick={checkout}>
                    <Image
                      boxSize="2rem"
                      borderRadius="full"
                      src="data:image/jpeg;base64,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"
                      alt="Fluffybuns the destroyer"
                      mr="12px"
                    />
                    <span>Fawry</span>
                  </MenuItem>
            
              </MenuList>
            </Menu>
          )}
        </Td>
      </Tr>
      <EditBooked isOpen={isOpen} onClose={onClose} item={item} setRefresh={setRefresh} refresh={refresh} />
    </>
  );
};

export default TableOfBooked;
