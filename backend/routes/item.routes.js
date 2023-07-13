import express from "express";
import batteriesController from "../controllers/battery.controller";
import { validateWorkerAndAdmin } from "../middlewares/authMiddleware.js";


// const router = express.Router();

// router.post("/batteries", validateWorkerAndAdmin,batteriesController.addBatteries);

// export default router;

const Routes = (app) => {

    app.post("/batteries", validateWorkerAndAdmin,batteriesController.addBatteries);

};

module.exports = Routes;
