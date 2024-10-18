const express = require("express");
const router = express.Router();
const { cyberController , verifyController, cyberUserController} = require("../controllers/get-cyber");
const { postRegisterController, postRegisterOtpverification, cyberLoginController, cyberLogoutController } = require("../controllers/post-cyber");
const upload = require("../config/multer-config")

router.get("/", cyberController);
router.get("/verify", verifyController);
router.get("/cyberuser", cyberUserController);

//! post routes

router.post("/newcyber/create",upload.fields([
    { name: 'shopRegistrationPhoto', maxCount: 1 },
    { name: 'pancardPhoto', maxCount: 1 },
    { name: 'adharcardPhoto', maxCount: 1 },
    { name: 'passportSizePhoto', maxCount: 1 }
  ]), postRegisterController);

router.post("/newcyber/verifyOtp",postRegisterOtpverification );

router.post('/cyberLogin', cyberLoginController);
router.get('/cyberLogout', cyberLogoutController);

module.exports = router;
