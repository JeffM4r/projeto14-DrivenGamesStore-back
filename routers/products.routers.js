import express from "express";
import * as productController from "../controllers/products.controllers.js";
import hasValidToken from "../middlewares/tokenValidationMiddleware.js";

const router = express.Router();

router.get("/products",hasValidToken, productController.list);

export default router;