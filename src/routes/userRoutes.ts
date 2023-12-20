import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.post('/user', userController.createUser);
router.get('/user', userController.getAllUsers);
router.put('/user/:id', userController.updateUser);
export default router;
