import Customer from "../models/CustomerModel.js";
import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import day from "dayjs";
import dayjs from "dayjs";

export const getAllProjects = async (req, res) => {
  const projects = await Project.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ projects: projects });
};

export const createProject = async (req, res) => {
  console.log(req.body);

  req.body.createdBy = req.user.userId;

  let customer;
  if (req.body.customerName) {
    const newCustomerData = {
      name: req.body.customerName,
      lastName: req.body.customerLastName,
      note: req.body.customerNote,
    };
    customer = await Customer.create(newCustomerData);
  } else {
    customer = await Customer.findById(req.body.customerId);
  }
  if (!req.body.customerName && !req.body.customerId) {
    throw new BadRequestError(`Customer must be provided`);
  }
  console.log(customer);

  req.body.customer = customer._id;

  const project = await Project.create(req.body);

  customer.projects.push(project._id);
  await customer.save();

  res.status(StatusCodes.CREATED).json({ project });
};

export const getSingleProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);
  const customer = await Customer.findById(project.customer);
  console.log(customer);

  //  if (!project) {
  //     throw new NotFoundError(`no project found with id ${id}`);
  //   } - ЦЕ ВСЕ В ВАЛІДЕЙШН ЛЕЄР
  res.status(StatusCodes.OK).json({ project, customer });
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  const updatedCustomer = await Customer.findByIdAndUpdate(
    updatedProject.customer,
    {
      name: req.body.customerName,
      lastName: req.body.customerLastName,
      note: req.body.customerNote,
    },
    {
      new: true,
    }
  );
  console.log(updatedCustomer);
  // if (!updatedProject) {
  //   throw new NotFoundError(`no project found with id ${id}`);
  // }

  res.status(StatusCodes.OK).json({
    msg: "project modified",
    project: updatedProject,
  });
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  const removedProject = await Project.findByIdAndDelete(id);
  // if (!removedProject) {
  //   throw new NotFoundError(`no project found with id ${id}`);
  // }
  if (removedProject.customer) {
    await Customer.findByIdAndUpdate(removedProject.customer, {
      $pull: { projects: removedProject._id },
    });
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "project deleted", project: removedProject });
};

export const showStats = async (req, res) => {
  let stats = await Project.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$projectStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log(stats);
  const defaultStats = {
    todo: stats["to do"] || 0,
    inProgress: stats["in progress"] || 0,
    done: stats.done || 0,
  };

  let monthlyIncome = await Project.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $unwind: "$payslips" },
    {
      $group: {
        _id: {
          year: { $year: "$payslips.date" },
          month: { $month: "$payslips.date" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyIncome = monthlyIncome
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).json({ defaultStats, monthlyIncome });
};
