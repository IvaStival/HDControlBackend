import express from "express";

import userCrtl from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/register", userCrtl.registerUser);
userRoutes.post("/login", userCrtl.loginUser);
userRoutes.post("/logout", userCrtl.logoutUser);
userRoutes.delete("/delete/:id", userCrtl.deleteUser);
userRoutes.get("/isauth", userCrtl.isAuth);

export default userRoutes;
