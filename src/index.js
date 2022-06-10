const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const dateIpRoute = require('./middlewares/dateIpRoute');
app.use(dateIpRoute.dateIpRoute);


mongoose
  .connect(
    "mongodb+srv://Vikas:pAeAi3B.8Rhcfa2@cluster0.tnyfk.mongodb.net/VikasM-DB",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB is connected."))
  .catch((err) => console.log(err));


app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
