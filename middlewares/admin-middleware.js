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

module.exports = { adminAuthDash };
