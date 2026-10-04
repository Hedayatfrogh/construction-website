const express = require("express");
const authController = require("../Controllers/authController");
const adminController = require("../Controllers/adminController");
const upload = require("../utils/upload");

const router = express.Router();

router.use(authController.protect, authController.restrictTo("admin"));

router.get("/content", adminController.getContent);
router.put("/content", adminController.replaceContent);
router.delete("/content", adminController.resetContent);
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

router.get("/:section", adminController.getSection);
router.put("/:section", adminController.saveSection);
router.post("/:section", adminController.addItem);
router.put("/:section/:id", adminController.updateItem);
router.delete("/:section/:id", adminController.deleteItem);

module.exports = router;
