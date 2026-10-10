const express = require("express");
const authController = require("../Controllers/authController");
const adminController = require("../Controllers/adminController");
const upload = require("../utils/upload");

const router = express.Router();

router.use(authController.protect, authController.restrictTo("admin"));

router.get("/users", adminController.requireOwner, adminController.listUsers);
router.post("/users", adminController.requireOwner, adminController.createUser);
router.put(
  "/users/:id",
  adminController.requireOwner,
  adminController.updateUser,
);
router.delete(
  "/users/:id",
  adminController.requireOwner,
  adminController.deleteUser,
);
router.post(
  "/media/upload",
  upload.single("image"),
  adminController.uploadImage,
);

module.exports = router;
