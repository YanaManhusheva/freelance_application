import { Router } from "express";
import { CustomerController } from "../controllers/customerController.js";
import { PayslipController } from "../controllers/payslipController.js";
import { TaskController } from "../controllers/taskController.js";
import { ProjectController } from "../controllers/projectController.js";
import { StatsController } from "../controllers/statsController.js";
const router = Router();

const customerController = new CustomerController();
const payslipController = new PayslipController();
const taskController = new TaskController();
const projectController = new ProjectController();
const statsController = new StatsController();

import {
  validateProjectInput,
  validateTaskInput,
  validatePayslipInput,
  validateIdParam,
  validateProjectTaskParam,
  validateProjectPayslipParam,
  validateCustomerInput,
  validateCustomerParam,
} from "../middleware/validationMiddleware.js";

router
  .route("/")
  .get(projectController.getAllProjects)
  .post(validateProjectInput, projectController.createProject);
router.route("/customers").get(customerController.getAllCustomers);

router.route("/stats").get(statsController.showStats);

router
  .route("/:id")
  .get(validateIdParam, projectController.getSingleProject)
  .patch(validateIdParam, validateProjectInput, projectController.updateProject)
  .delete(validateIdParam, projectController.deleteProject);

//customers

router
  .route("/customers/:customerId")
  .get(validateCustomerParam, customerController.getSingleCustomers)
  .patch(
    validateCustomerParam,
    validateCustomerInput,
    customerController.updateCustomer
  )
  .delete(validateCustomerParam, customerController.deleteCustomer);

router
  .route("/customers/:customerId/details")
  .get(validateCustomerParam, customerController.getCustomerProjects);

//tasks route
router
  .route("/:id/tasks")
  .get(validateIdParam, taskController.getAllTasks)
  .post(validateIdParam, validateTaskInput, taskController.createTask);
router
  .route("/:id/taskTags")
  .get(validateIdParam, taskController.getAllTasksTags);
router
  .route("/:projectId/tasks/:taskId")
  .get(validateProjectTaskParam, taskController.getSingleTask)
  .patch(validateProjectTaskParam, validateTaskInput, taskController.updateTask)
  .delete(validateProjectTaskParam, taskController.deleteTask);
//payslips
router
  .route("/:id/payslips")
  .get(validateIdParam, payslipController.getAllPayslips)
  .post(validateIdParam, validatePayslipInput, payslipController.createPayslip);

router
  .route("/:projectId/payslips/:payslipId")
  .get(validateProjectPayslipParam, payslipController.getSinglePayslip)
  .patch(
    validateProjectPayslipParam,
    validatePayslipInput,
    payslipController.updatePayslip
  )
  .delete(validateProjectPayslipParam, payslipController.deletePayslip);

export default router;
