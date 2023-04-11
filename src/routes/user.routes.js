const express = require("express");
const {
	getAllUser,
	registerUser,
	getUserId,
	userLogin,
	updatePassword,
	deleteAccount,
	checkEmailPhone,
} = require("../controller/user.controller");
const jwtAuth = require("../middleware/auth.token");

const userRouter = express.Router();

userRouter
	.get("/user", getAllUser) //Get All user
	.get("/user/:userId", getUserId) //Get user by ID
	.post("/user", registerUser) //Register User
	.post("/login", userLogin) //Login User
	.post("/verify", checkEmailPhone)
	.put("/password", jwtAuth, updatePassword)
	.delete("/user", jwtAuth, deleteAccount); //Update password

module.exports = userRouter;
