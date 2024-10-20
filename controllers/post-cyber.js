const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cyberModel, cyberValidator } = require("../models/cyberModel");
const sendMail = require("../utils/nodeMailer");
const {generateTokenForCyber} = require("../utils/generateToken");



module.exports.postRegisterController = async (req, res) => {
  const { name, email, password } = req.body;
  const { shopRegistrationPhoto = [], pancardPhoto = [], adharcardPhoto = [], passportSizePhoto = [] } = req.files || {};

  try {
    // Validate input data
    const error = cyberValidator({ name, email, password, shopRegistrationPhoto, pancardPhoto, adharcardPhoto, passportSizePhoto });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the user already exists
    const existingUser = await cyberModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered. Please log in." });
    }

    // Generate and send OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    req.session.otp = generatedOtp;
    req.session.email = email;
    req.session.userData = { name, email, password, shopRegistrationPhoto, pancardPhoto, adharcardPhoto, passportSizePhoto };

    // Send OTP via email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${generatedOtp}. It is valid for 10 minutes.`,
    };

    await sendMail(mailOptions);
    // return res.status(200).json({ message: "OTP sent successfully. Please verify your email." });
    return res.redirect('/cyber/verify');

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error sending OTP. Please try again." });
  }
};

module.exports.postRegisterOtpverification = async (req, res) => {
  const { otp } = req.body;

  try {
    // Validate OTP and session data
    if (!req.session.otp || otp != req.session.otp || !req.session.email) {
      return res.status(400).json({ error: "Invalid OTP or email mismatch. Please try again." });
    }

    // Retrieve user data from session
    const { name, email, password, shopRegistrationPhoto, pancardPhoto, adharcardPhoto, passportSizePhoto } = req.session.userData;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create a new cyber user
    const newCyber = await cyberModel.create({
      name,
      email,
      password: hash,
      shopRegistrationPhoto: shopRegistrationPhoto[0] ? shopRegistrationPhoto[0].buffer : null,
      shopRegistrationPhotoMimetype: shopRegistrationPhoto[0] ? shopRegistrationPhoto[0].mimetype : null,
      pancardPhoto: pancardPhoto[0] ? pancardPhoto[0].buffer : null,
      pancardPhotoMimetype: pancardPhoto[0] ? pancardPhoto[0].mimetype : null,
      adharcardPhoto: adharcardPhoto[0] ? adharcardPhoto[0].buffer : null,
      adharcardPhotoMimetype: adharcardPhoto[0] ? adharcardPhoto[0].mimetype : null,
      passportSizePhoto: passportSizePhoto[0] ? passportSizePhoto[0].buffer : null,
      passportSizePhotoMimetype: passportSizePhoto[0] ? passportSizePhoto[0].mimetype : null,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newCyber._id, email: newCyber.email, cyber: true },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' } // Token will expire in 1 day
    );

    // Set the token in the cookie
    res.cookie("cybreToken", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Clear session data
    req.session.destroy();

    // return res.status(201).json({ message: "User created successfully." });
    return res.redirect('/cyber/cyberuser')
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.cyberLoginController = async (req, res) => {
    const cyber = await cyberModel.findOne({ email: req.body.email }).select("+password");

    if (!cyber) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(req.body.password, cyber.password);

    if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = generateTokenForCyber(cyber);
    res.cookie("cyberToken", token);

    return res.status(200).json({ message: "Login successful.", cyber });
}

module.exports.cyberLogoutController = async (req, res) => {
    req.session.destroy();
    res.clearCookie("cyberToken");
    return res.status(200).json({ message: "Logout successful." });
}