import express from "express";
import { loginValidation } from "../middlewares/schemaValidationMiddlewares.js";
import * as loginController from "../controllers/login.controllers.js";

const router = express.Router();

router.post("/signin",loginValidation, loginController.create);

export default router;