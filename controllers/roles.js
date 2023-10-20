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
