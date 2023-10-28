const userModel = require("../model/user.model");
const { response } = require("../helper/file.response");
const { v4: uuidv4 } = require("uuid");
const { hash, compare } = require("bcrypt");
const { generateToken, expiredToken } = require("../helper/auth.helper");
const cloudinary = require("../helper/cloudinary.helper");

const userController = {
	// get all user
	getAllUser: (req, res) => {
		try {
			userModel
				.getAllUser()
				.then((result) => {
					result.rows.map((item) => delete item.password);
					response(
						res,
						200,
						result.rows,
						"success",
						"success get user"
					);
				})
				.catch((error) => {
					res.status(404);
					response(res, 404, null, "failed", "user not found");
				});
		} catch (error) {
			res.status(500);
			response(res, 500, null, "error", "internal server error");
		}
	},

	// Get user by id
	getUserId: async (req, res) => {
		try {
			const { userId } = req.params;

			await userModel
				.getUserId(userId)
				.then((result) => {
					delete result.rows[0].password;
					response(
						res,
						200,
						result.rows,
						"success",
						"success get user"
					);
				})
				.catch((error) => {
					res.status(404);
					response(res, 404, null, "failed", "user not found");
				});
		} catch (error) {
			res.status(500);
			response(res, 500, null, "error", "internal server error");
		}
	},

	// register user account
	registerUser: async (req, res) => {
		try {
			const body = req.body;
			const hashedPassword = await hash(body.password, 10);
			const userId = uuidv4();
			const data = {
				id_user: userId,
				name: body.name,
				email: body.email,
				password: hashedPassword,
				phone: body.phone,
				profile_pic: null,
			};

			await userModel.accountCheck(data.email).then((result) => {
				if (result.rowCount === 0) {
					userModel
						.registerAccount(data)
						.then((result) => {
							response(
								res,
								200,
								result.rows,
								"success",
								"register account success"
							);
						})
						.catch((error) => {
							res.status(422);
							response(res, 422, null, "failed", "register failed");
						});
				} else {
					res.status(409);
					response(res, 409, null, "failed", "email has been registered");
				}
			});
		} catch (error) {
			res.status(500);
			response(res, 500, null, "error", "internal server error");
		}
	},

	// Login user
	userLogin: async (req, res) => {
		try {
			const { email, password } = req.body;

			await userModel.accountCheck(email).then((result) => {
				if (result.rowCount === 1) {
					const user = result.rows[0];
					compare(password, user.password).then((result) => {
						if (result) {
							const token = generateToken({
								userId: user.id_user,
								email: user.email,
								name: user.name,
							});
							delete user.password;
							response(
								res,
								200,
								{
									token,
									user,
								},
								"success",
								"login success"
							);
						} else {
							res.status(401);
							response(res, 401, null, "failed", "invalid credentials");
						}
					});
				} else {
					res.status(401);
					response(res, 401, null, "failed", "invalid credentials");
				}
			});
		} catch (error) {
			res.status(500);
			response(res, 500, null, "error", "internal server error");
		}
	},

	// Forget password
	checkEmailPhone: async (req, res) => {
		try {
			const body = req.body;
			const data = {
				email: body.email,
				phone: body.phone,
			};

			await userModel
				.phoneEmailCheck(data)
				.then((result) => {
					const user = result.rows[0];
					const token = expiredToken({
						userId: user.id_user,
						email: user.email,
					});

					delete user.password;
					response(res, 200, token, "success", "get user success");
				})
				.catch((error) => {
					res.status(404);
					response(
						res,
						404,
						null,
						"failed",
						"user not found"
					);
				});
		} catch (error) {
			res.status(500);
			response(res, 500, null, "error", "internal server error");
		}
	},

	// Update account
	updateAccount: async (req, res) => {
		try {
			const body = req.body;
			const { userId } = req.decoded;
			const data = {
				name: body.name,
				phone: body.phone,
				userId,
			};

			await userModel
				.updateAccount(data)
				.then((result) => {
					response(res, 200, result.rows, "success", "data updated");
				})
				.catch((error) => {
					res.status(409);
					response(res, 409, null, "failed", "update failed");
				});
		} catch (error) {
			res.status(500);
			response(res, 500, null, "error", "internal server error");
		}
	},

	// update profile pic
	updatePicture: async (req, res) => {
		try {
			const image = await cloudinary.uploader.upload(req.file.path);
			const { userId } = req.decoded;
			const data = {
				profile_pic: `${image.secure_url}|&&|${image.url}`,
				userId,
			};

			await userModel
				.updatePicture(data)
				.then((result) => {
					response(res, 200, result.rows, "success", "data updated");
				})
				.catch((error) => {
					res.status(409);
					response(res, 409, null, "failed", "update failed");
				});
		} catch (error) {
			res.status(500);
			response(res, 500, null, "error", "internal server error");
		}
	},

	// Update pasword
	updatePassword: async (req, res) => {
		try {
			const { password, oldPassword } = req.body;
			const { userId, email } = req.decoded;
			const data = {
				userId,
				password: await hash(password, 10),
			};

			await userModel.accountCheck(email).then((result) => {
				if (result.rowCount === 1) {
					const user = result.rows[0];
					compare(oldPassword, user.password).then((result) => {
						if (result) {
							userModel
								.passwordUpdate(data)
								.then((result) => {
									response(
										res,
										200,
										result.rows,
										"success",
										"password updated"
									);
								})
								.catch((error) => {
									res.status(500);
									response(res, 500, null, "failed", "update failed");
								});
						} else {
							res.status(409);
							response(res, 409, null, "failed", "password not match");
						}
					});
				} else {
					res.status(404);
					response(res, 404, null, "failed", "user not found");
				}
			});
		} catch (error) {
			res.status(500);
			response(res, 500, null, "error", "internal server error");
		}
	},

	// Forget Password
	forgetPassword: async (req, res) => {
		try {
			const { userId } = req.decoded;
			const password = await hash(req.body.password, 10);
			const data = {
				userId,
				password,
			};

			userModel
				.passwordUpdate(data)
				.then((result) => {
					response(
						res,
						200,
						result.rows,
						"success",
						"password updated"
					);
				})
				.catch((error) => {
					res.status(500);
					response(res, 500, null, "failed", "update failed");
				});
		} catch (error) {
			response(res, 500, error, "error", "internal server error");
		}
	},

	// Delete account
	deleteAccount: async (req, res) => {
		try {
			const { userId } = req.decoded;

			await userModel
				.deleteAccount(userId)
				.then((result) => {
					response(res, 200, result.rows, "success", "account deleted");
				})
				.catch((error) => {
					res.status(500);
					response(res, 500, null, "failed", "delete failed");
				});
		} catch (error) {
			res.status(500);
			response(res, 500, null, "Error", "internal server error");
		}
	},
};

module.exports = userController;
