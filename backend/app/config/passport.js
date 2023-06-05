var passport = require("passport");

//import Strategy
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth2").Strategy;

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
            //User not found
            message: "The values entered are incorrect",
          });
        }

        // Return if password is wrong
        if (!User.validPassword(password, user.salt, user.hash)) {
          //Password is wrong
          return done(null, false, {
            message: "The values entered are incorrect",
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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("in google strategy function : ");

      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);
