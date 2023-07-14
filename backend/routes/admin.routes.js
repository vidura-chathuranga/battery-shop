import express from "express";
import {registerWorker} from "../controllers/owner.controller.js"
import { validateWorkerAndAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/details", (req, res) => {
  res.send("Admin details are sent!");
});

router.post(`/register`,registerWorker);



export default router;
 
