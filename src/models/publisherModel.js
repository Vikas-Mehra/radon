const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema(
  {
    name: String,
    headQuarter: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("newPublisher", publisherSchema);

// {
// 	   "_id":"61951bfa4d9fe0d34da84523",
//     "name":"Penguin",
//     "headQuarter":"New Delhi"
// }

