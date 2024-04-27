import { Router } from "express";
const router = Router();

import {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

//router.get("/", getAllProjects);

router.route("/").get(getAllProjects).post(createProject);
router
  .route("/:id")
  .get(getSingleProject)
  .patch(updateProject)
  .delete(deleteProject);
export default router;
