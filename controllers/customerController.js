import Customer from "../models/CustomerModel.js";
import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";

export class CustomerController {
  async getAllCustomers(req, res) {
    const projects = await Project.find({ createdBy: req.user.userId });
    const customerIds = projects.map((project) => project.customer);
    const uniqueCustomerIds = [...new Set(customerIds)];
    const customers = await Customer.find({ _id: { $in: uniqueCustomerIds } });
    console.log(customers);
    res.status(StatusCodes.OK).json({ customers });
  }

  async getSingleCustomers(req, res) {
    const { customerId } = req.params;
    const customer = await Customer.findById(customerId);
    res.status(StatusCodes.OK).json({ customer });
  }

  async getCustomerProjects(req, res) {
    const { customerId } = req.params;
    const projects = await Project.find({
      createdBy: req.user.userId,
      customer: customerId,
    });

    res.status(StatusCodes.OK).json({ projects });
  }

  async updateCustomer(req, res) {
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
  }

  async deleteCustomer(req, res) {
    const { customerId } = req.params;

    const removedCustomer = await Customer.findByIdAndDelete(customerId);
    await Project.deleteMany({ customer: customerId });

    res
      .status(StatusCodes.OK)
      .json({ msg: "customer and related projects deleted" });
  }
}
