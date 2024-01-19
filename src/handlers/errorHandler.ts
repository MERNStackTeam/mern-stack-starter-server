import { Request, Response, NextFunction } from 'express';
import Todo from '../database/schemas/Todo';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next: NextFunction) => {
    res.status(500).json({ message: (err as Error).message });
};
