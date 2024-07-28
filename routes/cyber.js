const express = require("express");
const router = express.Router();
const { cyberController } = require("../controllers/get-cyber");
const { postRegisterController, postLoginController } = require("../controllers/post-cyber");

router.get("/", cyberController);

//! post routes

router.post("/newcyber/create", postRegisterController);
router.post('/login', postLoginController);

module.exports = router;
