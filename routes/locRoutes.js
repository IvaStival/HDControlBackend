import express from "express";
import Localization from "../controllers/locController.js";

const locRoutes = express.Router();

locRoutes.post("/new", Localization.createLoc);
locRoutes.patch("/update/:id", Localization.updateLoc);
locRoutes.delete("/delete/:id", Localization.deleteLoc);
locRoutes.get("/locs", Localization.getLocs);
locRoutes.get("/loc/:id", Localization.getLocById);

export default locRoutes;
