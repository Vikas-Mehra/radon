const GM = require("../middleware/isFreeMiddleware");
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");
const { GB } = require("../middleware/isFreeMiddleware");

router.post("/createUser", GM.GB, userController.createUser);
router.post("/createProduct", productController.createProduct);
router.post("/createOrder", GM.GB, orderController.createOrder);

router.get("/getProduct", productController.getProduct);
router.get("/getUsers", userController.getUsers);
router.get("/getOrders", orderController.getOrders);


module.exports = router;
