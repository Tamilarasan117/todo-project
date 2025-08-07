import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./configs/dbConnection.js";
import { authRouter } from "./routes/auth.router.js";
import { todoRouter } from "./routes/todo.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:8081", credentials: true }));
app.use("/api/", authRouter);
app.use("/api/", todoRouter);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  connectDatabase();
  console.log(`Backend server running at http://localhost:${PORT}`);
});
