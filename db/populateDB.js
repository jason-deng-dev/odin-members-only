require('dotenv').config();
const { Client } = require('pg');

const SQL = `
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 255 ),
  last_name VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  password VARCHAR ( 255 ),
  membership_status BOOLEAN DEFAULT false,
  isAdmin BOOLEAN DEFAULT false
);

CREATE TABLE messages (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  content TEXT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;


async function main() {
	console.log('seeding...');
	const client = new Client({
		connectionString: process.env.EXTERNAL_DATABASE_URL,
		ssl: { rejectUnauthorized: false },
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('done');
}

main();
