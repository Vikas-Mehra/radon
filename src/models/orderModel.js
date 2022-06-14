const moment = require("moment");
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "Client",
  },
  productId: {
    type: ObjectId,
    ref: "Product",
  },
  amount: Number,
  isFreeAppUser: Boolean,
  date: {
    type: String,
    default: moment().format("DD:MM:YYYY"),
  },
});

module.exports = mongoose.model("Order", orderSchema);
