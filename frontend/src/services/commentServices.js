import axios from 'axios';

const token = localStorage.getItem("token");
const config = { headers: { BearerToken: token } };

export const getAllComments = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/v1/comments`,config);
    return data;
};

export const getCommentById = async (id) => {
    const { data } = await axios.get(`http://localhost:5000/api/v1/comments/${id}`,config);
    return data;
};

export const getCommentByAuthorId = async (id) => {
    const { data } = await axios.get(`http://localhost:5000/api/v1/comments/author/${id}`,config);
    return data;
};

export const getCommentByHallId = async (id) => {
    const { data } = await axios.get(`http://localhost:5000/api/v1/comments/hall/${id}`,config);
    return data;
};

export const addComment = async (productId, comment, author) => {
    const { data } = await axios.post(`http://localhost:5000/api/v1/comments`, {
        for: productId,
        comment,
        author
    },config);
    return data;
};

export const updateComment = async (id, productId, comment, author) => {
    const { data } = await axios.put(`http://localhost:5000/api/v1/comments/${id}`, {
        for: productId,
        comment,
        author
    },config);
    return data;
};

export const deleteComment = async (id) => {
    const { data } = await axios.delete(`http://localhost:5000/api/v1/comments/${id}`,config);
    return data;
};