const pg = require("pg");
const {
	DB_HOSTNAME,
	DB_NAME,
	DB_PASSWORD,
	DB_PORT,
	DB_USERNAME,
} = require("../helper/env");

const db = new pg.Pool({
	host: DB_HOSTNAME,
	user: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME,
	port: DB_PORT,
});

db.connect((err) => {
	err ? console.log(err) : console.log("database terhubung");
});

module.exports = db;
