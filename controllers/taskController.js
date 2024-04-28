import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllTasks = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  //   if (!project) {
  //     throw new NotFoundError(`no project found with id ${id}`);
  //   }

  const tasks = project.tasks;
  if (!tasks || tasks.length <= 0)
    throw new NotFoundError(`no tasks for these project`);

  res.status(StatusCodes.OK).json({ tasks });
};

export const getSingleTask = async (req, res) => {
  const { projectId, taskId } = req.params;
  const project = await Project.findById(projectId);
  //   if (!project) {
  //     throw new NotFoundError(`no project found with id ${id}`);
  //   }
  const tasks = project.tasks;
  //   if (!tasks || tasks.length <= 0) {
  //     throw new NotFoundError(`no tasks for these project`);
  //   }
  const task = tasks.find((task) => task._id.toString() === taskId);
  if (!task) {
    throw new NotFoundError(`no task found with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};
export const createTask = async (req, res) => {
  const { id } = req.params;
  const updatedProject = await Project.findByIdAndUpdate(
    id,
    {
      $push: { tasks: req.body },
    },
    { new: true }
  );
  //   if (!updatedProject) {
  //     throw new NotFoundError(`no project found with id ${id}`);
  //   }
  res.status(StatusCodes.CREATED).json({ updatedProject });
};

export const updateTask = async (req, res) => {
  const { projectId, taskId } = req.params;
  const project = await Project.findById(projectId);
  //   if (!project) {
  //     throw new NotFoundError(`no project found with id ${id}`);
  //   }

  // const tasks = project.tasks;
  // if (!tasks || tasks.length <= 0) {
  //   throw new NotFoundError(`no tasks for these project`);
  // }

  const taskIndex = project.tasks.findIndex(
    (task) => task._id.toString() === taskId
  );
  //   if (taskId === -1) {
  //     throw new NotFoundError(`no task found with id ${taskId}`);
  //   }

  const updateOptions = {};
  for (const [key, value] of Object.entries(req.body)) {
    updateOptions[`tasks.${taskIndex}.${key}`] = value;
  }

  console.log(updateOptions);
  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      $set: updateOptions,
    },
    { new: true }
  );
  //   if (!updatedProject) {
  //     throw new NotFoundError(`no project found with id ${id}`);
  //   }

  res
    .status(StatusCodes.OK)
    .json({ msg: "project modified", project: updatedProject });
};

export const deleteTask = async (req, res) => {
  const { projectId, taskId } = req.params;

  // const project = await Project.findById(projectId);
  // if (!project) {
  //   throw new NotFoundError(`no project found with id ${id}`);
  // }
  //   const taskIndex = project.tasks.findIndex(
  //     (task) => task._id.toString() === taskId
  //   );
  //   if (taskId === -1) {
  //     throw new NotFoundError(`no task found with id ${taskId}`);
  //   }
  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      $pull: { tasks: { _id: taskId } },
    },
    { new: true }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "task deleted", project: updatedProject });
};
