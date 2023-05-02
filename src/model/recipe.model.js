const db = require("../config/db");

const recipeModel = {
	// Get All Recipe
	getAllRecipe: () => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM recipe ORDER BY title ASC`)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Get Recipe by id
	getRecipeById: (recipeId) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT recipe.*, users.name AS uploader FROM recipe JOIN users ON recipe.id_user = users.id_user WHERE id_recipe = '${recipeId}'`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Search Recipe with Pagination
	searchRecipe: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM recipe WHERE title ILIKE '%${data.title}%' ORDER BY ${data.orderBy} ${data.sortOrder} LIMIT ${data.limit} OFFSET ${data.offset}`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Get most viewed recipe
	mostViewRecipe: () => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM recipe ORDER BY view_count DESC LIMIT 6`)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Get user recipes
	getUserRecipe: (userId) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM recipe WHERE id_user = '${userId}'`)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Get user liked recipe
	userLiked: (userId) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT recipe.* FROM liked JOIN recipe ON liked.id_recipe = recipe.id_recipe JOIN users ON liked.id_user = users.id_user WHERE liked.id_user = '${userId}'`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Get user saved recipe
	userSaved: (userId) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT recipe.* FROM saved JOIN recipe ON saved.id_recipe = recipe.id_recipe JOIN users ON saved.id_user = users.id_user WHERE saved.id_user = '${userId}'`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Add recipe
	addRecipe: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`INSERT INTO recipe
				(id_recipe, id_user, image, title, description, ingredients, steps, view_count, liked_count, saved_count)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
				[
					data.recipeId,
					data.userId,
					data.image,
					data.title,
					data.description,
					data.ingredients,
					data.steps,
					data.viewCount,
					data.likedCount,
					data.savedCount,
				]
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// // Update recipe
	// updateRecipe: (data) => {
	// 	return new Promise((resolve, reject) => {
	// 		db.query(
	// 			`UPDATE recipe SET
	// 		title = COALESCE ($1, title),
	// 		description = COALESCE ($2, description),
	// 		ingredients = COALESCE ($3, ingredients),
	// 		steps = COALESCE ($4, steps)
	// 		WHERE id_recipe = $5`,
	// 			[
	// 				data.title,
	// 				data.description,
	// 				data.ingredients,
	// 				data.steps,
	// 				data.recipeId,
	// 			]
	// 		)
	// 			.then((result) => {
	// 				resolve(result);
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 			});
	// 	});
	// },

	// // Update recipe image
	// updateImage: (data) => {
	// 	return new Promise((resolve, reject) => {
	// 		db.query(
	// 			`UPDATE recipe SET image = '${data.image}' WHERE id_recipe = '${data.recipeId}'`
	// 		)
	// 			.then((result) => {
	// 				resolve(result);
	// 			})
	// 			.catch((error) => {
	// 				reject(error);
	// 			});
	// 	});
	// },

	// view count
	viewCount: (recipeId) => {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE recipe SET view_count = view_count + 1 WHERE id_recipe = '${recipeId}'`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// liked count increment
	likedCountIncr: (recipeId) => {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE recipe SET liked_count = liked_count + 1 WHERE id_recipe = '${recipeId}'`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// saved count increment
	savedCountIncr: (recipeId) => {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE recipe SET saved_count = saved_count + 1 WHERE id_recipe = '${recipeId}'`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// liked count decrement
	likedCountDecr: (recipeId) => {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE recipe SET liked_count = liked_count - 1 WHERE id_recipe = '${recipeId}'`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// saved count decr
	savedCountDecr: (recipeId) => {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE recipe SET saved_count = saved_count - 1 WHERE id_recipe = '${recipeId}'`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// delete recipe
	deleteRecipe: (recipeId) => {
		return new Promise((resolve, reject) => {
			db.query(`DELETE FROM recipe WHERE id_recipe = '${recipeId}'`)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// insert user liked
	addLikedRecipe: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`INSERT INTO liked (id_user, id_recipe)
			VALUES
			('${data.userId}', '${data.recipeId}')`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Check liked
	checkUserLike: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM liked WHERE id_user = '${data.userId}' AND id_recipe = '${data.recipeId}'`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// delete user liked
	removeUserLiked: (recipeId) => {
		return new Promise((resolve, reject) => {
			db.query(`DELETE FROM liked WHERE id_recipe = '${recipeId}'`)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// insert user saved
	addSavedRecipe: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`INSERT INTO saved (id_user, id_recipe)
			VALUES
			('${data.userId}', '${data.recipeId}')`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Check liked
	checkUserSaved: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM saved WHERE id_user = '${data.userId}' AND id_recipe = '${data.recipeId}'`
			)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// delete user liked
	removeUserSaved: (recipeId) => {
		return new Promise((resolve, reject) => {
			db.query(`DELETE FROM saved WHERE id_recipe = '${recipeId}'`)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
};

module.exports = recipeModel;
