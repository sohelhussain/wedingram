const express = require("express");
const router = express.Router();
const { adminPageController } = require("../controllers/creatingAdmin");
// const { cyberAuthPage } = require("../middlewares/adminCyber-middleware");

// cyberAuthPage(["cyber"]),

router.get("/", adminPageController);


module.exports = router;
