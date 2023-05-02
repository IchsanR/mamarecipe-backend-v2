const db = require("../config/db");

const commentModel = {
	//Get recipe comment
	getRecipeComment: (recipeId) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT comment.id_comment, comment.description, users.id_user, users.name AS user_name, users.profile_pic FROM comment JOIN users ON comment.id_user = users.id_user WHERE id_recipe = '${recipeId}'`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Add recipe comment
	addRecipeComment: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`INSERT INTO comment
      (id_user, id_recipe, description)
      VALUES ($1, $2, $3)`,
				[data.userId, data.recipeId, data.description]
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	deleteRecipeComment: (commentId) => {
		return new Promise((resolve, reject) => {
			db.query(
				`
			DELETE FROM comment WHERE id_comment = ${commentId}`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
};

module.exports = commentModel;
