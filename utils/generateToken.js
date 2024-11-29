const jwt = require("jsonwebtoken");

const generateTokenAdmin = (admin) =>{
   return jwt.sign({email: admin.email, id:admin._id, admin: true } ,  process.env.JWT_SECRET_KEY);
}

const generateToken = (user) =>{
   return jwt.sign({email: user.email, id:user._id, user: true } ,  process.env.JWT_SECRET_KEY);
}

const generateTokenForCyber = (cyber) =>{
    return jwt.sign({id: cyber._id, email: cyber.email, cyber: true } ,  process.env.JWT_SECRET_KEY);
}

module.exports = {generateToken, generateTokenForCyber, generateTokenAdmin};