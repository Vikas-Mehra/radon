const jwt = require("jsonwebtoken");
let auth1 = function (req, res, next) {
  try {
    let token = req.headers["x-auth-token"];
    if (!token) {
      return res.send({ status: false, msg: "Token Must Be Present." });
    }

    let decodedToken = jwt.verify(token, "functionup-radon");

    if (!decodedToken) {
      return res.send({ status: false, msg: "Token is Invalid." });
    }
    next();
  } catch (error) {
    res.send(error);
  }
};

module.exports.authMiddleware = auth1;
