const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true
    },
    price:{
      indianPrice: Number,
      europeanPrice: Number
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
  }
  // { timestamps: true }
);

module.exports = mongoose.model("Books Collection", bookSchema); //books


// {
//   "bookName": "A Tale of Two Cities",
//   "price": {
//       "indianPrice":"200",
//       "europeanPrice":"20"
//       },
//   "year": "1943",
//   "tags": ["Novel"],
//   "authorName": "Antoine de Saint-Exupéry",
//   "totalPages": "400"
// }