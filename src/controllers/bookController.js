const bookModel = require("../models/bookModel");

const createBook = async function (req, res) {
  let data = req.body;
  let savedData = await bookModel.create(data);
  res.send({ Book: savedData });
};

const bookList = async function (req, res) {
  let allBooks = await bookModel
    .find()
    .select({ bookName: 1, authorName: 1, _id: 0 });
  res.send({ Book: allBooks });
};

const getBooksInYear = async function (req, res) {
  const year = req.params.year;
  let booksInYear = await bookModel
    .find({ year })
    .select({ _id: 0, bookName: 1, year: 1 });
  res.send({ Book: booksInYear });
};

const getXINRBooks = async function (req, res) {
  let booksINR = await bookModel
    .find({ "price.indianPrice": { $in: ["100INR", "200INR", "500INR"] } })
    .select({ bookName: 1, _id: 0, price: 1 });
  res.send({ Book: booksINR });
};

const getRandomBooks = async function (req, res) {
  let books = await bookModel
    .find({ $and: [{ totalPages: { $gt: 500 } }, { stockAvailable: true }] })
    .select({ _id: 0, bookName: 1, totalPages: 1, stockAvailable: 1 });

  res.send({ Book: books });
};

const getParticularBook = async function (req, res) {
  const search = req.body;
  const result = await bookModel.find(search).select({ _id: 0, bookName: 1 });
  res.send({ Book: result });
};

module.exports.createBook = createBook;
module.exports.bookList = bookList;
module.exports.getBooksInYear = getBooksInYear;
module.exports.getXINRBooks = getXINRBooks;
module.exports.getRandomBooks = getRandomBooks;
module.exports.getParticularBook = getParticularBook;
