import clubsModel from "../models/clubsModel.js";
import lessonplanModel from "../models/lessonplanModel.js";
import rolesModel from "../models/rolesModel.js";
import giftedModel from "../models/giftedModel.js";
import organizationModel from "../models/organizationModel.js";
import { sendResponse, CheckEnvironmentKey } from "../utils/util.js";

export const Record = async (req, res) => {
  const { email, tag, name, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

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
  const { email, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }
  
  try {
    const user = await rolesModel.findOne({ email: email });
    if (user.tag === "สายการเรียน") {
      const lesson = await lessonplanModel.findOne({ name: user.name });
      return sendResponse(res, 200, { info: lesson, tag: user.tag });
    } else if (user.tag === "ชมรม") {
      const club = await clubsModel.findOne({ name: user.name });
      return sendResponse(res, 200, { info: club, tag: user.tag });
    } else if (user.tag === "โครงการพัฒนาความสามารถ") {
      const gifted = await giftedModel.findOne({ name: user.name });
      return sendResponse(res, 200, { info: gifted, tag: user.tag });
    } else if (user.taf === "องค์กรนักเรียน") {
      const organization = await organizationModel.findOne({ name: user.name });
      return sendResponse(res, 200, { info: organization, tag: user.tag });
    } else {
      return sendResponse(res, 200, user)
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};
