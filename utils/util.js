import fs from "fs";

export const convertID = (id) => {
  const res = parseInt(id, 10);
  return isNaN(res) ? id : res;
};

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

export const CheckEnvironmentKey = (environmentKey) => {
  return process.env.ENVIRONMENT_KEY === environmentKey;
}

export const sendResponse = async (res, status, message) => {
  return await res.status(status).json(message);
};
