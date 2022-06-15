const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });

  if (!user)
    return res.send({
      status: false,
      msg: "Username or the Password is NOT Correct.",
    });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "radon",
      organisation: "FUnctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
};

const getUserData = async function (req, res) {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);

  if (!userDetails) {
    return res.send({ status: false, msg: "No such user exists." });
  }
  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  if (!user) {
    return res.send("No such user exists.");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: userData },
    { new: true }
  );
  res.send({ status: true, Updated_User: updatedUser });
};

const deleteUser = async function (req, res) {
  let userId = req.params.userId;
  let ChangeUserProperty = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: { isDeleted: true } }
  );
  let deleteUser = await userModel.findById(userId);
  res.send({ msg: "User Deleted Succesfully.", deleteUser });
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
