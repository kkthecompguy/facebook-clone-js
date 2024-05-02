const dotenv = require("dotenv");
const {
  HTTP_201_CREATED,
  HTTP_500_INTERNAL_SERVER_ERROR,
} = require("../utils/status");

const PostModel = require("../models/users.models");
dotenv.config();

// controllers object
const controllers = {};

controllers.createPost = async (req, res) => {
  try {
    const post = await new PostModel(req.body).save();
    return res.status(HTTP_201_CREATED).json(post)
  } catch (error) {
    console.log(error);
    return res
      .status(HTTP_500_INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};


module.exports = controllers;
