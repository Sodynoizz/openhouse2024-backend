import { Schema, model } from "mongoose";

const rolesSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  tag: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
    unique: true,
  },
});

const rolesModel = model("Roles", rolesSchema);
export default rolesModel;
