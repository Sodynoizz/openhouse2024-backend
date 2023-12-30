import userModel from "../models/userModel.js";
import { sendResponse } from "../utils/util.js";

const counts = async (jsonData) => {
  return await userModel.countDocuments(jsonData);
};

export const Stats = async (req, res) => {
  try {
    const stats = {
      registrant: await counts({}),
      participants: await counts({ register: true }),
      gate: {
        prayathai: await counts({ gate: "พญาไท" }),
        henridunant: await counts({ gate: "อังรีดูนังต์" }),
        pratoogray: await counts({ gate: "ประตูเทา" }),
      },
    };
    return sendResponse(res, 200, stats);
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};
