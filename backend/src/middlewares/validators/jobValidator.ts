import { body } from "express-validator";

export const jobValidationRules = [
  body("job_title")
    .trim()
    .notEmpty().withMessage("Job title is required")
    .isLength({ max: 255 }).withMessage("Job title must be under 255 characters"),

  body("company_name")
    .trim()
    .notEmpty().withMessage("Company name is required")
    .isLength({ max: 255 }).withMessage("Company name must be under 255 characters"),

  body("location")
    .trim()
    .notEmpty().withMessage("Location is required")
    .isLength({ max: 255 }).withMessage("Location must be under 255 characters"),

  body("job_type")
    .trim()
    .notEmpty().withMessage("Job type is required")
    .isIn(["Full-time", "Part-time", "Contract", "Internship"]).withMessage("Invalid job type"),

  body("salary_range")
    .optional()
    .isLength({ max: 255 }).withMessage("Salary range must be under 255 characters"),

  body("job_description")
    .trim()
    .notEmpty().withMessage("Job description is required"),

  body("application_deadline")
    .notEmpty().withMessage("Application deadline is required")
    .isISO8601().withMessage("Deadline must be a valid date (YYYY-MM-DD)")
    .custom((value) => {
      const deadline = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // remove time
      if (deadline < today) {
        throw new Error("Deadline must be a future date");
      }
      return true;
    })
];
