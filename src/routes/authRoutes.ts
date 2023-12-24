import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as authController from '../controllers/authController';

const router = Router();

// Apply rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  
  // Apply the rate limiter to all routes
router.use(limiter);

router.post('/registerusers', authController.registerUser);
//router.post('/userassign', authController.createUserAssign);
//router.put('/userassign/:id', authController.updateUserAssign);


export default router;
