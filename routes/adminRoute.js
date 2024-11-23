const express = require("express");
const router = express.Router();
const { adminPageController } = require("../controllers/creatingAdmin");
// const { cyberAuthPage } = require("../middlewares/adminCyber-middleware");
const {cyberActive, cyberInActive} = require('../controllers/adminController');

// cyberAuthPage(["cyber"]),

router.get("/", adminPageController);

router.get("/active/:cyberId", cyberActive)
router.get("/inactive/:cyberId", cyberInActive)


module.exports = router;
