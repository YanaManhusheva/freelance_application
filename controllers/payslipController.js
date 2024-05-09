import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export class PayslipController {
  async getAllPayslips(req, res) {
    const { id } = req.params;
    const project = await Project.findById(id);

    const payslips = project.payslips;
    if (!payslips || payslips.length <= 0)
      throw new NotFoundError(`no payslips for these project`);

    res.status(StatusCodes.OK).json({ payslips });
  }
  async getSinglePayslip(req, res) {
    const { projectId, payslipId } = req.params;
    const project = await Project.findById(projectId);
    const payslips = project.payslips;
    const payslip = payslips.find(
      (payslip) => payslip._id.toString() === payslipId
    );
    if (!payslip) {
      throw new NotFoundError(`no payslip found with id ${payslipId}`);
    }
    res.status(StatusCodes.OK).json({ payslip });
  }

  async createPayslip(req, res) {
    console.log(req.body);
    const { id } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        $push: { payslips: req.body },
      },
      { new: true }
    );

    res.status(StatusCodes.CREATED).json({ updatedProject });
  }
  async updatePayslip(req, res) {
    const { projectId, payslipId } = req.params;
    const project = await Project.findById(projectId);
    const payslipIndex = project.payslips.findIndex(
      (payslip) => payslip._id.toString() === payslipId
    );
    const updateOptions = {};
    for (const [key, value] of Object.entries(req.body)) {
      updateOptions[`payslips.${payslipIndex}.${key}`] = value;
    }
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $set: updateOptions,
      },
      { new: true }
    );
    res
      .status(StatusCodes.OK)
      .json({ msg: "project modified", project: updatedProject });
  }

  async deletePayslip(req, res) {
    const { projectId, payslipId } = req.params;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $pull: { payslips: { _id: payslipId } },
      },
      { new: true }
    );

    res
      .status(StatusCodes.OK)
      .json({ msg: "payslip deleted", project: updatedProject });
  }
}
