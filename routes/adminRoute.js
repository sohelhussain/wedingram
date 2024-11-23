const express = require("express");
const router = express.Router();
const { adminPageController } = require("../controllers/creatingAdmin");
// const { cyberAuthPage } = require("../middlewares/adminCyber-middleware");
const {cyberToggleActivity, cyberDelete} = require('../controllers/adminController');

// cyberAuthPage(["cyber"]),

router.get("/", adminPageController);

router.get("/cyberToggleActivity/:cyberId", cyberToggleActivity);
router.delete('/cyberDelete/:cyberId', cyberDelete);
router.get('dashboard', )



module.exports = router;
