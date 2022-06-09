const publisherModel = require("../models/publisherModel");

// 2. Write a POST api that creates a publisher from the details in the request body.
const createPublisher = async function (req, res) {
  let publisher = req.body;
  let publisherCreated = await publisherModel.create(publisher);
  res.send({ data: publisherCreated });
};

module.exports.createPublisher = createPublisher;
