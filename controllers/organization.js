import axios from "axios";
import path from "path";
import rolesModel from "../models/rolesModel.js";
import organizationModel from "../models/organizationModel.js";
import {
  getRolesData,
  sendResponse,
  CheckEnvironmentKey,
} from "../utils/util.js";
import { response } from "express";

export const CreateOrganization = async (req, res) => {
  const { environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  const filePath = path.join(process.cwd(), "models", "rolesData.json");
  const jsonData = await getRolesData(filePath);
  try {
    for (let i = 0; i < 4; i++) {
      const data = {
        id: i + 1,
        name: jsonData["องค์กรนักเรียน"][i],
        review_1: {
          name: "",
          gen: "",
          contact: "",
          review: "",
        },
        review_2: {
          name: "",
          gen: "",
          contact: "",
          review: "",
        },
        review_3: {
          name: "",
          gen: "",
          contact: "",
          review: "",
        },
      };
      await organizationModel.create(data);
    }
    return res.status(200).send("Create Organization Model Successfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const Edit = async (req, res) => {
  const { email, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }
  try {
    const user = await rolesModel.findOne({ email: email });
    if (user) {
      const status = "อยู่ระหว่างการตรวจสอบ";
      const result = await organizationModel.findOneAndUpdate(
        { name: user.name },
        {
          $set: {
            status: status,
            ...req.body,
          },
        },
        { new: true }
      );
      await result.save();
      return sendResponse(res, 200, "Updated Successful");
    } else {
      return sendResponse(res, 500, "Internal Server Error");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const GetOrganizationLists = async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "models", "rolesData.json");
    const jsonData = await getRolesData(filePath);
    return sendResponse(res, 200, jsonData["องค์กรนักเรียน"]);
  } catch (err) {
    console.log(err);
    return sendResponse(res, 404, err.message);
  }
};

export const DeleteReview = async (req, res) => {
  const { email, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await rolesModel.findOne({ email: email });
    if (user) {
      const organization = await organizationModel.findOne({ name: user.name });

      if (organization && organization.counts > 1) {
        const result = await organizationModel.findOneAndUpdate(
          { name: user.name },
          { $inc: { counts: -1 } },
          { new: true }
        );
        await result.save();
        return sendResponse(res, 200, "Update Successful");
      } else {
        return sendResponse(res, 400, "Review count cannot be less than 1");
      }
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const AddReview = async (req, res) => {
  const { email, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await rolesModel.findOne({ email: email });
    if (user) {
      const organization = await organizationModel.findOne({ name: user.name });

      if (organization && organization.counts < 3) {
        const result = await organizationModel.findOneAndUpdate(
          { name: user.name },
          { $inc: { counts: 1 } },
          { new: true }
        );
        await result.save();
        return sendResponse(res, 200, "Update Successful");
      } else {
        return sendResponse(res, 400, "Review count cannot be more than 3");
      }
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const UploadImage = async (req, res) => {
  const { email, imageType, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await rolesModel.findOne({ email: email });
    const status = "อยู่ระหว่างการตรวจสอบ";
    if (req.file) {
      const response = await axios.post(
        "https://api.imgur.com/3/image",
        req.file.buffer,
        {
          headers: {
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            "Content-Type": "image/*",
          },
        }
      );
      const update = {
        status: status,
        [`${imageType}`]: response.data.data.link,
      };
      await organizationModel.findOneAndUpdate({ name: user.name }, update);
      return sendResponse(res, 200, "Uploaded Image Successfully");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const GetImage = async (req, res) => {
  const { email, imageType, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }
  try {
    const user = await rolesModel.findOne({ email: email });
    const organization = await organizationModel.findOne({ name: user.name });
    res.status(200).send({ data: organization[imageType] });
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Error Retrieving Image");
  }
};

export const UploadProfile = async (req, res) => {
  const { email, imgprofileType, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await rolesModel.findOne({ email: email });
    const status = "อยู่ระหว่างการตรวจสอบ";
    if (req.file) {
      const response = await axios.post(
        "https://api.imgur.com/3/image",
        req.file.buffer,
        {
          headers: {
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            "Content-Type": "image/*",
          },
        }
      );
      const update = {
        status: status,
        [imgprofileType]: response.data.data.link,
      };
      await organizationModel.findOneAndUpdate({ name: user.name }, update);
      return sendResponse(res, 200, "Uploaded Image Successfully");
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const GetProfile = async (req, res) => {
  const { email, imgprofileType, environmentKey } = req.body;
  // if (!CheckEnvironmentKey(environmentKey)) {
  //   return sendResponse(res, 400, "Environment key doesn't match");
  // }

  try {
    const user = await rolesModel.findOne({ email: email });
    const organization = await organizationModel.findOne({ name: user.name });
    res.status(200).send({ data: organization[imgprofileType] });
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Error Retrieving Image");
  }
};
