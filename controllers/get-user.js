const userModel = require("../models/userModel");


module.exports.pageNotFound = (req, res) => {
  res.send('404 page not found');
}



module.exports.userHomeController = (req, res) => {
  res.render("user");
};
module.exports.searchBarController = (req, res) => {
  res.render("search");
};
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
        res.json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
