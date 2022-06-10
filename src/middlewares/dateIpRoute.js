const moment = require("moment");

const dateIpRoute = function (req, res, next) {
    console.log(moment().format("YYYY MMMM DD, h:mm:ss"), req.ip , req.originalUrl);
    next();
};

module.exports.dateIpRoute = dateIpRoute;
