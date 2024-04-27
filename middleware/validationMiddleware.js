//why? because layer is reusable,easier to catch errors before the request even get to the controller. чим більше коду в контролері тим складніше його maintain
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import { STATUS } from "../utils/constants.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array.map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};
export const validateProjectInput = withValidationErrors([
  body("title").notEmpty().withMessage("title is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("deadline").notEmpty().withMessage("deadline is required"),
  body("budget").notEmpty().withMessage("budget is required"),
  body("sphere").notEmpty().withMessage("sphere is required"),
  body("projectStatus").isIn(Object.values(S)),
]);
