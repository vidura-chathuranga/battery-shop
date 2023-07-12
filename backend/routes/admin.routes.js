import express from "express";
import { workerLogin } from "../controllers/worker.controller.js";

const router = express.Router();

router.post("/login", workerLogin);

router.get("/details", (req, res) => {
  res.send("Admin details are sent!");
});

export default router;
 
