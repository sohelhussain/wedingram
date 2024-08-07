const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {cyberModel, cyberValidator} = require("../models/cyberModel");
const  sendMail  = require("../utils/nodeMailer");

module.exports.postRegisterController = async (req, res) => {
  const { name, email, password } = req.body;
  const { shopRegistrationPhoto = [], pancardPhoto = [], adharcardPhoto = [], passportSizePhoto = [] } = req.files || {};
console.log(req.files);
console.log(req.body);


  try {
        // Validate input data

    const  error  = cyberValidator({ name, email, password, shopRegistrationPhoto, pancardPhoto, adharcardPhoto, passportSizePhoto });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Check if the user already exists
    let existingUser = await cyberModel.findOne({ email });
    if (existingUser) return res.status(400).send("User already registered. Please log in.");

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
    return res.status(200).json({ message: "OTP sent successfully. Please verify your email." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error sending OTP. Please try again." });
  }
};

module.exports.postRegisterOtpverification = async (req, res) => {
  const { otp } = req.body;


  try {
    // Validate OTP and session data
    if (otp != req.session.otp || !req.session.email) {
      return res.status(400).json({ error: "Invalid OTP or email mismatch. Please try again." });
    }

    // Retrieve user data from session
    const { name, email, password, shopRegistrationPhoto, pancardPhoto, adharcardPhoto, passportSizePhoto } = req.session.userData;

    // Hash the password
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    // Create a new cyber user
    let newCyber = await cyberModel.create({
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
    let token = jwt.sign(
      { id: newCyber._id, email: newCyber.email },
      process.env.JWT_SECRET_KEY
    );

    // Set the token in the cookie
    res.cookie("token", token, { httpOnly: true });

    // Clear session data
    req.session.destroy();

    return res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

