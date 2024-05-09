import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export class AuthController {
  async register(req, res) {
    //hashing password
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "user created" });
  }
  async login(req, res) {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) throw new UnauthenticatedError("invalid credentials");
    const isPasswordCorrect = await comparePassword(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      throw new UnauthenticatedError("invalid credentials");

    const token = createJWT({ userId: user._id });
    const oneDay = 1000 * 60 * 60 * 24; // 1 day in milliseconds
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay), //accept only milliseconds,
      secure: process.env.NODE_ENVIRONMENT === "production",
    });

    console.log(token);
    res.status(StatusCodes.OK).json({ msg: "user logged in" });
  }

  logout(req, res) {
    res.cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out!" });
  }
}
