module.exports.cyberRegister = (req, res) => {
    // res.render("cyberlogin");
    // res.render("login");
    res.render("cyberregister");
  }
module.exports.cybersignin = (req, res) => {
    // res.render("cyberlogin");
    res.render("login");
  }
module.exports.verifyController = (req, res) => {
    res.render("verifyotp");
  }
module.exports.cyberUserController = (req, res) => {
    res.render("cyberuser");
  }