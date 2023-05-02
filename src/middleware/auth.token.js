const jwt = require("jsonwebtoken");
const { response } = require("../helper/file.response");
const { JWT_SECRET } = require("../helper/env");

const jwtAuth = (req, res, next) => {
	try {
		const { token } = req.headers;
		if (token) {
			const decoded = jwt.verify(token, JWT_SECRET);
			req.decoded = decoded;
			next();
		} else {
			response(res, 404, null, "Error", "Token Not Found");
		}
	} catch (error) {
		if (error.name === "JsonWebTokenError")
			return response(res, 401, error.message, "Failed", "Token is Invalid");
		if (error.name === "TokenExpiredError")
			return response(res, 408, error.message, "Failed", "Token is Expired");

		next(response(res, 500, error.message, "Failed", "Internal Server Error"));
	}
};

module.exports = jwtAuth;
