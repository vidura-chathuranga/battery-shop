import express from "express";
const router = express.Router();



router.get("/details", (req, res) => {
  res.send("Admin details are sent!");
});

export default router;
 
