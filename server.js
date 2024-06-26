import "express-async-errors"; //handle async error without обвивати їх навколо try catch
import * as dotenv from "dotenv"; //глобальні variables
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan"; //status code in console
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

//routers
import projectRouter from "./routes/projectRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(cookieParser());
app.use(express.json());

app.post("/", (req, res) => {
  res.json({ message: "data received", data: req.body });
  console.log(req.body);
});
app.get("/api/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/projects", authenticateUser, projectRouter); //protect all project routes
app.use("/api/users", authenticateUser, userRouter); //protect all user routes
app.use("/api/auth", authRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5100;

//connecting to database
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log("server running on port", port);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
