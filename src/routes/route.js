const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const auth = require("../Middleware/auth");

router.post("/createUser", userController.createUser);
router.post("/login", userController.loginUser);
router.get(
  "/users/:userId",
  auth.authenticate,
  auth.authorise,
  userController.getUserData
);
router.put(
  "/users/:userId",
  auth.authenticate,
  auth.authorise,
  userController.updateUser
);
router.delete(
  "/users/:userId",
  auth.authenticate,
  auth.authorise,
  userController.deleteUser
);
router.put(
  "/users/:userId/posts",
  auth.authenticate,
  auth.authorise,
  postController.createPost
);

module.exports = router;
