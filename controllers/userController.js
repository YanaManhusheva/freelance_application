import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Project from "../models/ProjectModel.js";
import { STATUS } from "../utils/constants.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
export const getStats = async (req, res) => {
  const myProjects = await Project.find({
    createdBy: req.user.userId,
  }).countDocuments();

  const doneProjects = await Project.find({
    createdBy: req.user.userId,
    projectStatus: STATUS.DONE,
  }).countDocuments();

  const toDoProjects = await Project.find({
    createdBy: req.user.userId,
    projectStatus: STATUS.TODO,
  }).countDocuments();

  const inpProgressProjects = await Project.find({
    createdBy: req.user.userId,
    projectStatus: STATUS.IN_PROGRESS,
  }).countDocuments();

  //статистика по доне туду ін прогрес
  res.status(StatusCodes.OK).json({
    myProjects,
    doneProjects,
    toDoProjects,
    inpProgressProjects,
  });
};
export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: "updated user" });
};
