import { Schema, model } from "mongoose";

const giftedSchema = new Schema({
  id: {
    type: Number,
    require: true,
    unique: true,
  },
  tag: {
    type: String,
    require: false,
    unique: false,
    default: "โครงการพัฒนาความสามารถ",
  },
  name: {
    type: String,
    require: true,
    unique: false,
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
    default: "0",
    require: true,
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
  admission: {
    type: String,
    default: "",
    require: true,
    unique: false,
  },
  subjects: {
    type: String,
    default: "",
    require: false,
    unique: false,
  },
  interests: {
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
  image1: {
    type: Object,
    require: false,
    unique: false,
  },
  image2: {
    type: Object,
    require: false,
    unique: false,
  },
  image3: {
    type: Object,
    require: false,
    unique: false,
  },
  imgprofile1: {
    type: Object,
    require: false,
    unique: false,
  },
  imgprofile2: {
    type: Object,
    require: false,
    unique: false,
  },
  imgprofile3: {
    type: Object,
    require: false,
    unique: false,
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

const giftedModel = model("Gifted", giftedSchema);
export default giftedModel;
