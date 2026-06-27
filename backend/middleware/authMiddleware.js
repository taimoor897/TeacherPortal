const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Parent = require("../models/Parent");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      if (decoded.role === "teacher") {

    req.user = await Teacher.findById(decoded.id)
        .select("-password");

} else if (decoded.role === "parent") {

    req.user = await Parent.findById(decoded.id)
        .select("-password");

} else {

    req.user = await User.findById(decoded.id)
        .select("-password");

}

      if (!req.user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};

module.exports = { protect };