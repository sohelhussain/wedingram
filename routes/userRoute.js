const express = require("express");
const router = express.Router();

const { userHomeController, searchController, searchBarController} = require("../controllers/get-user");
const { userCreateController } = require("../controllers/post-user");




router.get("/", userHomeController);
router.get('/search', searchController)
router.get('/searchshow',searchBarController)
router.post("/usercreate", userCreateController);



module.exports = router;
