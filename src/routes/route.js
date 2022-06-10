const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");
const bookController = require("../controllers/bookController");
const publisherController = require("../controllers/publisherController");

router.post("/createAuthor", authorController.createAuthor);

router.post("/createPublisher", publisherController.createPublisher);

router.post("/createBook", bookController.createBook);

router.get("/getPopulatedBooks", bookController.getPopulatedBooks);

router.put("/books", bookController.books);

router.put("/incRating", bookController.incRating);


module.exports = router;
