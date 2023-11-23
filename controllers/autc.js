import User from "../models/user.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const JWT = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT);

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
