import fs from "fs";

export const generateRandomString = (length) => {
  let result = "";
  const characters =
    "123456789ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const charLengths = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLengths));
  }

  return result;
};

export const addMinutesToDate = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

export const capitalize = (str) => {
  if (!str || typeof str !== "string") return "";

  return str
    .trim()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
};

export const removeFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) return console.log("Error deleting file: ", err);
    console.log("File deleted successfully!");
  });
};

export const createURLFromString = (str = "") => {
  if (!str || typeof str !== "string") return "";
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};
