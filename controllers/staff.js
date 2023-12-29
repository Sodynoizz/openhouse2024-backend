import userModel from "../models/userModel.js";
import { CheckEnvironmentKey, sendResponse } from "../utils/util.js";

export const AddStaff = async (req, res) => {
  const { id, organizationName, tag, environmentKey } = req.body;

  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ id: id });
    const staff = {
      organizationName: organizationName,
      tag: tag,
    };

    if (user) {
      user.isstaff = true;
      user.staff = staff;
      await user.save();
      return sendResponse(res, 200, "Added to staff successfully");
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const GetStaffInfo = async (req, res) => {
  const { id, environmentKey } = req.body;

  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ id: id });
    if (user) {
      const staff = {
        isstaff: user.isstaff,
        organizationName: user.organizationName,
        staff: user.staff,
      };
      return sendResponse(res, 200, staff);
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(user);
    return sendResponse(res, 500, "Internal Server Error");
  }
};
