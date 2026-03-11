const pool = require('./pool');

exports.addUser = async (
	firstName,
	lastName,
	username,
	password,
	isAdmin,
) => {
	await pool.query(
		`INSERT INTO users (firstName, lastName, username, password, isAdmin) 
        VALUES ($1, $2, $3, $4, $5)`,
		[firstName, lastName, username, password, isAdmin],
	);
};
