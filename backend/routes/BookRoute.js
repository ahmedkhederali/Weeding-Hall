const express = require('express');
const router = express.Router();
const { getAllBook,createBook,updateBook ,deletebook,getBookById,findWeedingWithSamedateBook,getAllBokFilterByDate} = require('../controllers/BookController');
const auth=require("../middleware/auth");
const authAdmin=require("../middleware/authAdmin");
router.route('/').get(auth,getAllBook).post(auth,createBook);
router.route('/:id').put(auth,updateBook).delete(auth,deletebook).get(auth,getBookById)
router.route('/samebook/:id').post(auth,findWeedingWithSamedateBook)
router.route('/samebook/book').post(auth,findWeedingWithSamedateBook)

//Admins Routes
router.route('/admin/filterDating').get(auth,authAdmin,getAllBokFilterByDate)
module.exports = router;