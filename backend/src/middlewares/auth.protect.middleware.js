import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authProtect = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({ message: "Unauthorized: No token provided or invalid format", type: "ERROR" });
    };

    let accessToken = null;
    if (authHeader !== undefined) {
      accessToken = authHeader.split(' ')[1];
    };
    
    if (!accessToken) {
      return response.status(401).json({ message: "Unauthorized: No token provided or invalid format", type: "ERROR" });
    };

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );

    request.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Unauthorized: ", error.message);
    if (error instanceof jwt.TokenExpiredError) {
      return response.status(401).json({ message: "Unauthorized: Access token expired.", type: "ERROR" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return response.status(401).json({ message: "Unauthorized: Invalid access token.", type: "ERROR" });
    } else {
      return response.status(500).json({ message: "Something went wrong during token verification.", type: "ERROR" });
    }
  }
};
