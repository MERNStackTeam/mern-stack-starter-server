// todoRoutes.ts
import {Router, Request, Response, NextFunction} from 'express';
import Todo from '../database/schemas/Todo';

const router = Router();

import {ErrorRequestHandler} from 'express';

// Define the error handler with the correct type
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).json({message: (err as Error).message}); // Perform a type assertion to 'Error'
};

router.get('/todos', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err: any) { // Explicitly specifying 'err' as 'any'
        res.status(500).json({message: err.message});
    }
});

// POST /api/todos - Create a new todo
router.post('/todos', async (req: Request, res: Response, next) => {
    try {
        const {title, description} = req.body; // Assuming title and description are sent in the request body
        // Perform validation if needed

        const newTodo = await Todo.create({title, description}); // Create a new todo in your database
        res.status(201).json(newTodo); // Return the newly created todo in the response
    } catch (err) {
        errorHandler(err, req, res, next); // Use the error handler to send the error response
    }
});

// PUT /api/todos/:id - Update an existing todo
router.put('/todos/:id', async (req: Request, res: Response, next) => {
    try {
        const {id} = req.params;
        const {title, description} = req.body; // Assuming title and description are sent in the request body
        // Perform validation if needed

        const updatedTodo = await Todo.findByIdAndUpdate(id, {title, description}, {new: true}); // Update the todo in your database
        if (!updatedTodo) {
            return res.status(404).json({message: 'Todo not found'});
        }
        res.json(updatedTodo); // Return the updated todo in the response
    } catch (err) {
        errorHandler(err, req, res, next); // Use the error handler to send the error response
    }
});

export default router;
