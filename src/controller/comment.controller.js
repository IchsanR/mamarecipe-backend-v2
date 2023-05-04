const commentModel = require("../model/comment.model");
const { response } = require("../helper/file.response");

const commentControler = {
	// Get recipe comment
	getRecipeComment: async (req, res) => {
		try {
			const { recipeId } = req.params;

			await commentModel
				.getRecipeComment(recipeId)
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"Success",
						"Comment Berhasil Didapatkan"
					);
				})
				.catch((error) => {
					response(res, 404, error, "Failed", "Comment Gagal Didapatkan");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},
	// Add comment
	addRecipeComment: async (req, res) => {
		try {
			const { userId } = req.decoded;
			const { recipeId } = req.params;
			const { description } = req.body;
			const date = Date();
			const milisecond = Date.now();
			const data = {
				userId,
				recipeId,
				description,
				upload_time: date,
				ms: milisecond,
			};

			await commentModel
				.addRecipeComment(data)
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"Success",
						"Comment Berhasil Ditambahkan"
					);
				})
				.catch((error) => {
					response(res, 422, error, "Failed", "Comment Gagal Dibuat");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	deleteRecipeComment: async (req, res) => {
		try {
			const { commentId } = req.params;

			await commentModel
				.deleteRecipeComment(commentId)
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"Success",
						"Comment Berhasil Ditambahkan"
					);
				})
				.catch((error) => {
					response(res, 422, error, "Failed", "Comment Gagal Dihapus");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},
};

module.exports = commentControler;
