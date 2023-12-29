import userModel from "../models/userModel.js";
import { CheckEnvironmentKey, sendResponse } from "../utils/util.js";

export const UpdateEstamp = async (req, res) => {
    const { id, environmentKey } = req.body;

    // if (!CheckEnvironmentKey(environmentKey)) {
    //     return sendResponse(res, 400, "Environment key doens't match");
    // }

    try {
        const user = await userModel.findOne({ id: id });
        if (user) {
            let stampAmt = user.estamp;
            user.estamp = stampAmt + 1;
            await user.save();
            return sendResponse(res, 200, "Updated E-Stamp Successfully");
        } else {
            return sendResponse(res, 400, "User not found");
        }
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, "Internal Server Error");
    }
}

export const GetEstampUser = async (req, res) => {
  const { id, environmentKey } = req.body;

  // if (!CheckEnvironmentKey(environmentKey)) {
  //     return sendResponse(res, 400, "Environment key doens't match");
  // }

  try {
    const user = await userModel.findOne({ id: id });
    if (user) {
      return sendResponse(res, 200, user.estamp);
    } else {
      return sendResponse(res, 400, "User not found");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
}