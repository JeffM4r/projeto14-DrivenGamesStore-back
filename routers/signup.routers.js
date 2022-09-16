import express from "express";
import { signUpValidation } from "../middlewares/schemaValidationMiddlewares.js";
import * as signupController from "../controllers/signup.controllers.js";

const router = express.Router();

router.post("/signup",signUpValidation, signupController.create);

export default router;