import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export class TaskController {
  async getAllTasks(req, res) {
    const { id } = req.params;
    const { tag } = req.query;

    const project = await Project.findById(id);
    const tasks = project.tasks;
    if (!tasks || tasks.length <= 0)
      throw new NotFoundError(`no tasks for these project`);

    let filteredTasks = project.tasks;
    console.log(filteredTasks);
    if (tag) {
      filteredTasks = filteredTasks.filter((task) => task.tag === tag);
    }

    if (!filteredTasks.length) {
      return res
        .status(StatusCodes.OK)
        .json({ message: "No tasks found that match the criteria." });
    }

    res.status(StatusCodes.OK).json({ tasks: filteredTasks });
  }

  async getAllTasksTags(req, res) {
    const { id } = req.params;
    const project = await Project.findById(id);

    //   if (!project) {
    //     throw new NotFoundError(`no project found with id ${id}`);
    //   }

    const tasks = project.tasks;
    if (!tasks || tasks.length <= 0)
      return res.status(StatusCodes.OK).json({ uniqueTags: [] });
    console.log(tasks);
    const uniqueTags = [
      ...new Set(tasks.map((task) => task.tag).filter((tag) => tag)),
    ];
    res.status(StatusCodes.OK).json({ uniqueTags });
  }

  async getSingleTask(req, res) {
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
  }
  async createTask(req, res) {
    const { id } = req.params;
    const taskData = { ...req.body };
    console.log(taskData);

    if (!req.body.tag || req.body.tag === "no tag") {
      delete taskData.tag;
    }
    console.log(taskData);

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        $push: { tasks: taskData },
      },
      { new: true }
    );
    //   if (!updatedProject) {
    //     throw new NotFoundError(`no project found with id ${id}`);
    //   }
    res.status(StatusCodes.CREATED).json({ updatedProject });
  }

  async updateTask(req, res) {
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
    console.log(req.body);
    console.log(req.body.tag);
    const updateOptions = {};
    for (const [key, value] of Object.entries(req.body)) {
      updateOptions[`tasks.${taskIndex}.${key}`] = value;
    }
    if (!req.body.tag || req.body.tag === "no tag") {
      updateOptions[`tasks.${taskIndex}.tag`] = null;
    }

    console.log(updateOptions);
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $set: updateOptions,
      },
      { new: true }
    );

    res
      .status(StatusCodes.OK)
      .json({ msg: "project modified", project: updatedProject });
  }

  async deleteTask(req, res) {
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
  }
}
