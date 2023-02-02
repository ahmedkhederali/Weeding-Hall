import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { BearerToken: token } };

export const getAllBooks = async () => {
  const { data } = await axios.get(`http://localhost:5000/api/v1/book`, config);
  return data;
};

export const getBookById = async (id) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/v1/book/${id}`,
    config
  );
  return data;
};

export const updateBook = async (
  id,
  hallRef,
  firstname,
  lastname,
  firstnamear,
  lastnamear,
  religion,
  email,
  religionar,
  address,
  addressar,
  nationalid,
  phone,
  hallName,
  hallPrice,
  hallPhone,
  hallLocation,
  date,
  cake,
  priceOfOneCake,
  cans,
  pricOneCans,
  totalPrice
) => {
  const { data } = await axios.put(
    `http://localhost:5000/api/v1/book/${id}`,
    {
      hallRef,
      firstname,
      lastname,
      firstnamear,
      lastnamear,
      religion,
      email,
      religionar,
      address,
      addressar,
      nationalid,
      phone,
      hallName,
      hallPrice,
      hallPhone,
      hallLocation,
      date,
      cake,
      priceOfOneCake,
      cans,
      pricOneCans,
      price: totalPrice,
    },
    config
  );
  return data;
};

export const deleteBook = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:5000/api/v1/book/${id}`,
    config
  );
  return data;
};

export const checkifThieranthorBookIntheSameDay = async (id, date,hallRef) => {
  const { data } = await axios.post(
    `http://localhost:5000/api/v1/book/samebook/${id}`,
    { date,hallRef },
    config
  );
  return data;
};


export const checkifThieranthorBookIntheSameDayDuringBook = async ( date,hallRef) => {
  const { data } = await axios.post(
    `http://localhost:5000/api/v1/book/samebook/book`,
    { date,hallRef },
    config
  );
  return data;
};
export const addedNewBook = async (
  hallRef,
  firstname,
  lastname,
  firstnamear,
  lastnamear,
  religion,
  email,
  religionar,
  address,
  addressar,
  nationalid,
  phone,
  hallName,
  hallPrice,
  hallPhone,
  hallLocation,
  date,
  cake,
  priceOfOneCake,
  cans,
  pricOneCans,
  totalprice,
  payByPaymentGetway
) => {
  const { data } = await axios.post(
    `http://localhost:5000/api/v1/book`,
    {
      hallRef,
      firstname,
      lastname,
      firstnamear,
      lastnamear,
      religion,
      email,
      religionar,
      address,
      addressar,
      nationalid,
      phone,
      hallName,
      hallPrice,
      hallPhone,
      hallLocation,
      date,
      cake,
      priceOfOneCake,
      cans,
      pricOneCans,
      totalprice,
      payByPaymentGetway,
    },
    config
  );
  return data;
};


export const updateBookStatusPayment = async (
  id,
  payByPaymentGetway
) => {
  const { data } = await axios.put(
    `http://localhost:5000/api/v1/book/${id}`,
    {
     payByPaymentGetway
    },
    config
  );
  return data;
};