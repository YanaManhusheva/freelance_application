import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router();
const userController = new UserController();

router.get("/current-user", userController.getCurrentUser);
router.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdateUserInput,
  userController.updateUser
);

export default router;
