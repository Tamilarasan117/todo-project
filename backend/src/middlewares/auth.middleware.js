import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authProtect = (request, response, next) => {
  try {
    const { accessToken } = request.cookies;
    if (!accessToken) {
      return response
        .status(401)
        .json({ message: "Unauthorized: No token provided", type: "error" });
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );

    request.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Unauthorized: ", error.message);
    if (error instanceof jwt.TokenExpiredError) {
      return response.status(401).json({
        message: "Unauthorized: Access token expired.",
        type: "error",
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return response.status(401).json({
        message: "Unauthorized: Invalid access token.",
        type: "error",
      });
    } else {
      return response.status(500).json({
        message: "Something went wrong during token verification.",
        type: "error",
      });
    }
  }
};
