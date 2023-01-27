import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { BearerToken: token } };

export const getTypeHallNum = async () => {
  return await axios.get(`http://localhost:5000/api/v1/hall/admin/`, config);
};

export const getGoverHallNum = async () => {
    return await axios.get(`http://localhost:5000/api/v1/hall/admin/gover`, config);
  };

export const getDatingHallNum = async () => {
return await axios.get(`http://localhost:5000/api/v1/book/admin/filterDating`, config);
};
export const getReportPerHall = async () => {
  return await axios.get(`http://localhost:5000/api/v1/hall/admin/report`, config);
  };