import express from "express";
import {registerWorker} from "../controllers/owner.controller.js"
import { validateAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(`/register`,validateAdmin,registerWorker);



export default router;
 
