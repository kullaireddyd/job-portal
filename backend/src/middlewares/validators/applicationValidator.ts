import { body } from 'express-validator';

export const applicationValidationRules = [
  body('name').notEmpty().withMessage('Applicant name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
];
