import "express-async-errors"; //handle async error without обвивати їх навколо try catch
import * as dotenv from "dotenv"; //глобальні variables
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan"; //status code in console
import mongoose from "mongoose";

//routers
import projectRouter from "./routes/projectRouter.js";
//
import Project from "./models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "./errors/customErrors.js";

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

//get all tasks
app.get("/api/projects/:id/tasks", async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    throw new NotFoundError(`no project found with id ${id}`);
  }
  //const task = await Project.findOne({ tasks: { $elemMatch: { _id: id } } });
  const tasks = project.tasks;
  if (!tasks || tasks.length <= 0) {
    throw new NotFoundError(`no tasks for these project`);
  } else {
    res.status(StatusCodes.OK).json({ tasks: tasks });
  }
});
//get a single task
app.get("/api/projects/:projectId/tasks/:taskId", async (req, res) => {
  const { projectId, taskId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) {
    throw new NotFoundError(`no project found with id ${id}`);
  }
  const tasks = project.tasks;
  if (!tasks || tasks.length <= 0) {
    throw new NotFoundError(`no tasks for these project`);
  }

  const task = tasks.find((task) => task._id.toString() === taskId);
  if (!task) {
    throw new NotFoundError(`no task found with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
});
//update a single task
app.get("/api/projects/:projectId/tasks/:taskId", async (req, res) => {
  const { projectId, taskId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) {
    throw new NotFoundError(`no project found with id ${id}`);
  }
  const tasks = project.tasks;
  if (!tasks || tasks.length <= 0) {
    throw new NotFoundError(`no tasks for these project`);
  }

  const task = tasks.find((task) => task._id.toString() === taskId);
  if (!task) {
    throw new NotFoundError(`no task found with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
});

app.use("/api/projects", projectRouter);

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
