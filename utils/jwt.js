const jwt = require('jsonwebtoken');

exports.signJWT = (data)=>{return jwt.sign(data, process.env.JWT_SECRET)};
exports.jwt = jwt;