const express = require("express");
const {
	addRecipe,
	getAllRecipe,
	getDetailRecipe,
	getUserRecipe,
	updateRecipe,
	searchRecipe,
} = require("../controller/recipe.controller");
const jwtAuth = require("../middleware/auth.token");
const uploadRecipe = require("../middleware/recipeImage.middleware");

const recipeRouter = express.Router();

recipeRouter
	.get("/recipe", getAllRecipe) //Get all recipe
	.get("/recipe/search", searchRecipe) //Search Recipe
	.get("/recipe/:recipeId", getDetailRecipe) //Get detail recipe
	.get("/usersrecipe", jwtAuth, getUserRecipe) //Get user recipe
	.patch("/recipe/:recipeId", updateRecipe) //Update Recipe
	.post("/recipe", jwtAuth, uploadRecipe, addRecipe); //Add recipe

module.exports = recipeRouter;
