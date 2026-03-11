const pool = require("./pool");

exports.addUser = async (username, password) => {
    await pool.query(
			'INSERT INTO users (username, password) VALUES ($1, $2)',
			[username, password],
		);
}