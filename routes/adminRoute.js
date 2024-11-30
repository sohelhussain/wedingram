const express = require("express");
const router = express.Router();
const { adminPageController } = require("../controllers/creatingAdmin");
// const {adminAuthDash} = require("../middlewares/admin-middleware");
const {cyberToggleActivity, cyberDelete, adminDashboard, adminLogin, adminloginpage} = require('../controllers/adminController');

// cyberAuthPage(["cyber"]),

router.get("/", adminPageController);
router.get('/loginPage', adminloginpage)
router.post('/login', adminLogin)

router.get("/cyberToggleActivity/:cyberId", cyberToggleActivity);
router.delete('/cyberDelete/:cyberId', cyberDelete);
router.get('/dashboard' , adminDashboard)



module.exports = router;
