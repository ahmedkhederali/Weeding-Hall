const express = require('express');
const router = express.Router();
const { getAllComments, getCommentById, getCommentByAuthorId, 
    getCommentByHallId, addComment, updateComment, deleteComment } = require('../controllers/commentController');
const auth=require("../middleware/auth");
const authAdmin=require("../middleware/authAdmin");
router.route('/').get(auth,getAllComments);
router.route('/author/:id').get(auth,getCommentByAuthorId);
router.route('/hall/:id').get(auth,getCommentByHallId);
router.route('/:id').get(auth,getCommentById);
router.route('/').post(auth,addComment);
router.route('/:id').put(auth,updateComment);
router.route('/:id').delete(auth,deleteComment);

module.exports = router;