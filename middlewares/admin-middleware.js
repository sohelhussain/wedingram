const cyberAuthPage = (permisssion) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    if (permisssion.includes(userRole)) {
      next();
    } else {
      res.send("You are not allowed, you are not a admin or cyber");
    }
  };
};
const adminAuthDash = (permisssion) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    if (permisssion.includes(userRole)) {
      next();
    } else {
      console.log('object');
      res.redirect('/');
    }
  };
};

module.exports = { cyberAuthPage, adminAuthDash };
