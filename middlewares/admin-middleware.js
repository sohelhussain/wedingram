const adminAuthPage = (permisssion) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    if(permisssion.includes(userRole)){
        next()
    }else{
        res.send("You are not allowed, you are not a admin");
    }
  };
};
// const adminAuthDash = () => {};

module.exports = { adminAuthPage };
