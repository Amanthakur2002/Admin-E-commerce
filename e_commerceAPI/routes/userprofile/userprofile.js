const express = require('express');
const userProfileRouter = express.Router();
const{profilePhotoChange,updateProfile}=require("../../controller/userprofile/userprofile");



userProfileRouter.put("/changePhoto",profilePhotoChange);
userProfileRouter.put("/updateProfile",updateProfile);




module.exports=userProfileRouter