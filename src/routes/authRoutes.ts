import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

router.post('/registerusers', authController.registerUser);
//router.post('/userassign', authController.createUserAssign);
//router.put('/userassign/:id', authController.updateUserAssign);


export default router;
