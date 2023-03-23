const express = require("express");
const router = express.Router();
const {
  register,
  activateAccount,
  login,
  sendVerification,
  findAccount,
  sendResetPassCode,
  verifyResetCode,
  changePassword,
} = require("../controllers/users.controllers");
const isAuthenticated = require("../middleware/auth");

router.post("/register", register);
router.post("/activate", isAuthenticated, activateAccount);
router.post("/login", login);
router.post("/send/verification", isAuthenticated, sendVerification);
router.post("/find/account", findAccount);
router.post("/send/reset/code", sendResetPassCode);
router.post("/verify/reset/code", verifyResetCode);
router.post("/change/password", changePassword);

module.exports = router;
