const express = require("express");

// const app = express();

const router = express.Router();
const bookModel = require("../models/bookModel.js");
const bookController = require("../controllers/bookController");

router.post("/createBook", bookController.createBook);

router.get("/bookList", bookController.bookList);

router.get("/getBooksInYear/:year", bookController.getBooksInYear);

router.get("/getXINRBooks", bookController.getXINRBooks);

router.get("/getRandomBooks", bookController.getRandomBooks);


router.post("/getParticularBook" , bookController.getParticularBook);

module.exports = router;
