import { Schema, model } from "mongoose";

const clubsSchema = new Schema({
  id: {
    type: Number,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
    unique: false,
  },
  status: {
    type: String,
    default: "ยังไม่มีการแก้ไข",
    require: true,
    unique: false,
  },
  members: {
    type: Number,
    default: 0,
    require: true,
    unique: false,
  },
  ig: {
    type: String,
    default: "-",
    require: true,
    unique: false,
  },
  facebook: {
    type: String,
    default: "-",
    require: true,
    unique: false,
  },
  others: {
    type: String,
    default: "-",
    require: true,
    unique: false,
  },
  clubsactivity: {
    type: String,
    default: "",
    require: true,
    unique: false,
  },
  benefits: {
    type: String,
    default: "",
    require: false,
    unique: false,
  },
  workings: {
    type: String,
    default: "",
    require: false,
    unique: false,
  },
  counts: {
    type: Number,
    default: 3,
    require: false,
    unique: false,
  },
  review_1: {
    type: Object,
    require: false,
    unique: false,
  },
  review_2: {
    type: Object,
    require: false,
    unique: false,
  },
  review_3: {
    type: Object,
    require: false,
    unique: false,
  },
});

const clubsModel = model("Clubs", clubsSchema);
export default clubsModel;
