import Customer from "../models/CustomerModel.js";
import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllCustomers = async (req, res) => {
  const projects = await Project.find({ createdBy: req.user.userId });
  const customerIds = projects.map((project) => project.customer);
  const uniqueCustomerIds = [...new Set(customerIds)];
  const customers = await Customer.find({ _id: { $in: uniqueCustomerIds } });
  console.log(customers);
  res.status(StatusCodes.OK).json({ customers });
};
export const getSingleCustomers = async (req, res) => {
  const { customerId } = req.params;
  const customer = await Customer.findById(customerId);
  res.status(StatusCodes.OK).json({ customer });
};

export const updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  const updatedCustomer = await Customer.findByIdAndUpdate(
    customerId,
    req.body,
    { new: true }
  );
  const projectUpdates = {};
  if (updatedCustomer.name) {
    projectUpdates.customerName = updatedCustomer.name;
  }
  if (updatedCustomer.lastName) {
    projectUpdates.customerLastName = updatedCustomer.lastName;
  }
  if (updatedCustomer.note) {
    projectUpdates.customerNote = updatedCustomer.note;
  }
  if (Object.keys(projectUpdates).length > 0) {
    await Project.updateMany(
      { customer: customerId },
      { $set: projectUpdates }
    );
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "customer modified", customer: updatedCustomer });
};
export const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;

  const removedCustomer = await Customer.findByIdAndDelete(customerId);
  await Project.deleteMany({ customer: customerId });

  res
    .status(StatusCodes.OK)
    .json({ msg: "customer and related projects deleted" });
};
