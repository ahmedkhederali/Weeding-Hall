const express = require('express');
const router = express.Router();
const auth=require("../middleware/auth");
const authAdmin=require("../middleware/authAdmin");
const {CreateHall,deleteHall,
    addedLike,deleteLike,GetAllHall,updateHall,exploreHall,
    getHallById,trendHall,updateHallRate,getAllTypeHall,
    getAllGovernorateHall,getAllRportPerHall} = require('../controllers/HallControl');

router.route('/').get(auth,GetAllHall);
router.route('/trend').get(auth,trendHall);
router.route('/explore').get(auth,exploreHall);


router.route('/hall').post(auth,authAdmin,CreateHall);
router.route('/hall/:id').patch(auth,authAdmin,deleteHall).put(auth,authAdmin,updateHall).get(auth,getHallById)
router.route('/hallrateupdate/:id').patch(auth,updateHallRate)
router.route('/likes/:id').patch(auth,addedLike).delete(auth,deleteLike)


//Admins Functions
router.route('/admin').get(auth,authAdmin ,getAllTypeHall);
router.route('/admin/gover').get(auth,authAdmin ,getAllGovernorateHall);
router.route('/admin/report').get(auth,authAdmin ,getAllRportPerHall);


module.exports = router;