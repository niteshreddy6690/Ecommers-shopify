const jwt = require("jsonwebtoken");
const router = require("express").Router();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("calling verify token");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log(token);
    jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is invalid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated as a user");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed do that");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json("You are not an Admin so you are not allowed do that");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
