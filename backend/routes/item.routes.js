import express from "express";
import { validateWorkerAndAdmin } from "../middlewares/authMiddleware.js";
import {addBatteries} from '../controllers/battery.controller.js';

const router = express.Router();

router.post("/add", validateWorkerAndAdmin,addBatteries);

export default router;

// const Routes = (app) => {

//     app.post("/batteries", validateWorkerAndAdmin,batteriesController.addBatteries);

// };

// module.exports = Routes;
