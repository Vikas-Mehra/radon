const productModel = require("../models/productModel");

const createProduct = async function (req, res) {
  let product = req.body;
  let productCreated = await productModel.create(product);
  res.send({ data: productCreated });
};

const getProduct = async function (req, res) {
  let product = await productModel.find();
  res.send({ data: product });
}  

module.exports.createProduct = createProduct;
module.exports.getProduct = getProduct;
