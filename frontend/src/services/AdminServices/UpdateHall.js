import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { BearerToken: token } };

export const updateHallByIDS = async (id,
  name,namear, mohafza,capacity,price,
  mohafzaar,location,locationar, phone,chairs,tables,
  halltype,floor,facebook, instagram, messanger, whatsup, videoUrl,
) => {
  return await axios.put(`http://localhost:5000/api/v1/hall/hall/${id}`, { 
    name, namear,mohafza, capacity,price, mohafzaar, location,locationar,phone,chairs,tables, halltype,floor,facebook,instagram, messanger, whatsup,videoUrl,
  }, config);
};