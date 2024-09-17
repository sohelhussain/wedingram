const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.validateAdmin = (req, res, next) => {
    try {
        let token = req.cookies.cyberToken;

        if (!token) {
            return res.status(401).redirect('/admin/login'); 
        }

        let data = jwt.verify(token, process.env.JWT_KEY);
        req.cyber = data;

        next(); 
    } catch (error) {
        console.error("Authentication error:", error.message); 
        return res.status(401).redirect('/admin/login'); 
    }
};