const userModel = require("../models/userModel");


module.exports.pageNotFound = (req, res) => {
    res.render('404');
}

module.exports.userHomeController = (req, res) => {
  res.render("userregister");
};
// module.exports.searchBarController = (req, res) => {
//   res.render("search");
// };
module.exports.userProfileController = (req, res) => {
  res.render("userProfile");
};



module.exports.userFeedController = async (req, res) => {
    try {
        // Fetch all users
        const users = await userModel.find({});

        // Render user feed page with user data
        res.render("userfeed", { users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports.searchController = async (req, res) => {
    console.log("object");
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: 'No search terms provided' });
        }

        // Split the search query into individual terms
        const searchTerms = query.split(' ').map(term => term.trim());

        // Build the search pipeline using MongoDB aggregation
        const searchEngine = [
            {
                $match: {
                    $or: [
                        { "district": { $in: searchTerms.map(term => new RegExp(term, 'i')) } },
                        { "block": { $in: searchTerms.map(term => new RegExp(term, 'i')) } },
                        { "panchayat": { $in: searchTerms.map(term => new RegExp(term, 'i')) } },
                        { "village": { $in: searchTerms.map(term => new RegExp(term, 'i')) } }
                    ]
                }
            },
            {
                $project: {
                    district: 1,
                    block: 1,
                    panchayat: 1,
                    village: 1
                }
            }
        ];

        // Perform the aggregation query
        const userData = await userModel.aggregate(searchEngine);
        res.render('userfeed',{users:userData})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports.userview = (req, res) => {
    try {
        res.render('userview');
    } catch (error) {
        console.error(`Something went wrong in this route ${error.message}`);
        res.status(404).render("404", { title: "Page Not Found" });
    }
}


module.exports.userEdit = (req,res) => {
    try {
        res.render('useredit')
    } catch (error) {
        console.error(`Something went wrong in this route ${error.message}`);
        res.status(404).render("404", { title: "Page Not Found" }); 
    }
}


module.exports.usersviews = (req, res) => {
    try {
        // const {ucserId} = req.params;
        res.render('userview')
    } catch (error) {
        console.error(`Something went wrong in this route ${error.message}`);
        res.status(404).render("404", { title: "Page Not Found" }); 
    }
}
module.exports.userLoginPageController = (req, res) => {
    try {
        // const {ucserId} = req.params;
        res.render('userlogin')
    } catch (error) {
        console.error(`Something went wrong in this route ${error.message}`);
        res.status(404).render("404", { title: "Page Not Found" }); 
    }
}
