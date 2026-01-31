import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { auth } from "./utils/auth.js";
import {toNodeHandler } from "better-auth/node";
import cors from "cors";
import { connectDB } from "./utils/db.js";
const port = process.env.PORT || 3000;
const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

connectDB().then(() => {
  app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`)
  })
}).catch((error: any) => {
  console.error('Failed to start server due to database connection error:', error);
  process.exit(1);
});