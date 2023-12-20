import { Router } from 'express';
import * as userAssignController from '../controllers/userAssignController';

const router = Router();

router.get('/userassign', userAssignController.getAllUserAssign);
router.post('/userassign', userAssignController.createUserAssign);
router.put('/userassign/:id', userAssignController.updateUserAssign);


export default router;
