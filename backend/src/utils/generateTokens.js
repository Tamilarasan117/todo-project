import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateTokens = (userData) => {
  const accessToken = jwt.sign(
    { userId: userData.id },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { userId: userData.id },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export default generateTokens;
