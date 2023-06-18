const publicRoutes = ["/v1/auth/login", "/v1/auth/signup"];

const jwt = require("jsonwebtoken");

function CheckJWT(req, res, next) {
  //check if there is token
  if (!req.cookies.token) {
    return res.status(401).json({ message: "there is not any token" });
  }

  const token = req.cookies.token;

  try {
    //decoding token which is sent
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //there was no problem in decoding token => add to user in request
    req.user = decoded;
    //go to next middle ware
    next();
  } catch (error) {
    //there was error while decoding token => send status 403 as unAuthorized
    return res.status(403).json({ message: "Invalid token" });
  }
}

function authenticatedMiddleWare(req, res, next) {
  //check path of request
  if (publicRoutes.includes(req.path)) {
    //this path is not need Authentication
    return next();
  }

  //check JWT
  return CheckJWT(req, res, next);
}

module.exports = authenticatedMiddleWare;
