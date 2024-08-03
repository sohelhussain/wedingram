const express = require("express");
const router = express.Router();
// const { adminPageController } = require("../controllers/get-admin");
const { cyberAuthPage } = require("../middlewares/adminCyber-middleware");

router.get(
  "/",
  cyberAuthPage(["cyber"]),
);

module.exports = router;
