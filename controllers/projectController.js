import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllProjects = async (req, res) => {
  const projects = await Project.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ projects: projects });
};

export const createProject = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const project = await Project.create(req.body);
  res.status(StatusCodes.CREATED).json({ project });
};

export const getSingleProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);
  //  if (!project) {
  //     throw new NotFoundError(`no project found with id ${id}`);
  //   } - ЦЕ ВСЕ В ВАЛІДЕЙШН ЛЕЄР
  res.status(StatusCodes.OK).json({ project });
};

export const updateProject = async (req, res) => {
  const { id } = req.params;

  const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  // if (!updatedProject) {
  //   throw new NotFoundError(`no project found with id ${id}`);
  // }

  res
    .status(StatusCodes.OK)
    .json({ msg: "project modified", project: updatedProject });
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  const removedProject = await Project.findByIdAndDelete(id);
  // if (!removedProject) {
  //   throw new NotFoundError(`no project found with id ${id}`);
  // }

  res
    .status(StatusCodes.OK)
    .json({ msg: "project deleted", project: removedProject });
};
