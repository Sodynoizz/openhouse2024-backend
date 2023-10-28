import path from "path";
import rolesModel from "../models/rolesModel.js";
import clubsModel from "../models/clubsModel.js";
import {
  sendResponse,
  getRolesData,
  CheckEnvironmentKey,
} from "../utils/util.js";

export const CreateClubs = async (req, res) => {
  const { environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const filePath = path.join(process.cwd(), "models", "rolesData.json");
    const jsonData = await getRolesData(filePath);
    console.log(jsonData);
    for (let i = 0; i < 69; i++) {
      const data = {
        id: i + 1,
        name: jsonData["ชมรม"][i],
        engname: "",
        ig: "",
        facebook: "",
        others: "",
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
      await clubsModel.create(data);
    }
    return sendResponse(res, 200, "Update clubs successfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const Edit = async (req, res) => {
  const { email, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await rolesModel.findOne({ email: email });
    if (user) {
      const status = "อยู่ระหว่างการตรวจสอบ";
      const result = await clubsModel.findOneAndUpdate(
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

export const GetClubLists = async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "models", "rolesData.json");
    const jsonData = await getRolesData(filePath);
    return sendResponse(res, 200, jsonData["ชมรม"]);
  } catch (err) {
    console.log(err);
    return sendResponse(res, 404, err.message);
  }
};

export const DeleteReview = async (req, res) => {
  const { email, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await rolesModel.findOne({ email: email });
    if (user) {
      const clubs = await clubsModel.findOne({ name: user.name });

      if (clubs && clubs.counts > 1) {
        const result = await clubsModel.findOneAndUpdate(
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
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await rolesModel.findOne({ email: email });
    if (user) {
      const clubs = await clubsModel.findOne({ name: user.name });

      if (clubs && clubs.counts < 3) {
        const result = await clubsModel.findOneAndUpdate(
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
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await rolesModel.findOne({ email: email });
    const status = "อยู่ระหว่างการตรวจสอบ";
    const update = {
      status: status,
      [imageType]: {
        data: req.file.buffer,
        contenttype: req.file.mimetype,
      },
    };
    await clubsModel.findOneAndUpdate({ name: user.name }, update);
    return sendResponse(res, 200, "Uploaded Image Successfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const GetImage = async (req, res) => {
  const { email, imageType, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await rolesModel.findOne({ email: email });
    const clubs = await clubsModel.findOne({ name: user.name });
    const image = clubs[imageType];
    res.setHeader("Content-Type", image.contenttype);
    res.send({ data: image.data, contenttype: image.contenttype });
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Error Retrieving Image");
  }
};

export const UploadProfile = async (req, res) => {
  const { email, imgprofileType, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

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
    await clubsModel.findOneAndUpdate({ name: user.name }, update);
    return sendResponse(res, 200, "Uploaded Image Successfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const GetProfile = async (req, res) => {
  const { email, imgprofileType, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await rolesModel.findOne({ email: email });
    const clubs = await clubsModel.findOne({ name: user.name });
    const image = clubs[imgprofileType];
    res.setHeader("Content-Type", image.contenttype);
    res.send({ data: image.data, contenttype: image.contenttype });
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Error Retrieving Image");
  }
};

export const UploadLogo = async (req, res) => {
  const { email, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await rolesModel.findOne({ email: email });
    const status = "อยู่ระหว่างการตรวจสอบ";
    const update = {
      status: status,
      logo: {
        data: req.file.buffer,
        contenttype: req.file.mimetype,
      },
    };
    await clubsModel.findOneAndUpdate({ name: user.name }, update);
    return sendResponse(res, 200, "Uploaded Image Successfully");
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const GetLogo = async (req, res) => {
  const { email, environmentKey } = req.body;
  if (!CheckEnvironmentKey(environmentKey)) {
    return sendResponse(res, 400, "Environment key doesn't match");
  }

  try {
    const user = await rolesModel.findOne({ email: email });
    const clubs = await clubsModel.findOne({ name: user.name });
    const image = clubs["logo"];
    res.setHeader("Content-Type", image.contenttype);
    res.send({ data: image.data, contenttype: image.contenttype });
  } catch (err) {
    console.log(err);
    return sendResponse(res, 500, "Error Retrieving Logo");
  }
};
