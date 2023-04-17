const recipeModel = require("../model/recipe.model");
const {
	success,
	failed,
	failedAddData,
	failedNotFound,
	failedUpdateData,
} = require("../helper/file.response");
const { v4: uuidv4 } = require("uuid");

const recipeController = {
	// Get All recipe
	getAllRecipe: async (req, res) => {
		try {
			await recipeModel
				.getAllRecipe()
				.then((response) => {
					success(res, response.rows, "Success", "Berhasil Mendapatkan Resep");
				})
				.catch((error) => {
					failedNotFound(
						res,
						error.message,
						"Failed",
						"Gagal Mendapatkan Data"
					);
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},

	// Get detail recipe
	getDetailRecipe: async (req, res) => {
		try {
			const { recipeId } = req.params;

			await recipeModel
				.getRecipeById(recipeId)
				.then((response) => {
					success(res, response.rows, "Success", "Berhasil Mendapatkan Resep");
				})
				.catch((error) => {
					failedNotFound(
						res,
						error.message,
						"Failed",
						"Gagal Mendapatkan Data"
					);
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},

	// search recipe
	searchRecipe: async (req, res) => {
		try {
			const query = req.query;
			const title = query.title;
			const orderBy = query.orderBy || "title";
			const sortOrder = query.sortOrder || "ASC";
			const page = parseInt(query.page) || 1;
			const limit = 6;
			const offset = (page - 1) * limit;

			const data = {
				title,
				orderBy,
				sortOrder,
				limit,
				offset,
			};

			await recipeModel
				.searchRecipe(data)
				.then((response) => {
					success(res, response.rows, "Success", "Berhasil Mendapatkan Resep");
				})
				.catch((error) => {
					failedNotFound(
						res,
						error.message,
						"Failed",
						"Gagal Mendapatkan Data"
					);
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},

	// get most viewed recipe
	mostViewRecipe: async (req, res) => {
		try {
			await recipeModel
				.mostViewRecipe()
				.then((response) => {
					success(res, response.rows, "Success", "Berhasil Mendapatkan Resep");
				})
				.catch((error) => {
					failedNotFound(
						res,
						error.message,
						"Failed",
						"Gagal Mendapatkan Data"
					);
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},

	// Get user recipe
	getUserRecipe: async (req, res) => {
		try {
			const { userId } = req.decoded;

			await recipeModel
				.getUserRecipe(userId)
				.then((response) => {
					success(res, response.rows, "Success", "Berhasil Mendapatkan Resep");
				})
				.catch((error) => {
					failedNotFound(res, error, "Failed", "Gagal Mendapatkan Data");
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},

	// Get user liked recipe
	getUserLiked: async (req, res) => {
		try {
			const { userId } = req.decoded;

			await recipeModel
				.userLiked(userId)
				.then((response) => {
					success(res, response.rows, "Success", "Berhasil Mendapatkan Resep");
				})
				.catch((error) => {
					failedNotFound(
						res,
						error.message,
						"Failed",
						"Gagal Mendapatkan Data"
					);
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},

	// Get user saved recipe
	getUserSaved: async (req, res) => {
		try {
			const { userId } = req.decoded;

			await recipeModel
				.userSaved(userId)
				.then((response) => {
					success(res, response.rows, "Success", "Berhasil Mendapatkan Resep");
				})
				.catch((error) => {
					failedNotFound(
						res,
						error.message,
						"Failed",
						"Gagal Mendapatkan Data"
					);
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},

	// Add recipe
	addRecipe: async (req, res) => {
		try {
			const recipeId = uuidv4();
			const { userId } = req.decoded;
			const image = req.file.filename;
			const { title, description, ingredients, steps } = req.body;
			const data = {
				recipeId,
				userId,
				image,
				title,
				description,
				ingredients,
				steps,
				viewCount: 0,
				likedCount: 0,
				savedCount: 0,
			};

			await recipeModel
				.addRecipe(data)
				.then((response) => {
					success(res, response.rows, "Success", "Resep Berhasil Ditambahkan");
				})
				.catch((error) => {
					failedAddData(
						res,
						error.message,
						"Failed",
						"Resep Gagal Ditambahkan"
					);
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},

	// Update recipe
	updateRecipe: async (req, res) => {
		try {
			const { recipeId } = req.params;
			const { title, description, ingredients, steps } = req.body;
			const data = {
				title,
				description,
				ingredients,
				steps,
				recipeId,
			};

			await recipeModel
				.updateRecipe(data)
				.then((response) => {
					success(res, response.rows, "Success", "Resep Berhasil Diupdate");
				})
				.catch((error) => {
					failedUpdateData(
						res,
						error.message,
						"Failed",
						"Resep Gagal Diupdate"
					);
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},

	// Update Recipe Image
	updateRecipeImage: async (req, res) => {
		try {
			const { userId } = req.decoded;
			const image = req.file.filename;
			const data = {
				userId,
				image,
			};

			await recipeModel
				.updateImage(data)
				.then((response) => {
					success(res, response.rows, "Success", "Resep Berhasil Diupdate");
				})
				.catch((error) => {
					failedUpdateData(
						res,
						error.message,
						"Failed",
						"Resep Gagal Diupdate"
					);
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},
};

module.exports = recipeController;
