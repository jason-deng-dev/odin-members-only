members-only/
├── app.js                  # express setup, middleware, mount routes
├── .env
├── .gitignore
├── config/
│   └── passport.js         # LocalStrategy, serialize/deserialize
├── controllers/
│   ├── authController.js   # signup, login, logout
│   ├── messageController.js # create, delete messages
│   └── memberController.js  # join club logic
├── db/
│   └── pool.js             # just the Pool instance
├── routes/
│   ├── authRouter.js       # /sign-up, /log-in, /log-out
│   ├── memberRouter.js     # /join
│   └── messageRouter.js    # /, /create, /delete
├── views/
│   ├── partials/
│   │   └── errors.ejs
│   ├── index.ejs
│   ├── sign-up.ejs
│   ├── log-in.ejs
│   ├── join.ejs
│   └── createMessage.ejs
└── package.json