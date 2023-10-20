import fs from "fs";

export const getRolesData = async (filePath) => {
  try {
    const data = await readFileAsync(filePath);
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};


export const readFileAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const sendResponse = async (res, status, message) => {
  return await res.status(status).json(message);
};

export const isAdmin = (email) => {
  return process.env.ADMIN_EMAIL.includes(email);
}