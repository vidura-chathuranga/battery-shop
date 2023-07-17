import express from "express";
import { validateAdmin, validateWorkerAndAdmin } from "../middlewares/authMiddleware.js";
import {addBatteries, getAllItems,updateBattery,deleteBattery, rejectStock} from '../controllers/battery.controller.js';

const router = express.Router();

router.get("/",validateWorkerAndAdmin,getAllItems);
router.post("/add", validateWorkerAndAdmin,addBatteries);
router.put("/update/:id", validateWorkerAndAdmin,updateBattery);
router.delete("/delete/:id/:reason",validateWorkerAndAdmin,deleteBattery);
router.delete("/reject/:id",validateAdmin,rejectStock);

export default router;

