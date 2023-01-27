import axios from 'axios';

const token = localStorage.getItem("token");
const config = { headers: { BearerToken: token } };
export const getAllRatings = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/v1/ratings`,config);
    return data
};
export const getRatingById = async (id) => {
    const { data } = await axios.get(`http://localhost:5000/api/v1/ratings/${id}`,config);
    return data;
};
export const getRatingByOwnerId = async (ownerId) => {
    const { data } = await axios.get(`http://localhost:5000/api/v1/ratings/owner/${ownerId}`,config);
    return data;
};
export const getRatingByHallId = async (productId) => {
    const { data } = await axios.get(`http://localhost:5000/api/v1/ratings/hall/${productId}`,config);
    return data;
}
export const addRating = async (product, rating, owner) => {
    const { data } = await axios.post(`http://localhost:5000/api/v1/ratings`, {
        for: product,
        rating,
        owner
    },config);
    return data;
};
export const updateRating = async (id, product, rating, owner) => {
    const { data } = await axios.put(`http://localhost:5000/api/v1/ratings/${id}`, {
        for: product,
        rating,
        owner
    },config);
    return data;
};
export const deleteRating = async (id) => {
    const { data } = await axios.delete(`http://localhost:5000/api/v1/ratings/${id}`,config);
    return data;
};