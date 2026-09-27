const express=require("express");
const authController=require("../Controllers/authController");

const router=new express.Router();

router.post('/login',authController.logIn);
router.post("/logout",authController.logout);
router.get("/me",authController.protect,authController.getMe);

module.exports=router;