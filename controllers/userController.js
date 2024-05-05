import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Project from "../models/ProjectModel.js";
import { STATUS } from "../utils/constants.js";
import upload from "../middleware/multerMiddleware.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

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

  const inProgressProjects = await Project.find({
    createdBy: req.user.userId,
    projectStatus: STATUS.IN_PROGRESS,
  }).countDocuments();

  //статистика по доне туду ін прогрес
  res.status(StatusCodes.OK).json({
    myProjects,
    doneProjects,
    toDoProjects,
    inProgressProjects,
  });
};
export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path); //remove file image
    newUser.avatar = response.secure_url;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
  res.status(StatusCodes.OK).json({ msg: "updated user" });
};
