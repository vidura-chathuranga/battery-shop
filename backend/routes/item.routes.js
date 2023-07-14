import express from "express";
import { validateWorkerAndAdmin } from "../middlewares/authMiddleware.js";
import {addBatteries, getAllItems,updateBattery} from '../controllers/battery.controller.js';

const router = express.Router();

router.get("/",validateWorkerAndAdmin,getAllItems);
router.post("/add", validateWorkerAndAdmin,addBatteries);
router.put("/update/:id", validateWorkerAndAdmin,updateBattery);

export default router;

// const Routes = (app) => {

//     app.post("/batteries", validateWorkerAndAdmin,batteriesController.addBatteries);

// };

// module.exports = Routes;
