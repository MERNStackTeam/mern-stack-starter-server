// authRoutes.ts
import express from 'express';
import rateLimit from 'express-rate-limit';

import exportCSVController from '../controllers/exportCSVController';

const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  
  // Apply the rate limiter to all routes
router.use(limiter);

router.post('/exportcsv', exportCSVController);
router.get('/getAllCollectionNames', exportCSVController);
router.get('/getAllHeaders', exportCSVController);

router.post('/uploadcsv', exportCSVController);




export default router;
