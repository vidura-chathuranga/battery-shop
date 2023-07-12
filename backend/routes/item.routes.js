import express from "express";
import {BatteryController} from "../controllers/battery.controller";

const router = express.Router();

router.post("/batteries", BatteryController);
