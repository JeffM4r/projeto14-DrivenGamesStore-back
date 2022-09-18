import express from "express";
import * as productController from "../controllers/products.controllers.js";
import hasValidToken from "../middlewares/tokenValidationMiddleware.js";

const router = express.Router();

router.get("/products",hasValidToken, productController.list);
router.get("/products/:productId", hasValidToken, productController.listOne);
router.post("/products/:productId", hasValidToken, productController.addInCart);
router.get("/productsincart",hasValidToken, productController.showCart);

export default router;