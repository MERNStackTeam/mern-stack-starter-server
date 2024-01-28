import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as userController from '../controllers/userController';
import * as userDatagridController from '../controllers/userDatagridController';

const router = Router();

// Apply rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  
  // Apply the rate limiter to all routes
router.use(limiter);

// router.post('/user', userController.createUser);
// router.get('/user', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.get('/', userDatagridController.getUsers);

export default router;
