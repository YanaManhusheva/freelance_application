import Customer from "../models/CustomerModel.js";
import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import day from "dayjs";

export class StatsController {
  async showStats(req, res) {
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
          totalAmount: { $sum: "$payslips.amount" },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);

    monthlyIncome = monthlyIncome
      .map((item) => {
        const {
          _id: { year, month },
          totalAmount,
          //count,
        } = item;
        const date = day()
          .month(month - 1)
          .year(year)
          .format("MMM YY");
        return { date, totalAmount };
      })
      .reverse();
    console.log(monthlyIncome);
    res.status(StatusCodes.OK).json({ defaultStats, monthlyIncome });
  }
}
