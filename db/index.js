import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// "mongodb://localhost:27017/hdcontrol"

mongoose
  .connect(process.env.MONGODB_CONNECT_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Just Connected!!");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

export default db;
