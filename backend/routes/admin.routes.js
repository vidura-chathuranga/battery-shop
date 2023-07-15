import express from "express";
import {registerWorker} from "../controllers/owner.controller.js"
import { validateAdmin } from "../middlewares/authMiddleware.js";
import { adminLogin } from "../controllers/owner.controller.js";

const router = express.Router();

router.post(`/register`,validateAdmin,registerWorker);



router.post("/login", adminLogin);



export default router;
 
