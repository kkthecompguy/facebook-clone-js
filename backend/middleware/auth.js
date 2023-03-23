const jwt = require("jsonwebtoken");
const {
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_403_FORBIDDEN,
} = require("../utils/status");

const isAuthenticated = async (req, res, next) => {
  try {
    let authorization = req.headers["authorization"];
    if (typeof authorization === "string" && authorization.length > 0) {
      const token = authorization.slice(7, authorization.length);
      if (!token) {
        return res
          .status(HTTP_403_FORBIDDEN)
          .json({ message: "Missing authorization headers" });
      }
      const user = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } else {
      return res
        .status(HTTP_403_FORBIDDEN)
        .json({ message: "Missing authorization headers" });
    }
  } catch (error) {
    return res
      .status(HTTP_500_INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = isAuthenticated;
