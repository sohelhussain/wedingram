const express = require("express");
const router = express.Router();

const { userHomeController, searchController, searchBarController,userProfileController} = require("../controllers/get-user");
const { userCreateController , userCreateOtpVerification } = require("../controllers/post-user");




router.get("/", userHomeController);
router.get('/search', searchController)
router.get('/searchshow',searchBarController)
router.get('/profile',userProfileController)
router.post("/usercreate", userCreateController);
router.post("/usercreate/otpverify", userCreateOtpVerification);



module.exports = router;
