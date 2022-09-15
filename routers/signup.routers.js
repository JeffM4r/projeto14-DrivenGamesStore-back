import express from "express";
import * as signupController from "../controllers/signup.controllers.js";

const router = express.Router();

router.post("/signup", signupController.create);

export default router;