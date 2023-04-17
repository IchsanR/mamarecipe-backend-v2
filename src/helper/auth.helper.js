const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET);
	return token;
};

const expiredToken = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: 60,
	});
	return token;
};

module.exports = { generateToken, expiredToken };
