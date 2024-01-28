// authRoutes.ts
import express from 'express';
import rateLimit from 'express-rate-limit';

import authController from '../controllers/authController';

const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  
  // Apply the rate limiter to all routes
router.use(limiter);

router.post('/register', authController);
router.post('/login', authController);
router.post('/refresh-token', authController);
router.post('/forgotpassword',authController);

export default router;
