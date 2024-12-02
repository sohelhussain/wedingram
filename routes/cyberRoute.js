const express = require("express");
const router = express.Router();
const { cyberRegister, cybersignin, verifyController, cyberUserController} = require("../controllers/get-cyber");
const { postRegisterController, postRegisterOtpverification, cyberLoginController, cyberLogoutController, postcyberedit } = require("../controllers/post-cyber");
const { userHomeController, searchController, searchBarController,userProfileController, userFeedController, pageNotFound, userview, userEdit, usersviews} = require("../controllers/get-user");
const { userCreateController , userCreateOtpVerification, userLoginController, userLogoutController, userPostEdit } = require("../controllers/post-user");
const upload = require("../config/multer-config")




router.get("/", cyberRegister);
router.get("/signin", cybersignin);
router.get("/verify", verifyController);
router.get("/cyberuser", cyberUserController);

//! post routes

router.post("/newcyber/create",upload.fields([
    { name: 'shopRegistrationPhoto', maxCount: 1 },
    { name: 'pancardPhoto', maxCount: 1 },
    { name: 'adharcardPhoto', maxCount: 1 },
    { name: 'passportSizePhoto', maxCount: 1 }
  ]), postRegisterController);

router.post("/newcyber/verifyOtp",postRegisterOtpverification);
router.post("/cyber/edit",postcyberedit);

router.post('/cyberLogin', cyberLoginController);
router.get('/cyberLogout', cyberLogoutController);




//? user routes for crud!

router.get("/user", userHomeController);
router.get('/search', searchController)
router.get('/searchshow',searchBarController)
router.get('/profile',userProfileController)
router.get('/userfeed', userFeedController)
// router.get('/pagenotfound',pageNotFound)


// creaet user
router.post("/usercreate", userCreateController);
router.post("/usercreate/otpverify", userCreateOtpVerification);
router.post('/useredit', userPostEdit);


router.post('/userLogin', userLoginController);
router.get('/userLogout', userLogoutController);
router.get('/userfeed/userview', userview);
router.get('/useredit', userEdit);
router.get('/viewsuser/:ucserId', usersviews)


router.get('*', pageNotFound)

module.exports = router;
