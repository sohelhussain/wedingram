const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");
const sendMail = require("../utils/nodeMailer");

module.exports.userCreateController = async (req, res) => {
    try {
        let {
            firstName,
            phoneNumber,
            email,
            password,
            block,
            panchayat,
            district,
            village
            
        } = req.body;

        let user = await userModel.findOne({ email: email });

        if (user) return res.status(401).send("You already have an account, please login.");


        const generatedOtp = Math.floor(100000 + Math.random() * 900000);
        req.session.otp = generatedOtp;
        req.session.email = email;
        req.session.userData = {
            firstName,
            phoneNumber,
            email,
            block,
            password,
            panchayat,
            district,
            village,

        };


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

        if (otp != req.session.otp || !req.session.email) {
            return res.status(400).json({ error: "Invalid OTP or email mismatch. Please try again." });
        }


        const {
            firstName,
            phoneNumber,
            email,
            password,
            block,
            panchayat,
            village,
            district,
        } = req.session.userData;


        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);


        let newUser = await userModel.create({
            firstName,
            phoneNumber,
            email,
            password: hash,
            panchayat,
            village,
            block,
            district,
        });


        let token = generateToken(newUser);
        res.cookie("userToken", token);


        req.session.destroy();

        return res.status(201).json({ message: "User created successfully.", newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.userLoginController = async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = generateToken(user);
    res.cookie("userToken", token);

    return res.status(200).json({ message: "Login successful.", user });
}

module.exports.userLogoutController = async (req, res) => {
    req.session.destroy();
    res.clearCookie("userToken");
    return res.status(200).json({ message: "Logout successful." });
};




module.exports.userPostEdit = async (req, res) => {
    try {

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
            fathersName,
            mothersName,
            disability,
            complexion,
            caste,
            hobbies,
        } = req.body;


        const userId = req.user._id;


        const updatedUser = await userModel.findByIdAndUpdate(
            userId, 
            {
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
                fathersName,
                mothersName,
                disability,
                complexion,
                caste,
                hobbies,
            },
            { new: true, runValidators: true } 
        );


        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).redirect('/cyber/profile');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports.requestcath = async (req, res) => {
    try {
        const meUser = req.user._id; 
        const targetUserId = req.params.id; 


        const targetUser = await userModel.findById(targetUserId);
        if (!targetUser) {
            return res.status(404).json({ error: "Target user not found." });
        }


             await userModel.findByIdAndUpdate(
            targetUserId,
            { $addToSet: { request: meUser } }, 
            { new: true } 
        );
        res.status(200).redirect('/cyber/profile'); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};