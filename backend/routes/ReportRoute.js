
const express = require('express');
const router = express.Router();
const { getAllReports, getReportById, getReportByUserId,
     addReport,updateReport,getReportByHallId, deleteReport } = require('../controllers/reportController');
const auth=require("../middleware/auth");
const authAdmin=require("../middleware/authAdmin");

router.route('/').get(auth,authAdmin,getAllReports);
router.route('/:id').get(auth,getReportById);
router.route('/user/:id').get(auth,getReportByUserId);
router.route('/hall/:id').get(auth,getReportByHallId);
router.route('/').post(auth,addReport);
router.route('/:id').put(auth,updateReport);
router.route('/:id').delete(auth,deleteReport);

module.exports = router;