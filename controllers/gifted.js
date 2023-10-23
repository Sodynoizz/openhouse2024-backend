import path from "path";
import rolesModel from "../models/rolesModel.js";
import giftedModel from "../models/giftedModel.js";
import { sendResponse, getRolesData } from "../utils/util.js";

export const CreateGiftedPlans = async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "models", "rolesData.json");
    const jsonData = await getRolesData(filePath);
    console.log(jsonData);
    for (let i = 0; i < 4; i++) {
      const data = {
        id: i + 1,
        name: jsonData["โครงการพัฒนาความสามารถ"][i],
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
      await giftedModel.create(data);
    }
    return sendResponse(res, 200, "Update clubs successfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const Edit = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await rolesModel.findOne({ email: email });
    if (user) {
      const status = "อยู่ระหว่างการตรวจสอบ";
      const result = await giftedModel.findOneAndUpdate(
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

export const GetGiftedLists = async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "models", "rolesData.json");
    const jsonData = await getRolesData(filePath);
    return sendResponse(res, 200, jsonData["โครงการพัฒนาความสามารถ"]);
  } catch (err) {
    console.log(err);
    return sendResponse(res, 404, err.message);
  }
};

export const DeleteReview = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await rolesModel.findOne({ email: email });
    if (user) {
      const lessonPlan = await giftedModel.findOne({ name: user.name });

      if (lessonPlan && lessonPlan.counts > 1) {
        const result = await giftedModel.findOneAndUpdate(
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
  const { email } = req.body;
  try {
    const user = await rolesModel.findOne({ email: email });
    if (user) {
      const lessonPlan = await giftedModel.findOne({ name: user.name });

      if (lessonPlan && lessonPlan.counts < 3) {
        const result = await giftedModel.findOneAndUpdate(
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
  const { email, imageType } = req.body;
  try {
    const user = await rolesModel.findOne({ email: email });
    const status = "อยู่ระหว่างการตรวจสอบ";
    const update = {
      status: status,
      [`${imageType}`]: {
        data: req.file.buffer,
        contenttype: req.file.mimetype,
      },
    };
    await giftedModel.findOneAndUpdate({ name: user.name }, update);
    return sendResponse(res, 200, "Uploaded Image Successfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const GetImage = async (req, res) => {
  const { email, imageType } = req.body;
  try {
    const user = await rolesModel.findOne({ email: email });
    const lessons = await giftedModel.findOne({ name: user.name });
    const image = lessons[imageType];
    res.setHeader("Content-Type", image.contenttype);
    res.send({ data: image.data, contenttype: image.contenttype });
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Error Retrieving Image");
  }
};

export const UploadProfile = async (req, res) => {
  const { email, imgprofileType } = req.body;
  try {
    const user = await rolesModel.findOne({ email: email });
    const status = "อยู่ระหว่างการตรวจสอบ";
    const update = {
      status: status,
      [imgprofileType]: {
        data: req.file.buffer,
        contenttype: req.file.mimetype,
      },
    };
    await giftedModel.findOneAndUpdate({ name: user.name }, update);
    return sendResponse(res, 200, "Uploaded Image Successfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const GetProfile = async (req, res) => {
  const { email, imgprofileType } = req.body;
  try {
    const user = await rolesModel.findOne({ email: email });
    const lessons = await giftedModel.findOne({ name: user.name });
    const image = lessons[`${imgprofileType}`];
    res.setHeader("Content-Type", image.contenttype);
    res.send({ data: image.data, contenttype: image.contenttype });
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Error Retrieving Image");
  }
};
