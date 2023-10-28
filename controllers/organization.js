import path from "path";
import rolesModel from "../models/rolesModel.js";
import organizationModel from "../models/organizationModel.js";
import { getRolesData, sendResponse } from "../utils/util.js";

export const CreateOrganization = async (req, res) => {
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
}

export const Edit = async (req, res) => {
  const { email } = req.body;
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
  const { email } = req.body;
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
  const { email } = req.body;
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
    await organizationModel.findOneAndUpdate({ name: user.name }, update);
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
    const lessons = await organizationModel.findOne({ name: user.name });
    const image = lessons[`${imageType}`];
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
    await organizationModel.findOneAndUpdate({ name: user.name }, update);
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
    const lessons = await organizationModel.findOne({ name: user.name });
    const image = lessons[`${imgprofileType}`];
    res.setHeader("Content-Type", image.contenttype);
    res.send({ data: image.data, contenttype: image.contenttype });
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Error Retrieving Image");
  }
};
