import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  res.send("admin Login Reached!");
});

router.get("/details", (req, res) => {
  res.send("Admin details are sent!");
});

export default router;
 
