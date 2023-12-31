import { Schema, model } from "mongoose";

const organizationSchema = new Schema({
  id: {
    type: Number,
    require: true,
    unique: true,
  },
  tag: {
    type: String,
    require: false,
    unique: false,
    default: "องค์กรนักเรียน",
  },
  name: {
    type: String,
    require: true,
    unique: true,
  },
  engname: {
    type: String,
    default: "",
    require: false,
    unique: false,
  },
  status: {
    type: String,
    default: "ยังไม่มีการแก้ไข",
    require: true,
    unique: false,
  },
  members: {
    type: String,
    require: true,
    default: "0",
    unique: false,
  },
  ig: {
    type: String,
    default: "",
    require: true,
    unique: false,
  },
  facebook: {
    type: String,
    default: "",
    require: true,
    unique: false,
  },
  others: {
    type: String,
    default: "",
    require: true,
    unique: false,
  },
  organizationdo: {
    type: String,
    default: "",
    require: true,
    unique: false,
  },
  position: {
    type: String,
    default: "",
    require: true,
    unique: false,
  },
  working: {
    type: String,
    default: "",
    require: true,
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
  image1: {
    type: String,
    require: false,
    unique: false,
    default: "",
  },
  image2: {
    type: String,
    require: false,
    unique: false,
    default: "",
  },
  image3: {
    type: String,
    require: false,
    unique: false,
    default: "",
  },
  imgprofile1: {
    type: String,
    require: false,
    unique: false,
    default: "",
  },
  imgprofile2: {
    type: String,
    require: false,
    unique: false,
    default: "",
  },
  imgprofile3: {
    type: String,
    require: false,
    unique: false,
    default: "",
  },
  capturepic1: {
    type: String,
    default: "",
    require: false,
    unique: false,
  },
  capturepic2: {
    type: String,
    default: "",
    require: false,
    unique: false,
  },
  capturepic3: {
    type: String,
    default: "",
    require: false,
    unique: false,
  },
});

const organizationModel = model("Organization", organizationSchema);
export default organizationModel;