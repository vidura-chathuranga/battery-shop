import express from "express";
import { logout, workerLogin , getAllWorkers } from "../controllers/worker.controller.js";
import { validateWorkerAndAdmin,validateAdmin  } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", workerLogin);

router.get(`/logout`,validateWorkerAndAdmin,logout);

router.get("/getworker",validateAdmin,getAllWorkers);


export default router;