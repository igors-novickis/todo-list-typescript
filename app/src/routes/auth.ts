import { Router } from "express";
import AuthController from "../controller/AuthController";

import rateLimit = require("express-rate-limit");

// Request rate limiter, 100 requests in each 10 minutes allowed by one IP
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
});

const router = Router();
router.post("/login", limiter, AuthController.login);

export default router;
