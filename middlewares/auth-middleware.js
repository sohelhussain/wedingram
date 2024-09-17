const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userAuth = (req, res, next) => {
    try {
        if (!req.cookies.userToken && !req.cookies.cyberToken) {
            return res.status(400).redirect('/user/login'); 
        }

        let token = req.cookies.userToken || req.cookies.cyberToken; 
        const result = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = result;

        next(); 
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).redirect('/user/login'); 
    }
};