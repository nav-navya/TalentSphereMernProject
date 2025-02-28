
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    // console.log("Authorization Header:", authHeader); // Debug

    if (!authHeader) {
      console.log("No Token Found!");
      return res.status(401).json({ message: "Access Denied" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    console.log("Extracted Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT Error:", error.message); // Debugging line
    res.status(401).json({ message: "Invalid Token" });
  }
};
