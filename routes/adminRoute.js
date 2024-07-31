const express = require("express");
const router = express.Router();
const { adminPageController } = require("../controllers/get-admin");
const {
  adminAuthPage,
} = require("../middlewares/admin-middleware");

router.get("/", adminAuthPage(["admin", "superadmin"]), adminPageController);

module.exports = router;
