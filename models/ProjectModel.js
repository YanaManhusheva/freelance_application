import mongoose from "mongoose";
import { STATUS } from "../utils/constants.js";
const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    projectStatus: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.TODO,
    },
    deadline: Date,
    budget: Number,
    sphere: String,
    payslips: [
      {
        date: Date,
        amount: Number,
      },
    ],
    tasks: [
      {
        title: String,
        description: String,
        taskStatus: {
          type: String,
          enum: Object.values(STATUS),
          default: STATUS.TODO,
        },
        deadline: Date,
      },
    ],
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
