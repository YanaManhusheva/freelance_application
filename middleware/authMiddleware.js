import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication failed");
  try {
    const { userId } = verifyJWT(token);
    req.user = { userId }; //new property on request will be attached to all routes after authMiddleware
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication failed");
  }
};
