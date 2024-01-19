import passport from "passport";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import mongoose, { Schema } from "mongoose";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const useExists = await User.findOne({ email });

  if (useExists) {
    return res.status(404).json({
      success: false,
      error: "User already Exists!",
    });
  }

  const user = new User({ name, email, password });

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User Registered",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "User doesn't registerd",
      });
    });
};

// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     return res.status(200).json({
//       success: true,
//       data: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         userToken: generateToken(user._id),
//       },
//     });
//   } else {
//     return res.status(404).json({
//       success: false,
//       error: "Wrong user or password!",
//     });
//   }
// };

const sessionSchema = new Schema({
  _id: String,
  expires: Date,
  session: String,
});

const loginUser = (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        res.status(400);
        res.send(err);
        return;
      }

      if (!user) {
        res.status(400);
        res.send(`Invalid Login: ${info.message}`);
        return;
      }

      req.logIn(user, async (err) => {
        if (err) {
          res.status(400);
          res.send(err);
          return;
        }

        const currentSessionId = req.session.id;
        var hdControlSession = mongoose.model(
          "Model",
          sessionSchema,
          "hdcontrolSession"
        );

        const userId = user._id.toString();

        await hdControlSession
          .find({
            session: new RegExp(`{"user":"${userId}"}`),
          })
          .then((sessions) => {
            sessions.forEach((session) => {
              if (session._id !== currentSessionId) {
                hdControlSession.deleteOne({ _id: session._id }).exec();
              }
            });
          });

        res.status(200);
        res.send({
          userToken: userId,
          isAuth: true,
          success: true,
        });
        return;
      });
    })(req, res, next);
  } catch (error) {
    console.log("Login Error");
    res.status(400);
    res.send(err);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    var hdControlSession = mongoose.model(
      "Model",
      sessionSchema,
      "hdcontrolSession"
    );

    const userId = JSON.stringify(req.session.passport);

    await hdControlSession
      .find({
        session: new RegExp(userId),
      })
      .then((sessions) => {
        sessions.forEach((session) => {
          hdControlSession.deleteOne({ _id: session._id }).exec();
        });

        res.status(200);
        res.send({
          userToken: null,
          isAuth: false,
          success: true,
          message: "User Loged out.",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400);
        res.send(error);
      });
  } catch (error) {
    console.log(`Logout Error ${error}`);
    res.status(400);
    res.send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted_user = await User.findByIdAndDelete({ _id: req.params.id });

    if (!deleted_user) {
      return res.status(404).json({
        success: false,
        error: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        name: deleted_user.name,
        email: deleted_user.email,
        id: deleted_user._id,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
};

const isAuth = async (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    try {
      res.send({
        success: true,
        isAuth: true,
        userToken: req.user,
      });
    } catch (error) {
      res.status(401);
      res.send({
        success: false,
        isAuth: false,
        userToken: null,
        message: "Unauthorized",
      });
    }
  } else {
    res.status(401);
    res.send({
      success: false,
      isAuth: false,
      userToken: null,
      message: "Unauthorized",
    });
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  isAuth,
};
