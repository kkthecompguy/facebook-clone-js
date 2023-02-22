const express = require("express");
const router = express.Router();
const {
  register,
  activateAccount,
  login,
  sendVerification,
} = require("../controllers/users.controllers");
const isAuthenticated  = require("../middleware/auth");

router.post("/register", register);
router.post("/activate", isAuthenticated, activateAccount);
router.post("/login", login);
router.post("/send/verification", isAuthenticated, sendVerification);

module.exports = router;
