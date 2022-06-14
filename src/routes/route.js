const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authM = require("../Middleware/Auth");

router.post("/users", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/users/:userId", authM.authMiddleware, userController.getUserData);
router.put("/users/:userId", authM.authMiddleware, userController.updateUser);
router.delete("/users/:userId", authM.authMiddleware, userController.deleteUser);

module.exports = router;
