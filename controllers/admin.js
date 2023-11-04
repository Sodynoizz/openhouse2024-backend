import lessonplanModel from "../models/lessonplanModel.js";
import clubsModel from "../models/clubsModel.js";
import giftedModel from "../models/giftedModel.js";
import organizationModel from "../models/organizationModel.js";
import { CheckEnvironmentKey, sendResponse } from "../utils/util.js";

export const Approve = async (req, res) => {
  const { email, type, name, environmentKey } = req.body;

  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  if (
    email === "" ||
    !process.env.ADMIN_EMAIL ||
    !process.env.ADMIN_EMAIL.includes(email)
  )
    return sendResponse(res, 403, "Forbidden");

  try {
    if (type === "ชมรม") {
      const lesson = await clubsModel.findOne({ name: name });
      lesson.status = "ผ่านการตรวจสอบ";
      await lesson.save();
    } else if (type === "สายการเรียน") {
      const clubs = await lessonplanModel.findOne({ name: name });
      clubs.status = "ผ่านการตรวจสอบ";
      await clubs.save();
    } else if (type === "โครงการพัฒนาความสามารถ") {
      const gifted = await giftedModel.findOne({ name: name });
      gifted.status = "ผ่านการตรวจสอบ";
      await gifted.save();
    } else {
      const organization = await organizationModel.findOne({ name: name });
      organization.status = "ผ่านการตรวจสอบ";
      await organization.save();
    }
    return sendResponse(res, 200, "Approved Succesfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const Decline = async (req, res) => {
  const { email, name, type, environmentKey } = req.body;
   if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  if (
    email === "" ||
    !process.env.ADMIN_EMAIL ||
    !process.env.ADMIN_EMAIL.includes(email)
  )
    return sendResponse(res, 403, "Forbidden");

  try {
    if (type === "ชมรม") {
      const lesson = await clubsModel.findOne({ name: name });
      lesson.status = "ไม่ผ่านการตรวจสอบ";
      await lesson.save();
    } else if (type === "สายการเรียน") {
      const clubs = await lessonplanModel.findOne({ name: name });
      clubs.status = "ไม่ผ่านการตรวจสอบ";
      await clubs.save();
    } else if (type === "โครงการพัฒนาความสามารถ") {
      const gifted = await giftedModel.findOne({ name: name });
      gifted.status = "ไม่ผ่านการตรวจสอบ";
      await gifted.save();
    } else {
      const organization = await organizationModel.findOne({ name: name });
      organization.status = "ไม่ผ่านการตรวจสอบ";
      await organization.save();
    }
    return sendResponse(res, 200, "Declined Successfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const PendingLists = async (req, res) => {
  const { type, email, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  if (
    email === "" ||
    !process.env.ADMIN_EMAIL ||
    !process.env.ADMIN_EMAIL.includes(email)
  )
    return sendResponse(res, 403, "Forbidden");

  try {
    const clubs = await clubsModel.find({ status: "อยู่ระหว่างการตรวจสอบ" });
    const lessons = await lessonplanModel.find({
      status: "อยู่ระหว่างการตรวจสอบ",
    });
    const gifted = await giftedModel.find({
      status: "อยู่ระหว่างการตรวจสอบ",
    });
    const organization = await organizationModel.find({
      status: "อยู่ระหว่างการตรวจสอบ",
    });

    return sendResponse(res, 200, [
      ...clubs,
      ...lessons,
      ...gifted,
      ...organization,
    ]);
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};