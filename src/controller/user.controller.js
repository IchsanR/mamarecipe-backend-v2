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
						"Success",
						"User Berhasil Didapatkan"
					);
				})
				.catch((error) => {
					response(res, 404, error, "Failed", "User Gagal Didapatkan");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
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
						"Success",
						"User Berhasil Didapatkan"
					);
				})
				.catch((error) => {
					response(res, 404, error, "Failed", "User Gagal Didapatkan");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
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
								"Success",
								"Akun Berhasil Didaftarkan"
							);
						})
						.catch((error) => {
							response(res, 422, error, "Failed", "Gagal Registrasi Akun");
						});
				} else {
					response(res, 409, null, "Failed", "Email Telah Terdaftar");
				}
			});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
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
								"Success",
								"Login Berhasil"
							);
						} else {
							response(res, 404, null, "Failed", "Email dan Password Salah");
						}
					});
				} else {
					response(res, 404, null, "Failed", "Email dan Password Salah");
				}
			});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
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
					response(res, 200, token, "Success", "User ditemukan");
				})
				.catch((error) => {
					response(
						res,
						404,
						error,
						"Failed",
						"Periksa Kembali Email dan No. Telpon"
					);
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
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
					response(res, 200, result.rows, "Success", "Update Data Berhasil");
				})
				.catch((error) => {
					response(res, 409, error, "Failed", "Data Gagal Diupdate");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
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
					response(res, 200, result.rows, "Success", "Update Data Berhasil");
				})
				.catch((error) => {
					response(res, 409, error, "Failed", "Data Gagal Diupdate");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
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
										"Success",
										"Password Berhasil di Update"
									);
								})
								.catch((error) => {
									response(res, 409, error, "Failed", "Password Gagal diganti");
								});
						} else {
							response(res, 404, null, "Failed", "Password Lama Tidak Sesuai");
						}
					});
				} else {
					response(res, 404, null, "Failed", "Email Tidak Terdaftar");
				}
			});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
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
						"Success",
						"Password Berhasil Diganti"
					);
				})
				.catch((error) => {
					response(res, 409, error, "Failed", "Password Gagal Diupdate");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},

	// Delete account
	deleteAccount: async (req, res) => {
		try {
			const { userId } = req.decoded;

			await userModel
				.deleteAccount(userId)
				.then((result) => {
					response(res, 200, result.rows, "Success", "Akun Berhasil di Hapus");
				})
				.catch((error) => {
					response(res, 409, error, "Failed", "Akun Gagal di Hapus");
				});
		} catch (error) {
			response(res, 500, error, "Error", "Internal Server Error");
		}
	},
};

module.exports = userController;
