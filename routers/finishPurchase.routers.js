import express from 'express';
import hasValidToken from '../middlewares/tokenValidationMiddleware.js';
import { purchaseBodyValidation } from '../middlewares/schemaValidationMiddlewares.js';
import * as finishiPurchaseController from "../controllers/finishPurchase.controllers.js";

const router = express.Router();

router.post("/finishpurchase", hasValidToken, purchaseBodyValidation, finishiPurchaseController.receive);

export default router;