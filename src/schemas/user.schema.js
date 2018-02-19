import mongoose from "mongoose";
import uuid from "uuid";
import validator from "validator";
import * as constants from "../lib/constants";

const User = new mongoose.Schema({
  _id: { type: String, default: uuid.v1 },
  email: {
    type: String,
    validate: {
      validator: v => validator.isEmail(v)
    },
    message: "{VALUE} is not a valid email",
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  followers: {
    type: Array
  },
  following: {
    type: Array
  },
  userType: {
    type: String,
    required: true,
    enum: [constants.GURU, constants.USER],
    default: constants.USER
  }
});

export default User;
