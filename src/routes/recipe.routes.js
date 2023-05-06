const express = require("express");
const {
	addRecipe,
	getAllRecipe,
	getDetailRecipe,
	getUserRecipe,
	searchRecipe,
	mostViewRecipe,
	getUserLiked,
	getUserSaved,
	viewCount,
	deleteRecipe,
	addLikedRecipe,
	removeLikedRecipe,
	addSavedRecipe,
	removeSavedRecipe,
} = require("../controller/recipe.controller");
const jwtAuth = require("../middleware/auth.token");
const uploadRecipe = require("../middleware/recipeImage.middleware");

const recipeRouter = express.Router();

recipeRouter
	.get("/recipe", getAllRecipe) //Get all recipe
	.get("/recipe/:recipeId", getDetailRecipe) //Get detail recipe
	.get("/recipes/search", searchRecipe) //Search Recipe
	.get("/mostview", mostViewRecipe) //Most view recipe
	.get("/recipe/user/:userId", getUserRecipe) //Get user recipe
	.get("/recipe/user/:userId/liked", getUserLiked) //Get user liked recipe
	.get("/recipe/user/:userId/saved", getUserSaved) // Get user saved recipe
	.post("/recipe", jwtAuth, uploadRecipe, addRecipe) //Add recipe
	// .put("/recipe/:recipeId", updateRecipe) //Update Recipe
	// .put("/recipe/image/:recipeId", updateRecipeImage) //Update recipe image
	.put("/recipe/viewcount/:recipeId", viewCount) //View count
	.delete("/recipe/:recipeId", deleteRecipe) //delete recipe
	.post("/recipe/liked/:recipeId", jwtAuth, addLikedRecipe) //add user liked recipe
	.delete("/recipe/liked/:recipeId", removeLikedRecipe) //Remove user liked
	.post("/recipe/saved/:recipeId", jwtAuth, addSavedRecipe) //Add user saved recipe
	.delete("/recipe/saved/:recipeId", removeSavedRecipe); //Remove user saved recipe

module.exports = recipeRouter;
