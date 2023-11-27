import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.get('/user', userController.createUser);

export default router;
