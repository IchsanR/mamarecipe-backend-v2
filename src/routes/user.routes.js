const express = require("express");
const {
	getAllUser,
	registerUser,
	getUserId,
	userLogin,
	updatePassword,
	deleteAccount,
	checkEmailPhone,
	forgetPassword,
	updateAccount,
	updatePicture,
} = require("../controller/user.controller");
const jwtAuth = require("../middleware/auth.token");
const uploadUser = require("../middleware/userImage.middleware");

const userRouter = express.Router();

userRouter
	.get("/user", getAllUser) //Get All user
	.get("/user/:userId", getUserId) //Get user by ID
	.post("/user", registerUser) //Register User
	.post("/login", userLogin) //Login User
	.post("/verify", checkEmailPhone) //verify user
	.put("/password", jwtAuth, updatePassword) //update password
	.put("/forget", jwtAuth, forgetPassword) //Forget password
	.patch("/updateAccount", jwtAuth, updateAccount) //Update user account
	.put("/userPicture", jwtAuth, uploadUser, updatePicture) //Update user picture
	.delete("/user", jwtAuth, deleteAccount); //delete user

module.exports = userRouter;
