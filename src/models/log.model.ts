import { Schema, model } from "mongoose";

const logSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

export const LogModel = model("Log", logSchema);
