import { Router } from 'express';
import * as todoController from '../controllers/todoController';

const router = Router();

router.get('/todos', todoController.getAllTodos);
router.post('/todos', todoController.createTodo);
router.put('/todos/:id', todoController.updateTodo);

export default router;
