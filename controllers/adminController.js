const {cyberModel} = require('../models/cyberModel');
const {adminModel} = require('../models/adminModel');
const bcrypt = require('bcrypt')
const {generateTokenAdmin} = require('../utils/generateToken')

module.exports.cyberToggleActivity = async (req, res) => {
    try {
        const cyber = await cyberModel.findOne({ _id: req.params.cyberId });

        if (!cyber) {
            return res.status(404).json({ error: "Cyber record not found" });
        }

        cyber.activity = cyber.activity === "active" ? "inactive" : "active";

        await cyber.save();

        res.redirect('/');
    } catch (error) {
        console.error("Error updating activity status:", error.message);

        res.status(500).json({ error: "An error occurred while updating activity status" });
    }
};

module.exports.cyberDelete = async (req, res) => {
    try {
        const cyber = await cyberModel.findOneAndDelete({ _id: req.params.cyberId });
        
        if (!cyber) {
            return res.status(404).json({ error: "Cyber record not found" });
        }
        
        res.status(200).json({ message: "Cyber deleted successfully", name: cyber.name });
    } catch (error) {
        console.error("Error deleting cyber record:", error.message);
        res.status(500).json({ error: "An error occurred while deleting cyber record" });
    }
}


module.exports.adminDashboard = async (req, res) => {
    try {
        const allCybers = await cyberModel.find();
        res.render('admindashboard', allCybers);
    } catch (error) {
        console.error(`Something went wrong in this route ${error.message}`);
        res.status(404).render("404", { title: "Page Not Found" });
    }
}

module.exports.adminLogin = async (req, res) => {
    try {
        console.log(req.body);
        const admin = await adminModel.findOne({ email: req.body.email }).select("+password");

        console.log(admin);

        if (!admin) {
            return res.status(401).json({ error: "Invalid email or password.", redirect: '/' });
        }

        const isMatch = await bcrypt.compare(req.body.password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password.",redirect: "/" });
        }


        const token = generateTokenAdmin(admin);


        res.cookie("adminToken", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, 
        });


        res.status(200).json({ message: "Login successful!", redirect: "/admin/dashboard" });
    } catch (error) {

        console.error("Error during admin login:", error.message);
        res.status(500).json({ error: "An error occurred. Please try again later." });
    }
}

module.exports.adminloginpage = async (req, res) => {
    res.render('adminLogin');
}