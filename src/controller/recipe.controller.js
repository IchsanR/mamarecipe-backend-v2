const recipeModel = require("../model/recipe.model");
const { response } = require("../helper/file.response");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../helper/cloudinary.helper");

const recipeController = {
	// Get All recipe
	getAllRecipe: async (req, res) => {
		try {
			await recipeModel
				.getAllRecipe()
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"Success",
						"Berhasil Mendapatkan Resep"
					);
				})
				.catch((error) => {
					response(res, 404, error, "Failed", "Gagal Mendapatkan Data");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	// Get detail recipe
	getDetailRecipe: async (req, res) => {
		try {
			const { recipeId } = req.params;

			await recipeModel
				.getRecipeById(recipeId)
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"Success",
						"Berhasil Mendapatkan Resep"
					);
				})
				.catch((error) => {
					response(res, 404, error, "Failed", "Gagal Mendapatkan Data");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
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
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"Success",
						"Berhasil Mendapatkan Resep"
					);
				})
				.catch((error) => {
					response(res, 404, error, "Failed", "Gagal Mendapatkan Data");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	// get most viewed recipe
	mostViewRecipe: async (req, res) => {
		try {
			await recipeModel
				.mostViewRecipe()
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"Success",
						"Berhasil Mendapatkan Resep"
					);
				})
				.catch((error) => {
					response(res, 404, error, "Failed", "Gagal Mendapatkan Data");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	// Get user recipe
	getUserRecipe: async (req, res) => {
		try {
			const { userId } = req.params;

			await recipeModel
				.getUserRecipe(userId)
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"Success",
						"Berhasil Mendapatkan Resep"
					);
				})
				.catch((error) => {
					response(res, 404, error, "Failed", "Gagal Mendapatkan Data");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	// Get user liked recipe
	getUserLiked: async (req, res) => {
		try {
			const { userId } = req.params;

			await recipeModel
				.userLiked(userId)
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"Success",
						"Berhasil Mendapatkan Resep"
					);
				})
				.catch((error) => {
					response(res, 404, error, "Failed", "Gagal Mendapatkan Data");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	// Get user saved recipe
	getUserSaved: async (req, res) => {
		try {
			const { userId } = req.params;

			await recipeModel
				.userSaved(userId)
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"Success",
						"Berhasil Mendapatkan Resep"
					);
				})
				.catch((error) => {
					response(res, 404, error, "Failed", "Gagal Mendapatkan Data");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	// Add recipe
	addRecipe: async (req, res) => {
		try {
			const recipeId = uuidv4();
			const { userId } = req.decoded;
			const image = await cloudinary.uploader.upload(req.file.path);
			const { title, description, ingredients, steps } = req.body;
			const data = {
				recipeId,
				userId,
				image: `${image.secure_url}|&&|${image.url}`,
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
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"Success",
						"Resep Berhasil Ditambahkan"
					);
				})
				.catch((error) => {
					response(res, 422, error, "Failed", "Resep Gagal Ditambahkan");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	// // Update recipe
	// updateRecipe: async (req, res) => {
	// 	try {
	// 		const { recipeId } = req.params;
	// 		const { title, description, ingredients, steps } = req.body;
	// 		const data = {
	// 			title,
	// 			description,
	// 			ingredients,
	// 			steps,
	// 			recipeId,
	// 		};

	// 		await recipeModel
	// 			.updateRecipe(data)
	// 			.then((result) => {
	// 				response(res, 200, result.rows, "Success", "Resep Berhasil Diupdate");
	// 			})
	// 			.catch((error) => {
	// 				response(res, 409, error, "Failed", "Resep Gagal Diupdate");
	// 			});
	// 	} catch (error) {
	// 		response(res, 500, error, "Error", "Internal Server Error");
	// 	}
	// },

	// // Update Recipe Image
	// updateRecipeImage: async (req, res) => {
	// 	try {
	// 		const { userId } = req.decoded;
	// 		const image = req.file.filename;
	// 		const data = {
	// 			userId,
	// 			image,
	// 		};

	// 		await recipeModel
	// 			.updateImage(data)
	// 			.then((result) => {
	// 				response(res, 200, result.rows, "Success", "Resep Berhasil Diupdate");
	// 			})
	// 			.catch((error) => {
	// 				response(res, 409, error, "Failed", "Resep Gagal Diupdate");
	// 			});
	// 	} catch (error) {
	// 		response(res, 500, error, "Error", "Internal Server Error");
	// 	}
	// },

	// View count
	viewCount: async (req, res) => {
		try {
			const { recipeId } = req.params;

			await recipeModel
				.viewCount(recipeId)
				.then((result) => {
					response(res, 200, result.rows, "Success", "View Bertambah");
				})
				.catch((error) => {
					response(res, 409, error, "Failed", "Update View Error");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	// Delete Recipe
	deleteRecipe: async (req, res) => {
		try {
			const { recipeId } = req.params;

			await recipeModel
				.deleteRecipe(recipeId)
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"Success",
						"Berhasil Menghapus Resep"
					);
				})
				.catch((error) => {
					response(res, 409, error, "Failed", "Gagal Menghapus Resep");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	// Add user liked
	addLikedRecipe: async (req, res) => {
		try {
			const { userId } = req.decoded;
			const { recipeId } = req.params;
			const data = {
				userId,
				recipeId,
			};

			await recipeModel.checkUserLike(data).then((result) => {
				if (result.rowCount === 0) {
					recipeModel
						.addLikedRecipe(data)
						.then((result) => {
							recipeModel.likedCountIncr(recipeId);
							response(res, 200, result.rows, "Succes", "Berhasil Like Resep");
						})
						.catch((error) => {
							response(res, 422, error, "Failed", "Tidak Berhasil Like Resep");
						});
				} else {
					response(res, 409, null, "Failed", "Resep Sudah Di Like");
				}
			});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	//Remove like
	removeLikedRecipe: async (req, res) => {
		try {
			const { recipeId } = req.params;

			await recipeModel
				.removeUserLiked(recipeId)
				.then((result) => {
					recipeModel.likedCountDecr(recipeId);
					response(res, 200, result.rows, "Success", "Berhasil di Unlike");
				})
				.catch((error) => {
					response(res, 409, error, "Failed", "Resep Gagal di Unlike");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	addSavedRecipe: async (req, res) => {
		try {
			const { userId } = req.decoded;
			const { recipeId } = req.params;
			const data = {
				userId,
				recipeId,
			};

			await recipeModel.checkUserSaved(data).then((result) => {
				if (result.rowCount === 0) {
					recipeModel
						.addSavedRecipe(data)
						.then((result) => {
							recipeModel.savedCountIncr(recipeId);
							response(
								res,
								200,
								result.rows,
								"Success",
								"Resep Berhasil Disimpan"
							);
						})
						.catch((error) => {
							response(res, 422, error, "Failed", "Resep Gagal Disimpan");
						});
				} else {
					response(res, 409, null, "Failed", "Resep Sudah Pernah Disimpan");
				}
			});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	// Remove user saved
	removeSavedRecipe: async (req, res) => {
		try {
			const { recipeId } = req.params;

			await recipeModel
				.removeUserSaved(recipeId)
				.then((result) => {
					recipeModel.savedCountDecr(recipeId);
					response(res, 200, result.rows, "Success", "Berhasil di Unsaved");
				})
				.catch((error) => {
					response(res, 409, error, "Failed", "Gagal Unsaved Recipe");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},
};

module.exports = recipeController;
