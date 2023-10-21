import clubsModel from "../models/clubsModel.js";
import lessonplanModel from "../models/lessonplanModel.js";
import rolesModel from "../models/rolesModel.js";
import { sendResponse } from "../utils/util.js";

export const Record = async (req, res) => {
  const { email, tag, name } = req.body;
  try {
    const recordData = {
      email: email,
      tag: tag,
      name: name,
    };
    await rolesModel.create(recordData);
    return sendResponse(res, 200, "Recorded successfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 400, err.message);
  }
};

export const Info = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await rolesModel.findOne({ email: email });
    if (user.tag === "สายการเรียน") {
      const lesson  = await lessonplanModel.findOne({ name: user.name });
      return sendResponse(res, 200, lesson);
    } else {
      const club = await clubsModel.findOne({ name: user.name });
      return sendResponse(res, 200, club);
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
}