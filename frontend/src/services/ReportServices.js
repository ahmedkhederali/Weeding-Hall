import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { BearerToken: token } }; 

export const addReport = async (name,phone,content,userId,hallId) => {
  return await axios.post(`http://localhost:5000/api/v1/report/`, {
    name,
    phone,
    content,
    userId,
    hallId
  },config);
};
export const getReportByUserID = async (userId) => {
    return await axios.get(`http://localhost:5000/api/v1/report/user/${userId}`,config);
  };
  export const getReportByID = async (id) => {
    return await axios.get(`http://localhost:5000/api/v1/report/${id}`,config);
  };
  export const updateReportByID = async (id,content) => {
    return await axios.put(`http://localhost:5000/api/v1/report/${id}`,{content},config);
  };
  export const DeleteReportByID = async (id) => {
    return await axios.delete(`http://localhost:5000/api/v1/report/${id}`,config);
  };
  
  export const getAllReport = async (id) => {
    return await axios.get(`http://localhost:5000/api/v1/report/`,config);
  };