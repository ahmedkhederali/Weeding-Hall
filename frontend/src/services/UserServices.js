import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { BearerToken: token } }; 

export const ForgetPassword = async (email) => {
  return await axios.post(`http://localhost:5000/api/v1/user/forget`, {
    email,
  });
};
export const ResetPassword = async (password,confirmpassword,token) => {
  return await axios.put(`http://localhost:5000/api/v1/user/reset/${token}`, {
  password,
  confirmpassword
  });
};
export const changePassword = async (password,confirmpassword,id) => {
  return await axios.patch(`http://localhost:5000/api/v1/user/changepassword/${id}`, {
  password,
  confirmpassword
  },config);
};
export const deleteFavorite = async (id, hallID) => {
  const  data  = await axios.delete(`http://localhost:5000/api/v1/user/${id}/favorite/${hallID}` , config);
  return data;
};
export const addFavorite = async (id, hallID) => {
  console.log(id,hallID,config)
  const { data } = await axios.post(`http://localhost:5000/api/v1/user/${id}/favorite/${hallID}` ,{}, config);
  return data;
};

export const deleteLike = async (id) => {
  const  data  = await axios.delete(`http://localhost:5000/api/v1/hall/likes/${id}` , config);
  return data;
};
export const addLike = async (id) => {
  const { data } = await axios.patch(`http://localhost:5000/api/v1/hall/likes/${id}` ,{}, config);
  return data;
};


export const deleteUser = async (id) => {
  const { data } = await axios.delete(`http://localhost:5000/api/v1/user/${id}`,config);
  return data;
};
export const editUserFun = async (id,firstname,lastname,email,phone) => {
  const { data } = await axios.put(`http://localhost:5000/api/v1/user/${id}`,{firstname,lastname,email,phone},config);
  return data;
};
export const changeProfileImg = async (id, avatar) => {
  const { data } = await axios.patch(`http://localhost:5000/api/v1/user/${id}` ,{avatar}, config);
  return data;
};