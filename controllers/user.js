import userModel from "../models/userModel.js";
import { convertID, CheckEnvironmentKey, sendResponse } from "../utils/util.js";

const isObjectEmpty = (objectName) => {
  for (let prop in objectName) {
    if (objectName.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

export const addToDB = async (req, res) => {
  const {
    email,
    role,
    username,
    prefix,
    name,
    surname,
    school,
    classlvl,
    platform,
    purpose,
    environmentKey,
  } = req.body;

  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const id = await userModel.countDocuments({});

    const jsonData = {
      id: id + 1,
      email: email,
      role: role,
      username: username,
      prefix: prefix,
      name: name,
      surname: surname,
      school: school,
      classlvl: classlvl,
      platform: platform,
      purpose: purpose,
    };
    await userModel.create(jsonData);
    return sendResponse(res, 200, "Added to Database Successfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const getUser = async (req, res) => {
  const { email, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ email: email });
    return sendResponse(res, 200, !isObjectEmpty(user));
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const getUserInfo = async (req, res) => {
  const { email, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      return sendResponse(res, 200, user);
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const getUserByID = async (req, res) => {
  const { id, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ id: id });
    if (user) {
      return sendResponse(res, 200, user);
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const registerUser = async (req, res) => {
  const { email, gate, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      user.gate = gate;
      user.register = true;

      await user.save();
      return sendResponse(res, 200, "Registered Successfully");
    } else {
      return sendResponse(res, 404, "This user hasn't registered yet.");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const registerUser2 = async (req, res) => {
  const { id, gate, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await userModel.findOne({ id: id });
    if (user) {
      user.gate = gate;
      user.register = true;

      await user.save();
      return sendResponse(res, 200, "Registered Successfully");
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};
