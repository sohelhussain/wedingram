const express = require("express");
const router = express.Router();
const { adminPageController } = require("../controllers/get-admin");
const { adminCyberAuthPage, extract } = require("../middlewares/adminCyber-middleware");

router.get(
  "/",
  adminCyberAuthPage(["admin"]), extract,
  adminPageController
);

module.exports = router;
