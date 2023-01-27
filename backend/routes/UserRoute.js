const express = require('express');
const router = express.Router();
const auth=require("../middleware/auth");
const authAdmin=require("../middleware/authAdmin");
const { login,register,forgetPassword,resetPassword,addFavorite,deleteFavorite,
    GetAllUsers,ChangePassword,deleteUser,getUserById,updateUser,updateUserProfileImg} = require('../controllers/userController');
    router.route('/:id/favorite/:favorite').post(auth,addFavorite);
router.route('/login').post(login);
router.route('/register').post(register);
router.route('/').get(auth,GetAllUsers);
router.route('/:id').get(auth,getUserById).delete(auth,deleteUser).put(auth,updateUser).patch(auth,updateUserProfileImg);
router.route('/forget').post(forgetPassword);
router.route('/reset/:token').put(resetPassword)
router.route('/changepassword/:id').patch(auth,ChangePassword);
router.route('/:id/favorite/:favorite').delete(auth,deleteFavorite);

module.exports = router;