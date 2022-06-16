const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try {
    let data = req.body;
    let savedData = await userModel.create(data);
    res.status(201).send({ User_Created: savedData });
  } catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({
      emailId: userName,
      password: password,
    });

    if (!user)
      return res.status(400).send({
        msg: "BAD REQUEST: Username or the Password is NOT Correct.",
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
    res.status(201).send({ Token_Created: token });
  } catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);

    if (Object.keys(userDetails).length == 0 ) {
      return res.status(404).send({ msg: "No such user exists." });
    }
    res.status(200).send({ User_Data: userDetails });
  } catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};

const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("No such user exists.");
    }

    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: userData },
      { new: true }
    );
    res.status(201).send({ Updated_User: updatedUser });
  } catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};

const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let ChangeUserProperty = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { isDeleted: true } }
    );
    let deleteUser = await userModel.findById(userId);
    res.status(200).send({ User_Deleted_Succesfully: deleteUser });
  } catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
