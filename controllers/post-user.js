const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const sendMail = require("../utils/nodeMailer");

module.exports.userCreateController = async (req, res) => {
    try {
        let {
            firstName,
            lastName,
            gender,
            lookingFor,
            dob,
            category,
            education,
            country,
            state,
            city,
            phoneNumber,
            email,
            age,
            maritalStatus,
            district,
            block,
            panchayt,
            village,
            fathersName,
            mothersName,
            disability,
            hobbies,
            caste,
            diet,
            complexion,
            drink,
            smoke,
            height,
            password
        } = req.body;

        let user = await userModel.findOne({ email: email });

        if (user) return res.status(401).send("You already have an account, please login.");

        // Generate and send OTP
        const generatedOtp = Math.floor(100000 + Math.random() * 900000);
        req.session.otp = generatedOtp;
        req.session.email = email;
        req.session.userData = {
            firstName,
            lastName,
            gender,
            lookingFor,
            dob,
            category,
            education,
            country,
            state,
            city,
            phoneNumber,
            email,
            age,
            maritalStatus,
            district,
            block,
            panchayt,
            village,
            fathersName,
            mothersName,
            disability,
            hobbies,
            caste,
            diet,
            complexion,
            drink,
            smoke,
            height,
            password
        };

        // Send OTP via email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${generatedOtp}. It is valid for 10 minutes.`,
        };

        await sendMail(mailOptions);
        return res.status(200).json({ message: "OTP sent successfully. Please verify your email." });
    } catch (err) {
        res.send(err.message);
    }
};

module.exports.userCreateOtpVerification = async (req, res) => {
    const { otp } = req.body;

    try {
        // Validate OTP and session data
        if (otp != req.session.otp || !req.session.email) {
            return res.status(400).json({ error: "Invalid OTP or email mismatch. Please try again." });
        }

        // Retrieve user data from session
        const {
            firstName,
            lastName,
            gender,
            lookingFor,
            dob,
            category,
            education,
            country,
            state,
            city,
            phoneNumber,
            email,
            age,
            maritalStatus,
            district,
            block,
            panchayt,
            village,
            fathersName,
            mothersName,
            disability,
            hobbies,
            caste,
            diet,
            complexion,
            drink,
            smoke,
            height,
            password
        } = req.session.userData;

        // Hash the password
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        // Create a new user
        let newUser = await userModel.create({
            firstName,
            lastName,
            gender,
            lookingFor,
            dob,
            category,
            education,
            country,
            state,
            city,
            phoneNumber,
            email,
            age,
            maritalStatus,
            district,
            block,
            panchayt,
            village,
            fathersName,
            mothersName,
            disability,
            hobbies,
            caste,
            diet,
            complexion,
            drink,
            smoke,
            height,
            password: hash
        });

        // Generate JWT token
        let token = generateToken(newUser);
        res.cookie("token", token, { httpOnly: true });

        // Clear session data
        req.session.destroy();

        return res.status(201).json({ message: "User created successfully.", newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

