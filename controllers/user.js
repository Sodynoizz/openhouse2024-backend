import userModel from "../models/userModel.js";
import { CheckEnvironmentKey } from "../utils/util.js";
import { sendResponse } from "../utils/util.js";

const isObjectEmpty = (objectName) => {
  for (let prop in objectName) {
    if (objectName.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

const range = (x, min, max) => {
  return x >= min && x <= max;
};

const gemRanges = [
  { range: [46, 50], name: "แอเมทิสต์" },
  { range: [41, 45], name: "บุษราคัม" },
  { range: [36, 40], name: "ไข่มุก" },
  { range: [31, 35], name: "โทแพซ" },
  { range: [26, 30], name: "ทับทิม" },
  { range: [21, 25], name: "เพทาย" },
  { range: [16, 20], name: "ไพลิน" },
  { range: [11, 15], name: "ทัวร์มาลีน" },
];

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

  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

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
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await userModel.findOne({ email: email });
    return sendResponse(res, 200, !isObjectEmpty(user));
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const registerUser = async (req, res) => {
  const { email, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
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
  const { id, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await userModel.findOne({ id: id });
    if (user) {
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

export const UpdateScore = async (req, res) => {
  const { id, score, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await userModel.findOne({ id: id });
    let gems, gem_desc;

    if (!score) {
      return sendResponse(res, 400, "Invalid Score Field");
    } 
    
    if (user) {
      const matchingGem = gemRanges.find((gem) => range(score, ...gem.range));
      gems = matchingGem ? matchingGem.name : undefined;

      // if (gems) gem_desc = getGemDesc(gems);
      // else return sendResponse(res, 400, "Gems not found");

      user.gems = gems;
      // user.gem_desc = gem_desc
      await user.save();
      return sendResponse(res, 200, "Updated user's gems successfully");
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const GetGems = async (req, res) => {
  const { id, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await userModel.findOne({ id: id });
    if (user) {
      const jsonData = {
        gems: user.gems,
        gem_desc: user.gem_desc,
      };
      return sendResponse(res, 200, jsonData);
    } else {
      return sendResponse(res, 404, "User not found");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const AddStaff = async (req, res) => {
  const { id, organizationName, tag, environmentKey } = req.body;
  
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await userModel.findOne({ id: id });
    const staff = {
      "organizationName": organizationName,
      "tag": tag
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
}
