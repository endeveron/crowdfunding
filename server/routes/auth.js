import express from 'express';
import { body } from 'express-validator';

import { signup, login } from '../controllers/auth.js';

const router = express.Router();

const baseCredentials = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 1, max: 30 }),
];

router.post(
  '/signup',
  [body('name').isLength({ min: 2, max: 20 }), ...baseCredentials],
  signup
);

router.post('/login', baseCredentials, login);

const authRoutes = router;

export { authRoutes };
