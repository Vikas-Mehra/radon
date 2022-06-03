const bookModel = require("../models/bookModel");

const createBook = async function (req, res) {
  let data = req.body;
  let savedData = await bookModel.create(data);
  res.send({ Book: savedData });
};

const getBooksData = async function (req, res) {
  let allBooks = await bookModel.find();
  res.send({ Book: allBooks });
};

module.exports.createBook = createBook;
module.exports.getBooksData = getBooksData;
