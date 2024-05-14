import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

import upload from "../middleware/multerMiddleware.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export class UserController {
  async getCurrentUser(req, res) {
    const user = await User.findOne({ _id: req.user.userId });
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  }
  async updateUser(req, res) {
    const newUser = { ...req.body };
    delete newUser.password;

    if (req.file) {
      const response = await cloudinary.v2.uploader.upload(req.file.path);
      await fs.unlink(req.file.path); //remove file image
      newUser.avatar = response.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
    res.status(StatusCodes.OK).json({ msg: "updated user" });
  }
}
