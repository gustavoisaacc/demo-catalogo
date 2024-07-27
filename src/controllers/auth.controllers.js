import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../model/user.model.js";
import { createAccessToken } from "../utils/jwt.js";
import { SECRET_KEY } from "../config/config.js";

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
    httpOnly: process.env.NODE_ENV !== "development",
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

  if (!user)
    return res.status(400).json({ message: "check email or passworrd" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(400).json({ message: "check email or passworrd" });

  const token = await createAccessToken({ id: user._id });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 600000), // 10 minutes
  });

  res.json({
    id: user._id,
    username: user.username,
    email: user.email,
    token: token,
  });
};

export const verifycateTokens = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.send(false);

  jwt.verify(token, SECRET_KEY, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
export const logout = (req, res) => {
  res.clearCookie("token");
  res.send("ok");
};
