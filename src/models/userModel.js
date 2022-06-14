const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  balance: {
    type: Number,
    default: 100,
  },

  address: String,
  age: Number,
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  isFreeAppUser: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Client", userSchema);

// {
//     "name": "V. Bansal",
//     "address": "New Delhi",
//     "age": "35",
//     "gender":"male"
// }
