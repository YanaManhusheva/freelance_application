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
  validateProjectInput,
  validateTaskInput,
  validateIdParam,
  validateProjectTaskParam,
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
export default router;
