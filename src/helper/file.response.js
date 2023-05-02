module.exports = {
	response: (res, code, data, status, message) => {
		res.json({
			code,
			data,
			status,
			message,
		});
	},
};
