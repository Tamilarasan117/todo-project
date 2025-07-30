import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./configs/dbConnection.js";
import { authRouter } from "./routes/auth.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  connectDatabase();
  console.log(`Backend server running at http://localhost:${PORT}`);
});
