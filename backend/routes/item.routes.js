import express from "express";
import { validateWorkerAndAdmin } from "../middlewares/authMiddleware.js";
import {addBatteries, getAllItems,updateBattery,deleteBattery} from '../controllers/battery.controller.js';

const router = express.Router();

router.get("/",validateWorkerAndAdmin,getAllItems);
router.post("/add", validateWorkerAndAdmin,addBatteries);
router.put("/update/:id", validateWorkerAndAdmin,updateBattery);
router.delete("/delete/:id/:reason",validateWorkerAndAdmin,deleteBattery)

export default router;

// const Routes = (app) => {

//     app.post("/batteries", validateWorkerAndAdmin,batteriesController.addBatteries);

// };

// module.exports = Routes;
