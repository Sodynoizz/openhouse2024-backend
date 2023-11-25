import userModel from "../models/userModel.js";
import { CheckEnvironmentKey } from "../utils/util.js";

export const addToDB = async (req, res) => {
  const {
    roles,
    username,
    prefix,
    name,
    surname,
    school,
    classlvl,
    platform,
    purpose,
    environmentKey
  } = req.body;

  if (!CheckEnvironmentKey(environmentKey)) {
    return res.status(400).send("Environment key doesn't match");
  }
  
  const jsonData = {
    roles: roles,
    username: username,
    prefix: prefix,
    name: name,
    surname: surname,
    school: school,
    classlvl: classlvl,
    platform: platform,
    purpose: purpose,
  }
  await userModel.create(jsonData);
  return res.status(200).send("Added to Database Successfully");
};
