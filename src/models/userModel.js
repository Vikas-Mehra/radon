const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    mobile: {
      type: String,
      required: true,
    },
    emailId: String,
    password: String,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    age: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("newUser", userSchema);

// {
//     "firstName": "Akash",
//     "lastName": "Moon",
//     "mobile": "9284029768",
//     "emailId": "moon@gmail.com",
//     "password": "abc123",
//     "gender": "male",
//     "age": "21"
// }
