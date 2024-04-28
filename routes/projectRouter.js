import { Router } from "express";
const router = Router();

import {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import {
  getAllPayslips,
  getSinglePayslip,
  createPayslip,
  updatePayslip,
  deletePayslip,
} from "../controllers/payslipController.js";

import {
  validateProjectInput,
  validateTaskInput,
  validatePayslipInput,
  validateIdParam,
  validateProjectTaskParam,
  validateProjectPayslipParam,
} from "../middleware/validationMiddleware.js";
//router.get("/", getAllProjects);

router.route("/").get(getAllProjects).post(validateProjectInput, createProject);
router
  .route("/:id")
  .get(validateIdParam, getSingleProject)
  .patch(validateIdParam, validateProjectInput, updateProject)
  .delete(validateIdParam, deleteProject);
//tasks route
router
  .route("/:id/tasks")
  .get(validateIdParam, getAllTasks)
  .post(validateIdParam, validateTaskInput, createTask);
router
  .route("/:projectId/tasks/:taskId")
  .get(validateProjectTaskParam, getSingleTask)
  .patch(validateProjectTaskParam, validateTaskInput, updateTask)
  .delete(validateProjectTaskParam, deleteTask);
//payslips
router
  .route("/:id/payslips")
  .get(validateIdParam, getAllPayslips)
  .post(validateIdParam, validatePayslipInput, createPayslip);

router
  .route("/:projectId/payslips/:payslipId")
  .get(validateProjectPayslipParam, getSinglePayslip)
  .patch(validateProjectPayslipParam, validatePayslipInput, updatePayslip)
  .delete(validateProjectPayslipParam, deletePayslip);
export default router;
