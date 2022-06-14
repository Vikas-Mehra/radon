const userModel = require("../models/userModel");
const UserModel = require("../models/userModel");

const createUser = async function (req, res) {
  let user = req.body;
  let userCreated = await UserModel.create(user);
  res.send({ data: userCreated });
};

const getUsers = async function (req, res) {
  let users = await userModel.find();
  res.send({ data: users });
};

module.exports.getUsers = getUsers;
module.exports.createUser = createUser;
