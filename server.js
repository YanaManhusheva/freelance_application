import "express-async-errors"; //handle async error without обвивати їх навколо try catch
import * as dotenv from "dotenv"; //глобальні variables
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan"; //status code in console
import mongoose from "mongoose";

//routers
import projectRouter from "./routes/projectRouter.js";
import authRouter from "./routes/authRouter.js";
//

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.post("/", (req, res) => {
  res.json({ message: "data received", data: req.body });
  console.log(req.body);
});

app.use("/api/projects", projectRouter);
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
