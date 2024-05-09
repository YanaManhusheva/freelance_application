import { Router } from "express";
import { AuthController } from "../controllers/authController.js";

import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

const authController = new AuthController();

router.post("/register", validateRegisterInput, authController.register);
router.post("/login", validateLoginInput, authController.login);
router.get("/logout", authController.logout);

export default router;
