import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: {
    type: Number,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  role: {
    type: String,
    require: true,
    unique: false,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  prefix: {
    type: String,
    require: true,
    unique: false,
  },
  name: {
    type: String,
    require: true,
    unique: false,
  },
  surname: {
    type: String,
    require: true,
    unique: false,
  },
  school: {
    type: String,
    require: false,
    unique: false,
  },
  classlvl: {
    type: String,
    require: false,
    unique: false,
  },
  platform: {
    type: [String],
    require: false,
    unique: false,
  },
  purpose: {
    type: [String],
    require: false,
    unique: false,
  },
  register: {
    type: Boolean,
    require: false,
    unique: false,
    default: false,
  },
  gate: {
    type: String,
    require: false,
    unique: false,
    default: "",
  },
  gems: {
    type: String,
    require: false,
    unique: false,
    default: "",
  },
  gem_desc: {
    type: String,
    require: false,
    unique: false,
    default: "",
  },
  estamp: {
    type: Number,
    require: false,
    unique: false,
    default: 0,
  },
  verifyestamp: {
    type: [String],
    require: false,
    unique: false,
    default: [],
  },
  isstaff: {
    type: Boolean,
    require: false,
    unique: false,
    default: false,
  },
  staff: {
    type: Object,
    require: false,
    unique: false,
    default: {
      organizationName: "",
      tag: "",
    },
  },
});

const userModel = model("user", userSchema);
export default userModel;
