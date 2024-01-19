import express from "express";

import HdCtrl from "../controllers/hdController.js";

const hdRoutes = express.Router();

hdRoutes.post("/new", HdCtrl.createHd);
hdRoutes.patch("/hd/:id", HdCtrl.updateHd);
hdRoutes.delete("/hd/:id", HdCtrl.deleteHd);
hdRoutes.get("/hds", HdCtrl.getHds);
hdRoutes.get("/hds/:id", HdCtrl.getHdById);

// module.exports = router;

export default hdRoutes;
