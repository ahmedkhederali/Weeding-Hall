const express = require('express');
const router = express.Router();
const auth=require("../middleware/auth");
const authAdmin=require("../middleware/authAdmin");
const {CreateHall,deleteHall,
    addedLike,deleteLike,GetAllHall,updateHall2,exploreHall,
    getHallById,trendHall,updateHallRate,getAllTypeHall,
    getAllGovernorateHall,getAllRportPerHall,updateHallImages,deleteImageFromSlider} = require('../controllers/HallControl');

router.route('/').get(auth,GetAllHall);
router.route('/trend').get(auth,trendHall);
router.route('/explore').get(auth,exploreHall);


router.route('/hall').post(auth,authAdmin,CreateHall);
router.route('/hall/:id').patch(auth,authAdmin,deleteHall).put(auth,authAdmin,updateHall2).get(auth,getHallById)
router.route('/hallrateupdate/:id').patch(auth,updateHallRate)
router.route('/likes/:id').patch(auth,addedLike).delete(auth,deleteLike)


//Admins Functions
router.route('/admin').get(auth,authAdmin ,getAllTypeHall);
router.route('/admin/gover').get(auth,authAdmin ,getAllGovernorateHall);
router.route('/admin/report').get(auth,authAdmin ,getAllRportPerHall);
router.route('/admin/images/:id').patch(auth,authAdmin ,updateHallImages);
router.route('/admin/imagesdeleted/').patch(auth,authAdmin ,deleteImageFromSlider);




module.exports = router;