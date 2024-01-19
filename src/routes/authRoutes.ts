// authRoutes.ts
import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/register', authController);
router.post('/login', authController);
router.post('/refresh-token', authController);

export default router;
