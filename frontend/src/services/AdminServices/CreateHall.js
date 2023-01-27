import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { BearerToken: token } };
console.log(config)
export const CreateAdminHall = async (data) =>{
  console.log(data)
    return await axios.post(`http://localhost:5000/api/v1/hall/hall`,data,config);
  }; 