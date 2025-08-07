import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateTokens = (response, userData) => {
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

  response.cookie("accessToken", accessToken, {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });

  response.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  })

  return { accessToken, refreshToken };
};

export default generateTokens;
