const express = require("express");
const router = express.Router();

const { userHomeController, searchController} = require("../controllers/get-user");
const { userCreateController } = require("../controllers/post-user");




router.get("/", userHomeController);
router.get('/search/:key', searchController)
router.post("/usercreate", userCreateController);



module.exports = router;
