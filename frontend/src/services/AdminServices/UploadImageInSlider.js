import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { BearerToken: token } };

export const UploadImageInCloundayAndUpdateSlider = async (id,imgs) => {
  return await axios.patch(`http://localhost:5000/api/v1/hall/admin/images/${id}`,{imgs} ,config);
};


export const DeleteImageInCloundayAndUpdateSlider = async (public_id,id,index) => {
    return await axios.patch(`http://localhost:5000/api/v1/hall/admin/imagesdeleted`,{public_id,id,index} ,config);
  };
  