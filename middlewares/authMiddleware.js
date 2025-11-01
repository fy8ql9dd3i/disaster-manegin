// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * @desc Middleware to protect admin routes using JWT
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const protect = (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach admin ID to request object for further use
      req.adminId = decoded.id;

      // Proceed to next middleware or route
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token verification failed",
      });
    }
  }

  // If token is missing
  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token provided",
    });
  }
};
