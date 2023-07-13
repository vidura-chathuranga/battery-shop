import express from "express";
import { adminLogin } from "../controllers/owner.controller.js";

const router = express.Router();



router.get("/details", (req, res) => {
  res.send("Admin details are sent!");
});

router.post("/login", adminLogin);



export default router;
 
