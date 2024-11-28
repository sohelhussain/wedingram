const {cyberModel} = require('../models/cyberModel');



module.exports.cyberToggleActivity = async (req, res) => {
    try {
        const cyber = await cyberModel.findOne({ _id: req.params.cyberId });

        if (!cyber) {
            return res.status(404).json({ error: "Cyber record not found" });
        }

        cyber.activity = cyber.activity === "active" ? "inactive" : "active";

        await cyber.save();

        // res.status(200).json({ message: "Activity status updated successfully", cyber });
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


module.exports.adminDashboard = (req, res) => {
    try {
        res.render('admindashboard');
    } catch (error) {
        console.error(`Something went wrong in this route ${error.message}`);
        res.status(404).render("404", { title: "Page Not Found" });
    }
}

