const userModel = require("../models/userModel");

const createPost = async function (req, res) {
  try {
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    let message = req.body.message;

    let updatedPosts = user.posts;
    updatedPosts.push(message);

    let updatedUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      { posts: updatedPosts },
      { new: true }
    );
    return res.status(200).send({ User_Updated: updatedUser });
  } catch (err) {
    res.status(500).send({ ERROR: err.message });
  }
};

module.exports.createPost = createPost;

// try {

// } catch (err) { res.status(500).send({ Error: err.message }) }
