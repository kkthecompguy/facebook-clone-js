const express = require("express");
const router = express.Router();
const {
  createPost
} = require("../controllers/posts.controllers");
const isAuthenticated = require("../middleware/auth");

router.post("/createpost", isAuthenticated, createPost);

module.exports = router;
