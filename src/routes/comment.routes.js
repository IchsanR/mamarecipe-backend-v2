const express = require("express");
const {
	addRecipeComment,
	getRecipeComment,
	deleteRecipeComment,
} = require("../controller/comment.controller");
const jwtAuth = require("../middleware/auth.token");

const commentRouter = express.Router();

commentRouter
	.get("/comment/:recipeId", getRecipeComment) //Get recipe comment
	.delete("/comment/:commentId", deleteRecipeComment) //Delete comment
	.post("/comment/:recipeId", jwtAuth, addRecipeComment); //Add recipe comment

module.exports = commentRouter;
