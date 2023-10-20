import lessonplanModel from "../models/lessonplanModel.js";
import clubsModel from "../models/clubsModel.js";
import { sendResponse, isAdmin } from "../utils/util.js";

export const Approve = async (req, res) => {
  const { email, type, name } = req.body;
  if (!isAdmin(email)) return sendResponse(res, 403, "Forbidden");

  try {
    if (type == "ชมรม") {
      const lesson = await clubsModel.findOne({ name: name });
      lesson.status = "ผ่านการตรวจสอบ";
      await lesson.save();
    } else if (type == "สายการเรียน") {
      const clubs = await lessonplanModel.findOne({ name: name });
      clubs.status = "ผ่านการตรวจสอบ";
      await clubs.save();
    }
    return sendResponse(res, 200, "Approved Succesfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const Decline = async (req, res) => {
  const { name, type } = req.body;
  if (!isAdmin(email)) return sendResponse(res, 403, "Forbidden");

  try {
    if (type == "clubs") {
      const lesson = await clubsModel.findOne({ name: name });
      lesson.status = "ไม่ผ่านการตรวจสอบ";
      await lesson.save();
    } else if (type == "lessons") {
      const clubs = await lessonplanModel.findOne({ name: name });
      clubs.status = "ไม่ผ่านการตรวจสอบ";
      await clubs.save();
    } else {
      return sendResponse(res, 404, "Not found");
    }
    return sendResponse(res, 200, "Approved Succesfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const PendingLists = async (req, res) => {
  const { email } = req.body;
  if (!isAdmin(email)) return sendResponse(res, 403, "Forbidden");

  try {
    const clubs = await clubsModel.find({ status: "อยู่ระหว่างการตรวจสอบ " });
    const lessons = await lessonplanModel.find({
      status: "อยู่ระหว่างการตรวจสอบ",
    });
    return sendResponse(res, 200, [...clubs, ...lessons]);
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};
