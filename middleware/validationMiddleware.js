//why? because layer is reusable,easier to catch errors before the request even get to the controller. чим більше коду в контролері тим складніше його maintain
import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { STATUS } from "../utils/constants.js";
import Project from "../models/ProjectModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no project")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};
export const validateProjectInput = withValidationErrors([
  body("title").notEmpty().withMessage("title is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("deadline").notEmpty().withMessage("deadline is required"),
  body("budget").notEmpty().withMessage("budget is required"),
  body("sphere").notEmpty().withMessage("sphere is required"),
  body("projectStatus")
    .isIn(Object.values(STATUS))
    .withMessage("invalid status value"),
]);
export const validateTaskInput = withValidationErrors([
  body("title").notEmpty().withMessage("title is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("deadline").notEmpty().withMessage("deadline is required"),
  body("taskStatus")
    .isIn(Object.values(STATUS))
    .withMessage("invalid status value"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid mongodb id");
    const project = await Project.findById(value);
    if (!project) {
      throw new NotFoundError(`no project found with id ${value}`);
    }
  }),
]);

export const validateProjectTaskParam = withValidationErrors([
  param("projectId").custom(async (value, { req }) => {
    console.log(value);
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    console.log(value);
    if (!isValidId) throw new BadRequestError("invalid mongodb id");
    const project = await Project.findById(value);
    req.project = project;
    if (!project) {
      throw new NotFoundError(`no project found with id ${value}`);
    }
  }),
  param("taskId").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid mongodb id");
    //validate task
    const { project } = req;
    if (!project) {
      throw new NotFoundError(`no project found with id`);
    }
    const tasks = project.tasks;
    if (!tasks || tasks.length <= 0) {
      throw new NotFoundError(`no tasks for these project`);
    }
    const taskIndex = project.tasks.findIndex(
      (task) => task._id.toString() === value
    );
    if (taskIndex === -1) {
      throw new NotFoundError(`no task found with id ${value}`);
    }
  }),
]);
