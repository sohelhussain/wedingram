const express = require("express");
const router = express.Router();

const { userHomeController, searchController, searchBarController,userProfileController, userFeedController, pageNotFound} = require("../controllers/get-user");
const { userCreateController , userCreateOtpVerification, userLoginController, userLogoutController } = require("../controllers/post-user");





router.get("/", userHomeController);
router.get('/search', searchController)
router.get('/searchshow',searchBarController)
router.get('/profile',userProfileController)
router.get('/userfeed',userFeedController)
router.get('/pagenotfound',pageNotFound)


// creaet user
router.post("/usercreate", userCreateController);
router.post("/usercreate/otpverify", userCreateOtpVerification);

router.post('/userLogin', userLoginController);
router.get('/userLogout', userLogoutController);


router.get('*', pageNotFound)




module.exports = router;
