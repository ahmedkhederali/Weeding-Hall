import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
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
  useToast,
} from "@chakra-ui/react";
import { PictureAsPdf } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import CommonPage from "./CommonPage";
const Money = () => {
  const [datas, setDatas] = useState([]);
  const token = localStorage.getItem("token");
  const [refresh, setRefresh] = useState(false);
  const toast = useToast();
  var [total_money, setTotalMoney] = useState("");
  useEffect(() => {
    const config = {
      headers: { BearerToken: token },
    };

    axios
      .get("http://localhost:5000/api/v1/book/allbook", config)
      .then(function (res) {
        setDatas(res.data.data);
        setTotalMoney(res.data.total_money_of_all_booking);
      });
  }, [token, refresh]);

  var props = {
    outputType: jsPDFInvoiceTemplate.Save,
    returnJsPDFDocObject: true,
    fileName: "Invoice 2021",
    orientationLandscape: false,
    compress: true,
    logo: {
      src: "http://localhost:3000/RIT.png",
      type: "PNG", //optional, when src= data:uri (nodejs case)
      width: 25.33, //aspect ratio = width/height
      height: 26.66,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    stamp: {
      inAllPages: true, //by default = false, just in the last page
      src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
      type: "JPG", //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    business: {
      name: "Weeding Hall",
      address: "Egypt,Menufia, sersEllyan",
      phone: "0101806153",
      email: "paradies@example.com",
      email_1: "paradies@example.al",
      website: "www.paradies.com",
    },

    invoice: {
      label: "Invoice #: ",
      num: 19,
     
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        {
          title: "#",
          style: {
            width: 10,
          },
        },
        {
          title: "FullName",
          style: {
            width: 20,
          },
        },
        {
          title: "National ID",
          style: {
            width: 30,
          },
        },
        {
          title: "Pay",
          style: {
            width: 15,
          },
        },
        {
          title: "Remain",
          style: {
            width: 20,
          },
        },
        {
          title: "phone",
          style: {
            width: 25,
          },
        },
        {
          title: "booked_Time_Slots",
          style: {
            width: 45,
          },
        },
        {
          title: "Total",
          style: {
            width: 20,
          },
        },
      ],
      table: Array.from(datas, (item, index) => [
        index + 1,
        `${item.first_name} ${item.second_name} ${item.last_name}`,
        `${item.national_ID}`,
        `${item.Pay_On_Book}`,
        `${item.remain_Amount}`,
        `${item.phone}`,
        `${item.booked_Time_Slots}`,
        `${parseInt(item.Pay_On_Book) + parseInt(item.remain_Amount)}`,
      ]),
      additionalRows: [
        {
          col1: "Total:",
          col2: `${total_money}`,
          col3: "EGY",
          style: {
            fontSize: 14, //optional, default 12
          },
        },
      ],
      // invDescLabel: "Invoice Note",
      //  invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
   
      },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };
  const handlePDF = () => {

    const pdfObject = jsPDFInvoiceTemplate(props);  
  };
  return (
   <>
    <CommonPage/>
    <div
      style={{
        marginTop: " 10px   ",
        marginLeft: "252px",
        padding: "10px",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2),border: 2px solid #eee",
      }}
    >
      <Flex>
        <Box p="1">
          <Text fontSize="30px" fontWeight={"bolder"} color="teal" mb={"10px"}>
            {" "}
            Table Of All Money{" "}
          </Text>{" "}
        </Box>
        <Spacer />
        <Box p="1">
          <Button
            onClick={handlePDF}
            leftIcon={<PictureAsPdf />}
            colorScheme="red"
            variant="solid"
          >
            PDF
          </Button>
        </Box>
      </Flex>

      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>All Money of Booking Hall</TableCaption>
          <Thead>
            <Tr>
              <Th>FullName</Th>
              <Th isNumeric>Pay On Book</Th>
              <Th isNumeric>Remain Money</Th>
            </Tr>
          </Thead>
          <Tbody>
            {datas &&
              datas.map((item, index) => {
                return (
                  <Tr key={item._id}>
                    <Td>{`${item.first_name} ${item.second_name} ${item.last_name}`}</Td>
                    <Td isNumeric>{item.Pay_On_Book}$</Td>
                    <Td isNumeric>{item.remain_Amount}$</Td>
                  </Tr>
                );
              })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Total Money</Th>
              <Th></Th>
              <Th isNumeric fontSize={"20px"}>
                {total_money} $
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
   </>
  );
};

export default Money;
