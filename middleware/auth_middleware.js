import jwt from "jsonwebtoken";
import User from "../Models/user.js";

const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      req.isLoggedIn = true;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        isLoggedIn: false,
        message: "Token invalid",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      isLoggedIn: false,
      message: "No token provided",
    });
  }
};

export default protect;

