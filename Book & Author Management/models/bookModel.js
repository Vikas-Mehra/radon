const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  author_id: {
    type: Number,
    required: true
  },
  price: Number,
  ratings: Number
});

module.exports = mongoose.model("New Book", bookSchema); //new books

// {
//   "name":"Three states",
//   "author_id":"3",
//   "price":"80",
//   "ratings":"4.5"
// }