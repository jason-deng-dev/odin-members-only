const pool = require('./pool');

exports.addUser = async (
	first_name,
	last_name,
	username,
	password,
	isAdmin,
) => {
	await pool.query(
		`INSERT INTO users (first_name, last_name, username, password, isAdmin) 
        VALUES ($1, $2, $3, $4, $5)`,
		[first_name, last_name, username, password, isAdmin],
	);
};

exports.getUserByUsername = async (username) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
}

exports.getUsersById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
}

exports.userToMember = async(id) => {
	await pool.query(`
		UPDATE users 
		SET membership_status = true
		WHERE id = $1
		`, [id])
}

exports.addMsg = async (userId, msgTitle, msgContent) => {
	await pool.query(`
		INSERT INTO messages (title, content, user_id)
		VALUES ($1, $2, $3)
		`, [msgTitle, msgContent, userId])
}

exports.getAllMsg = async () => {
	const {rows} = await pool.query(`
		SELECT messages.* , users.first_name, users.last_name
		FROM messages
		LEFT JOIN users ON users.id = messages.user_id
		`)
	return rows
}

exports.deleteMsg = async (msg_id) =>  {
	console.log(msg_id)
	await pool.query(`
		DELETE FROM messages
		WHERE id = $1`, [msg_id])
}