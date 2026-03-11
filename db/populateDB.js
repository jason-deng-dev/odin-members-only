require('dotenv').config();

const { Client } = require('pg');

const SQL = `
DROP TABLE IF EXISTS game_genre;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS genres;

CREATE TABLE IF NOT EXISTS games (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ) NOT NULL UNIQUE,
    release_year INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS game_genre (
    game_id INT,
    genre_id INT,
    PRIMARY KEY (game_id, genre_id),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

INSERT INTO genres (name) VALUES
  ('Action'),
  ('RPG'),
  ('Horror');

INSERT INTO games (title, release_year, price) VALUES
  ('Elden Ring', 2022, 59.99),
  ('GTA V', 2013, 29.99);

INSERT INTO game_genre (game_id, genre_id) VALUES
  (1, 1),
  (2, 2);
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
