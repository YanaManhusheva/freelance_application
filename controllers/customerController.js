import Customer from "../models/CustomerModel.js";
import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllCustomers = async (req, res) => {
  const projects = await Project.find({ createdBy: req.user.userId });
  const customerIds = projects.map((project) => project.customer);
  const uniqueCustomerIds = [...new Set(customerIds)];
  const customers = await Customer.find({ _id: { $in: uniqueCustomerIds } });
  res.status(StatusCodes.OK).json({ customers });
};
