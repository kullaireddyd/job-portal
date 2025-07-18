import express from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} from "../controllers/jobController";

import { jobValidationRules } from "../middlewares/validators/jobValidator";
import { validateRequest } from "../middlewares/validators/validaterequest";
const router = express.Router();

// CRUD routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", jobValidationRules, validateRequest, createJob);
router.put("/:id", jobValidationRules, validateRequest, updateJob);
router.delete("/:id", deleteJob);

export default router;
