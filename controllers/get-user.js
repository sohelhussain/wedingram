const userModel = require("../models/userModel");
module.exports.userHomeController = (req, res) => {
  res.render("user");
};
module.exports.searchController = async (req, res) => {
  let data = req.params.key;
  const userData = await userModel.find(
   {
      "$or":[
         {"district":{$regex:data}},
         {"block":{$regex:data}},
         {"panchayt":{$regex:data}},
         {"village":{$regex:data}},
      ]
   }
  );
  res.send(userData);
};
