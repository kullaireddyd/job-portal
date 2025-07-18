import express from "express";
import {
  applyToJob,
  getAllApplications,
  getApplicationById
} from "../controllers/appController";

import { applicationValidationRules } from "../middlewares/validators/applicationValidator";
import { validateRequest } from "../middlewares/validators/validaterequest";

const router = express.Router();

// Apply to a job (with validation)
router.post("/:id/apply", applicationValidationRules, validateRequest, applyToJob);

// Get all applications
router.get("/", getAllApplications);

// Get application by ID
router.get("/:id", getApplicationById);

export default router;
