const express = require("express");
const router = express.Router();
const bookModel = require("../models/bookModel.js");
const authorModel = require("../models/authorModel.js");
const bookController = require("../controllers/bookController");


router.post("/createBook", bookController.createBook);

router.post("/enterAuthor", bookController.enterAuthor);

router.get("/chetanBhagat", bookController.chetanBhagat);

router.post("/twoStates", bookController.twoStates);

router.get("/between50_100", bookController.between50_100);

router.get("/booksByAuthorId/:AuthorId", bookController.booksByAuthorId);

router.get("/authorAge", bookController.authorAge);


module.exports = router;
