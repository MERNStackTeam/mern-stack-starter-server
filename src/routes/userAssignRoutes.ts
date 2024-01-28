import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as userAssignController from '../controllers/userAssignController';

const router = Router();

// Apply rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  
  // Apply the rate limiter to all routes
router.use(limiter);

router.get('/', userAssignController.getAllUserAssign);
router.post('/', userAssignController.createUserAssign);
router.put('/:id', userAssignController.updateUserAssign);
router.delete('/:id', userAssignController.deleteUserAssign);



export default router;
