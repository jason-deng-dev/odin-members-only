const passport = require('passport');
const db = require('../db/queries');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await db.getUserByUsername(username);
			if (!user) {
				return done(null, false, {
					message: 'Incorrect username',
				});
			}

            const match = await bcrypt.compare(password, user.password);
			if (!match) {
				return done(null, false, {
					message: 'Incorrect password',
				});
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	}),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await db.getUsersById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

module.exports = passport;
