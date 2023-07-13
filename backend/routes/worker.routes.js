import express from "express";
import { logout, workerLogin } from "../controllers/worker.controller.js";
import { validateWorkerAndAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", workerLogin);

router.get(`/logout`,validateWorkerAndAdmin,logout);

export default router;