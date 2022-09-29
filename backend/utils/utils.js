const fs = require("fs/promises");
const path = require("path");
const UserModel = require("../models/users.models");

// utils help object
const helpers = {};

helpers.getRouteName = function (fileStr) {
  let fileNameArray = fileStr.split(".");
  return fileNameArray[0];
};

helpers.validateEmail = function (email) {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

helpers.validateLength = function (text, min, max) {
  if (text.length > max || text.length < min) return false;
  return true;
};

helpers.validateUsername = async function (username) {
  let a = false;
  do {
    let check = await UserModel.findOne({ username });
    console.log(check);
    if (check) {
      // change username
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      a = true;
    } else {
      a = false;
    }
    console.log(username);
    return username.toLowerCase();
  } while (a);
};

helpers.interpolation = function (fileStr, dataObj) {
  let tempFileStr = fileStr;
  for (const key in dataObj) {
    if (Object.hasOwnProperty.call(dataObj, key)) {
      tempFileStr = fileStr.replace(key, dataObj[key]);
    }
  }
  return tempFileStr;
};

helpers.getTemplate = async function (fileName, dataObj) {
  const filePath = path.join(__dirname, `../templates/${fileName}.html`);
  const content = await fs.readFile(filePath, { encoding: "utf8", flag: "r" });
  if (content) {
    return helpers.interpolation(content, dataObj);
  } else {
    return "";
  }
};

// console.log(helpers.getTemplate("activate-mail", {"{{username}}": "John", "{{url}}": "https://kosamtech.com" }));
// async function log(){
//   const str = await helpers.getTemplate("activate-mail", {"'{{username}}'": "John", "{{url}}": "https://kosamtech.com" })
//   console.log(str);
// }
// log();

module.exports = helpers;
