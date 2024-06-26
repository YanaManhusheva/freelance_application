//why? because layer is reusable,easier to catch errors before the request even get to the controller. чим більше коду в контролері тим складніше його maintain
import { body, param, validationResult } from "express-validator";
import dayjs from "dayjs";

import mongoose from "mongoose";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { STATUS } from "../utils/constants.js";
import Project from "../models/ProjectModel.js";
import Customer from "../models/CustomerModel.js";
import User from "../models/UserModel.js";

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
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError(errorMessages);
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
  body("deadline")
    .notEmpty()
    .withMessage("deadline is required")
    .custom((value) => {
      // Regular expression to check if the format is YYYY-MM-DD
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw new Error("Deadline must be a valid date in YYYY-MM-DD format");
      }

      const date = new Date(value);
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate comparison

      // Check if the date object represents a valid date
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      // Check if the date is in the future
      if (date <= now) {
        throw new Error("Deadline must be a future date");
      }

      return true;
    }),
  body("budget").notEmpty().withMessage("budget is required"),
  body("sphere").notEmpty().withMessage("sphere is required"),
  body("projectStatus")
    .isIn(Object.values(STATUS))
    .withMessage("invalid status value"),
  //customer
  // body("customerName").notEmpty().withMessage("customer name is required"),
  // body("customerLastName")
  //   .notEmpty()
  //   .withMessage("customer last name is required"),
  // body("customerNote").notEmpty().withMessage("customer note is required"),
]);
export const validateCustomerInput = withValidationErrors([
  //customer
  body("name").notEmpty().withMessage("customer name is required"),
  body("lastName").notEmpty().withMessage("customer last name is required"),
  body("note").notEmpty().withMessage("customer note is required"),
]);

export const validateTaskInput = withValidationErrors([
  body("title").notEmpty().withMessage("title is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("deadline")
    .notEmpty()
    .withMessage("deadline is required")
    .custom((value, { req }) => {
      // Regular expression to check if the format is YYYY-MM-DD
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw new Error("Deadline must be a valid date in YYYY-MM-DD format");
      }

      const taskDeadline = new Date(value);
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate comparison

      // Check if the date object represents a valid date
      if (isNaN(taskDeadline.getTime())) {
        throw new Error("Invalid date");
      }

      // Check if the date is in the future
      if (taskDeadline <= now) {
        throw new Error("Deadline must be a future date");
      }

      const projectDeadline = new Date(req.project.deadline);

      if (taskDeadline > projectDeadline) {
        throw new Error(
          "Task deadline must not be bigger than project deadline"
        );
      }

      return true;
    }),
  body("taskStatus")
    .isIn(Object.values(STATUS))
    .withMessage("invalid status value"),
  body("estimatedTime")
    .notEmpty()
    .withMessage("estimated Time is required")
    .isNumeric()
    .withMessage("estimated Time must be a number")
    .custom((value) => {
      if (value < 0) {
        throw new Error("Estimated Time cannot be negative ");
      }
      return true;
    }),
]);
export const validatePayslipInput = withValidationErrors([
  body("date")
    .notEmpty()
    .withMessage("date is required")
    .custom((value) => {
      // Regular expression to check if the format is YYYY-MM-DD
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw new Error("Deadline must be a valid date in YYYY-MM-DD format");
      }

      const date = new Date(value);
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate comparison

      // Check if the date object represents a valid date
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      // Check if the date is in th past or today
      if (date > now) {
        throw new Error("Date must be past date or today");
      }

      return true;
    }),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("Amount must be greater than zero.");
      }
      return true;
    }),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    console.log(value);
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid mongodb id");
    const project = await Project.findById(value);
    req.project = project;
    if (!project) {
      throw new NotFoundError(`no project found with id ${value}`);
    }
    const customer = await Customer.find({ _id: project.customer });
    if (!customer) {
      throw new NotFoundError(`no customer found for project with id ${value}`);
    }
    const isOwner = req.user.userId === project.createdBy.toString();
    if (!isOwner)
      throw new UnauthorizedError("not authorized to access this route");
  }),
]);

export const validateCustomerParam = withValidationErrors([
  param("customerId").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid mongodb id");
    const customer = await Customer.findById(value);
    if (!customer) {
      throw new NotFoundError(`no customer found with id ${value}`);
    }
  }),
]);

export const validateProjectTaskParam = withValidationErrors([
  param("projectId").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
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
export const validateProjectPayslipParam = withValidationErrors([
  param("projectId").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    console.log(value);
    if (!isValidId) throw new BadRequestError("invalid mongodb id");
    const project = await Project.findById(value);
    req.project = project;
    if (!project) {
      throw new NotFoundError(`no project found with id ${value}`);
    }
  }),
  param("payslipId").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid mongodb id");
    //validate payslip
    const { project } = req;
    if (!project) {
      throw new NotFoundError(`no project found with id`);
    }
    const payslips = project.payslips;
    if (!payslips || payslips.length <= 0) {
      throw new NotFoundError(`no payslips for these project`);
    }
    const payslipsIndex = project.payslips.findIndex(
      (payslip) => payslip._id.toString() === value
    );
    if (payslipsIndex === -1) {
      throw new NotFoundError(`no payslip found with id ${value}`);
    }
  }),
]);

//user
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("email already exist");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId)
        throw new BadRequestError("email already exist");
    }),
]);
