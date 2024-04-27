var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");

var indexRouter = require("./routes/index");
var app = express();

// Set up mongoose connection
require("./config/mongoConfig");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Set up session
const session = require("express-session");
const MongoStore = require("connect-mongo");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  })
);

// Set up authentication
require("./config/passport");

app.use(passport.session());

app.use("/", indexRouter);

module.exports = app;
