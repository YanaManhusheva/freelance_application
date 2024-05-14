import Customer from "../models/CustomerModel.js";
import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import day from "dayjs";

export class ProjectController {
  async getAllProjects(req, res) {
    const { search, projectStatus, sort } = req.query;

    const queryObject = {
      createdBy: req.user.userId,
    };
    if (search) {
      queryObject.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (projectStatus && projectStatus !== "all") {
      queryObject.projectStatus = projectStatus;
    }

    const sortOptions = {
      newest: "-createdAt", //descending
      oldest: "createdAt",
      "a-z": "title",
      "z-a": "-title",
      "coming deadline": "deadline",
    };
    const sortKey = sortOptions[sort] || sortOptions.newest;

    //pagination

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projects = await Project.find(queryObject)
      .sort(sortKey)
      .skip(skip)
      .limit(limit);

    const totalProjects = await Project.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalProjects / limit);
    res.status(StatusCodes.OK).json({
      totalProjects,
      numOfPages,
      currentPage: page,
      projects: projects,
    });
  }

  async createProject(req, res) {
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
  }

  async getSingleProject(req, res) {
    const { id } = req.params;

    const project = await Project.findById(id);
    const customer = await Customer.findById(project.customer);
    console.log(customer);

    //  if (!project) {
    //     throw new NotFoundError(`no project found with id ${id}`);
    //   } - ЦЕ ВСЕ В ВАЛІДЕЙШН ЛЕЄР
    res.status(StatusCodes.OK).json({ project, customer });
  }

  async updateProject(req, res) {
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
  }

  async deleteProject(req, res) {
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
  }
}
