import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { BearerToken: token } };
console.log(config)
export const DeleteAdminHallByID = async (id,public_id) =>{
  
    return await axios.patch(`http://localhost:5000/api/v1/hall/hall/${id}`,{public_id},config);
  }; 