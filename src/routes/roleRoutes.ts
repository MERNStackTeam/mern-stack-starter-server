import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as roleController from '../controllers/roleController';


const router = Router();
// Apply rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  
  // Apply the rate limiter to all routes
router.use(limiter);

router.get('/roles', roleController.getAllRoles);
router.post('/roles', roleController.createRoles);
router.put('/roles/:id', roleController.updateRoles);


export default router;
