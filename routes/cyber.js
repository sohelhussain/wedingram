const express = require("express");
const router = express.Router();
const { cyberController } = require("../controllers/get-cyber");

router.get("/", cyberController);

module.exports = router;
