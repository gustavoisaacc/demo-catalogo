import express from "express";
import mongoose from "mongoose";
import { MONGODB } from "./config.js";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(MONGODB);
    console.log(
      `mongoDB: ${connect.connection.name} - ${connect.connection.port}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
