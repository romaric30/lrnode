import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "node:fs";
import http2 from "node:http2";

import User from "./models/User";
import ConnectDB from "./config/db";
import router from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to the database
ConnectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

const port = process.env.PORT || 5000;

// Routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Testing more and more");
});

// app.get("/login", async (req: Request, res: Response, next: NextFunction) => {
//   const email = "romaric"; // Replace with dynamic email from request body or query
//   let existingUser;

//   try {
//     existingUser = await User.findOne({ email: email });
//   } catch (error: any) {
//     console.error("Error finding user:", error.message);
//     return next(error);
//   }

//   if (!existingUser) {
//     console.log("Wrong details");
//     return res.status(404).json({ success: false, message: "User not found" });
//   }

//   let token;

//   try {
//     token = jwt.sign(
//       { userId: existingUser._id, email: existingUser.email },
//       "serecedfjhjhbjhd", // Replace with a secure secret key from environment variables
//       { expiresIn: "2h" }
//     );
//   } catch (error: any) {
//     console.error("Error generating token:", error.message);
//     return next(error);
//   }

//   res.status(200).json({
//     success: true,
//     data: {
//       userId: existingUser._id,
//       email: existingUser.email,
//       token: token,
//     },
//   });
// });

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  console.log("HTTP/2 Request Received:", req.url);
  res.status(500).json({ success: false, message: "Something broke!" });
});

// SSL/TLS options for HTTP/2
const options = {
  key: fs.readFileSync("server.key"),

  cert: fs.readFileSync("server.cert"),
};

// Create HTTP/2 secure server
const server = http2.createSecureServer(options, (req, res) => {
    console.log("HTTP/2 Request Received:", req.url);
  app(req as any, res as any);
});

// Start the server
server.listen(port, () => {
  console.log(`Secure server running on port ${port}`);
});

// Optional: Fallback to HTTP/1.1 for debugging
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });