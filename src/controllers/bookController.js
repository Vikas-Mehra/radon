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
  let booksInYear = await bookModel.find({ year });
  res.send({ Book: booksInYear });
};

const getXINRBooks = async function (req, res) {
  let booksINR = await bookModel
    .find({
      $or: [
        { "price.indianPrice": 100 },
        { "price.indianPrice": 200 },
        { "price.indianPrice": 500 },
      ],
    })
    .select({ bookName: 1, price: 1, _id: 0 });
  res.send({ Book: booksINR });
};

const getRandomBooks = async function (req, res) {
  let books = await bookModel
    .find({ totalPages: { $gt: 500 } }, { stockAvailable: true })
    .select({ _id: 0, bookName: 1, totalPages: 1 });

  res.send({ Book: books });
};

const getParticularBook = async function (req, res) {
  const year = req.query.year;
  const bookName = req.query.name;
  const authorName = req.query.author;

  //BELIEVE ME I WROTE THIS CODE.
  if (year && bookName && authorName) {
    let books = await bookModel.find({
      $and: [{ year }, { bookName }, { authorName }],
    }).select({ _id: 0, bookName: 1 });
    res.send({ Book: books });
  } else if (year && bookName) {
    let books = await bookModel.find({ $and: [{ year }, { bookName }]}).select({ _id: 0, bookName: 1 });
    res.send({ Book: books });
  } else if (year && authorName) {
    let books = await bookModel.find({ $and: [{ year }, { authorName }] }).select({ _id: 0, bookName: 1 });
    res.send({ Book: books });
  } else if (authorName && bookName) {
    let books = await bookModel.find({ $and: [{ authorName }, { bookName }] }).select({ _id: 0, bookName: 1 });
    res.send({ Book: books });
  } else if (year) {
    let books = await bookModel.find({ year }).select({ _id: 0, bookName: 1 });
    res.send({ Book: books });
  } else if (bookName) {
    let books = await bookModel
      .find({ bookName })
      .select({ _id: 0, bookName: 1 });
    res.send({ Book: books });
  } else if (authorName) {
    let books = await bookModel
      .find({ authorName })
      .select({ _id: 0, bookName: 1 });
    res.send({ Book: books });
  } else {
    let books = await bookModel.find().select({ _id: 0, bookName: 1 });
    res.send({ Book: books });
  }
};

module.exports.createBook = createBook;
module.exports.bookList = bookList;
module.exports.getBooksInYear = getBooksInYear;
module.exports.getXINRBooks = getXINRBooks;
module.exports.getRandomBooks = getRandomBooks;
module.exports.getParticularBook = getParticularBook;
