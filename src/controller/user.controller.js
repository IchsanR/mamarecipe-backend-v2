const userModel = require("../model/user.model");
const {
	success,
	failed,
	failedAddData,
	failedUpdateData,
	failedNotFound,
} = require("../helper/file.response");
const { v4: uuidv4 } = require("uuid");
const { hash, compare } = require("bcrypt");
const { generateToken, expiredToken } = require("../helper/auth.helper");

const userController = {
	// get all user
	getAllUser: (req, res) => {
		try {
			userModel
				.getAllUser()
				.then((response) => {
					response.rows.map((item) => delete item.password);
					success(res, response.rows, "Success", "User Berhasil Didapatkan");
				})
				.catch((error) => {
					failed(res, error.message, "Failed", "User Gagal Didapatkan");
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},

	// Get user by id
	getUserId: async (req, res) => {
		try {
			const { userId } = req.params;

			await userModel
				.getUserId(userId)
				.then((response) => {
					delete response.rows[0].password;
					success(res, response.rows, "Success", "User Berhasil Didapatkan");
				})
				.catch((error) => {
					failed(res, error.message, "Failed", "User Gagal Didapatkan");
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
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

			await userModel.accountCheck(data.email).then((response) => {
				if (response.rowCount === 0) {
					userModel
						.registerAccount(data)
						.then((response) => {
							success(
								res,
								response.rows,
								"Success",
								"Akun Berhasil Didaftarkan"
							);
						})
						.catch((error) => {
							failedAddData(
								res,
								error.message,
								"Failed",
								"Gagal Registrasi Akun"
							);
						});
				} else {
					failedAddData(res, null, "Failed", "Email Telah Terdaftar");
				}
			});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},

	// Login user
	userLogin: async (req, res) => {
		try {
			const { email, password } = req.body;

			await userModel.accountCheck(email).then((response) => {
				if (response.rowCount === 1) {
					const user = response.rows[0];
					compare(password, user.password).then((response) => {
						if (response) {
							const token = generateToken({
								userId: user.id_user,
								email: user.email,
								name: user.name,
							});
							delete user.password;
							success(
								res,
								{
									token,
									user,
								},
								"Success",
								"Login Berhasil"
							);
						} else {
							failedNotFound(res, null, "Failed", "Email dan Password Salah");
						}
					});
				} else {
					failedNotFound(res, null, "Failed", "Email dan Password Salah");
				}
			});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
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
				.then((response) => {
					const user = response.rows[0];
					const token = expiredToken({
						userId: user.id_user,
						email: user.email,
					});

					delete user.password;
					success(res, token, "Success", "User ditemukan");
				})
				.catch((error) => {
					failedNotFound(
						res,
						error.message,
						"Failed",
						"Periksa Kembali Email dan No. Telpon"
					);
				});
		} catch (error) {
			failed(res, null, "Error", "Internal Server Error");
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
				.then((response) => {
					success(res, response.rows, "Success", "Update Data Berhasil");
				})
				.catch((error) => {
					failedUpdateData(res, error.message, "Failed", "Data Gagal Diupdate");
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},

	// update profile pic
	updatePicture: async (req, res) => {
		try {
			const image = req.file.filename;
			const { userId } = req.decoded;
			const data = {
				profile_pic: image,
				userId,
			};

			await userModel
				.updatePicture(data)
				.then((response) => {
					success(res, response.rows, "Success", "Update Data Berhasil");
				})
				.catch((error) => {
					failedUpdateData(res, error.message, "Failed", "Data Gagal Diupdate");
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
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

			await userModel.accountCheck(email).then((response) => {
				if (response.rowCount === 1) {
					const user = response.rows[0];
					compare(oldPassword, user.password).then((response) => {
						if (response) {
							userModel
								.passwordUpdate(data)
								.then((response) => {
									success(
										res,
										response.rows,
										"Success",
										"Password Berhasil di Update"
									);
								})
								.catch((error) => {
									failedUpdateData(
										res,
										error.message,
										"Failed",
										"Password Gagal diganti"
									);
								});
						} else {
							failedNotFound(res, null, "Failed", "Password Lama Tidak Sesuai");
						}
					});
				} else {
					failedNotFound(res, null, "Failed", "Email Tidak Terdaftar");
				}
			});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
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
				.then((response) => {
					success(res, response.rows, "Success", "Password Berhasil Diganti");
				})
				.catch((error) => {
					failedUpdateData(
						res,
						error.message,
						"Failed",
						"Password Gagal Diupdate"
					);
				});
		} catch (error) {
			failed(res, null, "Error", "Internal Server Error");
		}
	},

	// Delete account
	deleteAccount: async (req, res) => {
		try {
			const { userId } = req.decoded;

			await userModel
				.deleteAccount(userId)
				.then((response) => {
					success(res, response.rows, "Success", "Akun Berhasil di Hapus");
				})
				.catch((error) => {
					failedUpdateData(res, error.message, "Failed", "Akun Gagal di Hapus");
				});
		} catch (error) {
			failed(res, error.message, "Error", "Internal Server Error");
		}
	},
};

module.exports = userController;
