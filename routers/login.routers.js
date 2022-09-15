import express from "express";
import * as loginController from "../controllers/login.controllers.js";

const router = express.Router();

router.post("/login", loginController.create);

export default router;