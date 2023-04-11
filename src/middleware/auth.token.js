const jwt = require("jsonwebtoken");
const {
	failedNotFound,
	failed,
	failedExpired,
} = require("../helper/file.response");
const { JWT_SECRET } = require("../helper/env");

const jwtAuth = (req, res, next) => {
	try {
		const { token } = req.headers;
		if (token) {
			const decoded = jwt.verify(token, JWT_SECRET);
			req.decoded = decoded;
			next();
		} else {
			res.json({
				message: "token not found",
			});
		}
	} catch (error) {
		if (error.name === "JsonWebTokenError") {
			next(failedNotFound(res, error.message, "Failed", "token is invalid"));
		} else if (error.name === "TokenExpiredError") {
			next(failedExpired(res, error.message, "Failed", "Token is Expired"));
		} else {
			next(failed(res, error.message, "Failed", "Internal Server Error"));
		}
	}
};

module.exports = jwtAuth;
