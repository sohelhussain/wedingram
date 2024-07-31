const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cyberModel = require("../models/cyberModel");

module.exports.postRegisterController = async (req, res) => {
  let { name, email, password } = req.body;

  let cyber = await cyberModel.findOne({ email });
  console.log(cyber);

  if (cyber) res.send("please login, you are already registered");

  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);

  let newCyber = await cyberModel.create({
    name,
    email,
    password: hash,
  });

  let token = jwt.sign(
    { id: newCyber._id, email: newCyber.email },
    process.env.JWT_SECRET_KEY
  );
  res.cookie("token", token);
  res.send("cyber are created");
};

module.exports.postLoginController = async (req, res) => {
  let { email, password } = req.body;

  let cyber = await cyberModel.findOne({ email }).select("+password");
  if (!cyber) res.send("please you are creat a new CYBER account");

  const result = await bcrypt.compare(password, cyber.password);

  if (result) {
    let token = jwt.sign(
      { id: cyber._id, email: cyber.email },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("token", token);
    res.send("cyber login successfully");
  } else {
    res.send("somthing went wrong");
  }
};
