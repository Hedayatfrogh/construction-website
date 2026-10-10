const express = require("express");
const rateLimit = require("express-rate-limit");
const authController = require("../Controllers/authController");

const router = express.Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", authLimiter, authController.logIn);
router.post("/logout", authController.logout);
router.get("/me", authController.protect, authController.getMe);
router.post(
  "/change-password",
  authController.protect,
  authController.restrictTo("admin"),
  authController.changePassword,
);
router.post("/forgot-password", authLimiter, authController.forgotPassword);
router.post("/reset-password", authLimiter, authController.resetPassword);

module.exports = router;
