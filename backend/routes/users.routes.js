const express = require("express");
const router = express.Router();
const {
  register,
  activateAccount,
  login,
} = require("../controllers/users.controllers");

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);

module.exports = router;