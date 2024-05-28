const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "User not found." });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.user.id);
      if (user === null) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
