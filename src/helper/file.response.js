module.exports = {
	success: (res, data, status, message) => {
		res.json({
			code: 200,
			data,
			status,
			message,
		});
	},
	failed: (res, error, status, message) => {
		res.json({
			code: 500,
			data: error,
			status,
			message,
		});
	},
	failedAddData: (res, error, status, message) => {
		res.json({
			code: 422,
			data: error,
			status,
			message,
		});
	},
	failedUpdateData: (res, error, status, message) => {
		res.json({
			code: 409,
			data: error,
			status,
			message,
		});
	},
	failedNotFound: (res, error, status, message) => {
		res.json({
			code: 404,
			data: error,
			status,
			message,
		});
	},
	failedExpired: (res, error, status, message) => {
		res.json({
			code: 408,
			data: error,
			status,
			message,
		});
	},
};
