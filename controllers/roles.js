import path from "path";
import rolesModel from "../models/rolesModel.js";
import { getRolesData, sendResponse } from "../utils/util.js";


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


// export const GetLessonPlanLists = async (req, res) => {
//     try {
//         const filePath = path.join(process.cwd(), "models", "rolesData.json");
//         const jsonData = await getRolesData(filePath);
//         return sendResponse(res, 200, jsonData["สายการเรียน"]);
//     } catch (err) {
//         console.log(err);
//         return sendResponse(res, 404, err.message);
//     }
// }