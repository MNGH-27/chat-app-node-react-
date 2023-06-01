var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./../models/user/user.model");

passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
    },
    async function (username, password, done) {
      try {
        const user = await User.GetSingleUserByName(username);

        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: "User not found",
          });
        }

        // Return if password is wrong
        if (!User.validPassword(password, user.salt, user.hash)) {
          return done(null, false, {
            message: "Password is wrong",
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
