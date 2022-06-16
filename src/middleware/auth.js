const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
  //check the token in request header
  //validate this token
  try {
    let token = req.headers["x-auth-token"];
    if (!token) {
      return res
        .status(401)
        .send({ ERROR: "AUTHENTICATION MISSING: Token must be present." });
    }
    next();
  } catch (err) {
    res.status(500).send({ Error: err.message });
  }
};

const authorise = function (req, res, next) {
  // comapre the logged in user's id and the id in request
  try {
    let token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-radon");

    if (decodedToken.userId !== req.params.userId) {
      return res.status(401).send({
        ERROR:
          "UNAUTHORISED: User Logged is NOT allowed to modify the requested User's Data.",
      });
    }
    next();
  } catch (err) {
    res.status(500).send({ Error: err.message });
  }
};

module.exports.authenticate = authenticate;
module.exports.authorise = authorise;

// const jwt = require("jsonwebtoken");
// let middlewareAuth = function (req, res, next) {
//   let token = req.headers["x-auth-token"];
//   if (!token) {
//     return res.send({ status: false, msg: "ERROR: Token must be present" });
//   }

//   let decodedToken = jwt.verify(token, "functionup-radon");

//   if (decodedToken.userId !== req.params.userId) {
//     return res.send({ msg: "ERROR: User Logged is NOT allowed to modify the requested User's Data." });
//   }
//   next();
// };

// module.exports.midAuth = middlewareAuth;
