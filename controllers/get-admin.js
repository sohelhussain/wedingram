module.exports.adminPageController = (req, res) => {
  const { name } = req.body;
  res.send("this is a admin page " + name);
};
