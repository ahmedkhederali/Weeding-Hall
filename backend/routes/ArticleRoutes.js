
const express = require('express');
const router = express.Router();
const { addArticle,updateArticle,deleteArticle,getAllArticle,getArticleById } = require('../controllers/ArticleController');
const auth=require("../middleware/auth");
const authAdmin=require("../middleware/authAdmin");

router.route('/').get(auth,getAllArticle);
router.route('/:id').get(auth,getArticleById);
router.route('/').post(auth,authAdmin,addArticle);
router.route('/:id').put(auth,authAdmin,updateArticle);
router.route('/:id').delete(auth,authAdmin,deleteArticle);

module.exports = router;