import bcrypt from "bcryptjs";

import { User } from "../model/user.model.js";
import { createAccessToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userFond = await User.findOne({ email });
  if (userFond) return res.status(400).json({ message: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);

  // save user to database
  const newUser = new User({ name, email, password: passwordHash });

  const savedUser = await newUser.save();

  const token = await createAccessToken({ id: savedUser._id });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({
    id: savedUser._id,
    username: savedUser.username,
    email: savedUser.email,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = await createAccessToken({ id: user._id });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({
    id: user._id,
    username: user.username,
    email: user.email,
  });
};
