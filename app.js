// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

//Passport config
const passport = require('passport')
require('./config/passport')(passport)


// default value for title local
const projectName = "LifesABeach";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with Ironlauncher`;

// Session:
//----------------------------------------------------------------------

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // in milliseconds
    },
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGODB_URI || "mongodb://localhost/LifesABeach",
      ttl: 24 * 60 * 60, // 1 day => in seconds
    }),
  })
);

//By default it will create a  sessions collection in that DB

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// 👇 Start handling routes here
app.use("/", require("./routes/index"));

app.use("/", require("./routes/auth.routes"));

app.use("/auth", require("./routes/auth.routes"));


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
