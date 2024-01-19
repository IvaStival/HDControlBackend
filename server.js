import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import passport from "passport";
import cookieParser from "cookie-parser";

import db from "./db/index.js";
import hdRoutes from "./routes/hdRoutes.js";
import locRoutes from "./routes/locRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import passportConfig from "./authentication/passport.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

const app = express();
const apiPort = process.env.PORT || 8082;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ************* TODO *****************
// THIS MUST TO BE STORED INSIDE A ENVIROMENT VARIABLE FILE
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    allowedHeaders: [
      "sessionId",
      "Content-Type",
      "Authorization",
      "credentials",
    ],
    exposedHeaders: ["sessionId"],
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
  })
);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "hdcontrolSession",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      // 1 WEEK
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      // mongoUrl: "mongodb://localhost:27017/hdcontrol",
      mongoUrl: process.env.MONGODB_CONNECT_CREATE,
      collectionName: "hdcontrolSession",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/hds", hdRoutes);
app.use("/locs", locRoutes);
app.use("/user", userRoutes);
app.use("/job", jobRoutes);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
