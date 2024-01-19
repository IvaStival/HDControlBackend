import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/userModel.js";
import e from "express";

const passportConfig = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });

  passport.use(
    "local",
    new LocalStrategy(
      {
        // By default, LocalStrategy expects to find credentials in parameters named username and password. If your site prefers to name these fields differently,
        // options are available to change the defaults.
        usernameField: "email",
        passwordField: "password",
      },

      async (email, passwd, done) => {
        await User.findOne({ email: email })
          .then(async (user) => {
            if (!user) {
              return done(null, false, {
                message: "Email or Password invalid!",
              });
            } else {
              const is_match = await user.comparePassword(passwd);

              if (!is_match) {
                return done(null, false, {
                  message: "Email or Password invalid!",
                });
              } else {
                return done(null, user);
              }
            }
          })
          .catch((err) => {
            return done(null, false, { message: err });
          });
      }
    )
  );
};

export default passportConfig;
