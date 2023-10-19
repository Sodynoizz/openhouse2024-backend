import path from "path";
import rolesModel from "../models/rolesModel.js";
import clubsModel from "../models/clubsModel.js";
import { sendResponse, getRolesData } from "../utils/util.js";

export const CreateClubs = async (req, res) => {
    try {
        const filePath = path.join(process.cwd(), "models", "rolesData.json");
        const jsonData = await getRolesData(filePath);
        console.log(jsonData);
        for (let i = 0; i < 69; i++) {
            const data = {
                id: i + 1,
                name: jsonData["ชมรม"][i],
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
            }
            await clubsModel.create(data);
        }
        return sendResponse(res, 200, "Update clubs successfully");
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, "Internal Server Error");
    }
}

export const Edit = async (req, res) => {
    const { email } = req.body;
    try {
        const user = rolesModel.findOne({ email: email });
        const clubs = clubsModel.findOne({ name: user.name });


    } catch (err) {
        console.log(err);
        return sendResponse(res, 404, "Not Found");
    }
}

export const GetClubLists = async (req, res) => {
    try {
        const filePath = path.join(process.cwd(), "models", "rolesData.json");
        const jsonData = await getRolesData(filePath);
        return sendResponse(res, 200, jsonData["ชมรม"]);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 404, err.message);
    }
}
