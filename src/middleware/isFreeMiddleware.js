let GlobalMD = function (req, res, next) {
  let contentTypeHeader = req.headers["isfreeappuser"];
  console.log(contentTypeHeader);

  if (contentTypeHeader) {
    req.body.isFreeAppUser = contentTypeHeader;
    next();
  } else {
    res.send({
      msg: " ERROR: Invalid Header Value. Enter isFreeAppUser(Boolean)(LOWERCASE) in Header.",
    });
  }
};

module.exports.GB = GlobalMD;
