const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  price: {
    indianPrice: String,
    europeanPrice: String,
  },
  year: {
    type: Number,
    default: 2021,
  },
  tags: [],
  authorName: String,
  totalPages: Number,
  stockAvailable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Books Collection", bookSchema); //books collections

// {
//   "bookName": "Thunderbolt",
//   "price": {
//       "indianPrice":"300INR",
//       "europeanPrice":"30Pound"
//       },
//   "year": "2022",
//   "tags": ["Fiction"],
//   "authorName": "Antoine Mary",
//   "totalPages": "150"
// }
