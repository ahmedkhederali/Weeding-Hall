import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { BearerToken: token } };

export const Login = async (email, password) => {
  return await axios.post(`http://localhost:5000/api/v1/user/login`, {
    email,
    password,
  });
};
export const Register = async (firstname, lastname,firstnamear, lastnamear, email, password, phone) =>{
  return await axios.post(`http://localhost:5000/api/v1/user/register`,{
      firstname,
      lastname,
      email,
      password,
      phone,
      firstnamear, 
      lastnamear
  });
};

export const getUserByID = async (id) => {
  return await axios.get(`http://localhost:5000/api/v1/user/${id}`,config);
};
















export const BookFun = async (
  first_name,
  second_name,
  last_name,
  national_ID,
  booked_Time_Slots,
  Pay_On_Book,
  phone,
  gato=0,
  cans=0,
  groom,
  bride,
  zafa,
  Price_gato=0,
  Price_cans=0
) => {
  return await axios.post(
    `http://localhost:5000/api/v1/book/book`,
    {
      first_name,
      second_name,
      last_name,
      national_ID,
      booked_Time_Slots,
      Pay_On_Book,
      phone,
      gato,
      cans,
      groom,
      bride,
      zafa,
      Price_gato,
      Price_cans
    },
    config
  );
};
export const getBookById=async(id)=>{
   const data=await axios.get(`http://localhost:5000/api/v1/book/getbook/${id}`,config)
   return data;
  }
export const BookUpdate = async (
  id,
  first_name,
  second_name,
  last_name,
  national_ID,
  booked_Time_Slots,
  Pay_On_Book,
  phone,
  gato,
  cans,
  groom,
  bride,
  zafa,
  Price_gato,
  Price_cans
) => {
  return await axios.put(
    `http://localhost:5000/api/v1/book/book/${id}`,
    {
      first_name,
      second_name,
      last_name,
      national_ID,
      booked_Time_Slots,
      Pay_On_Book,
      phone,
      gato,
      cans,
      groom,
      bride,
      zafa,
      Price_gato,
      Price_cans
    },
    config
  );
};
export const getAllMony = async (email, password) => {
  return await axios.get(`http://localhost:5000/api/v1/book/allmonybook`,config);
};
export const getWeedingPerMonth = async () => {
  return await axios.get(`http://localhost:5000/api/v1/book/getbookpermonth`,config);
};

