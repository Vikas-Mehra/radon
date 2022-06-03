const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookName: String,
    authorName: String,
    category: String,
    year: Number,
  }
  // { timestamps: true }
);

module.exports = mongoose.model("Books", bookSchema); //books

//{
//   "bookName" : "A Brief History of Time",
//   "authorName" : "Stephen Hawking",
//   "category" : "Popular science",
//   "year" : "1988"
// }
