import { Request, Response, NextFunction } from 'express';
import Todo from '../database/schemas/Todo';
import { ErrorRequestHandler } from 'express';
import {errorHandler} from "../handlers/errorHandler";

export const getAllTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description } = req.body;
        // Perform validation if needed

        const newTodo = await Todo.create({ title, description });
        res.status(201).json(newTodo);
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        // Perform validation if needed

        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo);
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};
