// todoRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import Todo from '../database/schemas/Todo';

const router = Router();

router.get('/todos', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err: any) { // Explicitly specifying 'err' as 'any'
        res.status(500).json({ message: err.message });
    }
});

export default router;
