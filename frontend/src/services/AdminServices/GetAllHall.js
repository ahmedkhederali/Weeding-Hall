import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { BearerToken: token } };

export const getAdminAllHall = async () =>{
    return await axios.get(`http://localhost:5000/api/v1/hall/`,config);
  };