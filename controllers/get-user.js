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
module.exports.userFeedController = (req, res) => {
  res.render("userfeed");
};
module.exports.searchController = async (req, res) => {
//   let data = req.params.key;
//   const userData = await userModel.find(
//    {
//       "$or":[
//          {"district":{$regex:data}},
//          {"block":{$regex:data}},
//          {"panchayt":{$regex:data}},
//          {"village":{$regex:data}},
//       ]
//    }
//   );
//   res.send(userData);

console.log('fun');
try {
  console.log('fun');
   const { query } = req.query;
   console.log(req.query);
   
   if (!query) {
     return res.status(400).send({ error: 'No search terms provided' });
   }

   const searchTerms = query.split(' ').map(term => term.trim());

   const searchEngine = {
     "$or": [
       { "district": { $in: searchTerms.map(term => new RegExp(term, 'i')) } },
       { "block": { $in: searchTerms.map(term => new RegExp(term, 'i')) } },
       { "panchayt": { $in: searchTerms.map(term => new RegExp(term, 'i')) } },
       { "village": { $in: searchTerms.map(term => new RegExp(term, 'i')) } }
     ]
   };
   console.log('run');
   const userData = await userModel.find(searchEngine);
   res.send(userData);
 } catch (error) {
   console.error(error);
   res.status(500).send({ error: 'Server error' });
 }
};
