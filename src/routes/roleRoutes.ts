import { Router } from 'express';
import * as roleController from '../controllers/roleController';

const router = Router();

router.get('/roles', roleController.getAllRoles);
router.post('/roles', roleController.createRoles);
router.put('/roles/:id', roleController.updateRoles);


export default router;
