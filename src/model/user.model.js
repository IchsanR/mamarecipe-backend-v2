const db = require("../config/db");

const userModel = {
	// get all user
	getAllUser: () => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM users`)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Get user by ID
	getUserId: (userId) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM users WHERE id_user = '${userId}'`)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	//register user account
	registerAccount: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`INSERT INTO users (id_user, name, email, password, phone, profile_pic)
      VALUES
      ($1, $2, $3, $4, $5, $6)`,
				[
					data.id_user,
					data.name,
					data.email,
					data.password,
					data.phone,
					data.profile_pic,
				]
			)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Check account
	accountCheck: (email) => {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM users WHERE email = '${email}'`)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Check email and phone
	phoneEmailCheck: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM users WHERE email = '${data.email}' AND phone = '${data.phone}'`
			)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Update password
	passwordUpdate: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE users SET password = '${data.password}' WHERE id_user = '${data.userId}'`
			)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Update account
	updateAccount: (data) => {
		return new Promise((resolve, reject) => {
			db.query(
				`UPDATE users SET
			name = COALESCE ($1, name),
			email = COALESCE ($2, email),
			phone = COALESCE ($3, phone),
			profile_pic = COALESCE ($4, profile_pic)
			WHERE id_user = $5`,
				[data.name, data.email, data.phone, data.profile_pic, data.userId]
			)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// Delete Account
	deleteAccount: (userId) => {
		return new Promise((resolve, reject) => {
			db.query(`DELETE FROM users WHERE id_user = '${userId}'`)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
};

module.exports = userModel;
