const express = require("express");
const router = express.Router();

const { userHomeController} = require("../controllers/get-user");
const { userCreateController } = require("../controllers/post-user");




router.get("/", userHomeController);
router.post("/usercreate", userCreateController);



module.exports = router;
