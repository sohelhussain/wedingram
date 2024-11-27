const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.cyberAuth = (req, res, next) => {
    try {
        let token = req.cookies.cyberToken;

        if (!token) {
            return res.status(401).redirect('/cyber/login'); 
        }

        let data = jwt.verify(token, process.env.JWT_KEY);
        req.cyber = data;

        next(); 
    } catch (error) {
        console.error("Authentication error:", error.message); 
        return res.status(401).redirect('/cyber/login'); 
    }
};