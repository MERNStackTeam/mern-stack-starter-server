import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import UserAssign, { UserAssignDocument } from '../database/schemas/UserAssign';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next: NextFunction) => {
    res.status(500).json({ message: (err as Error).message });
};

export const getAllUserAssign = async (req: Request, res: Response) => {
    try{

    const userId = req.query.userId; // Assuming the user ID is in the request parameters

    if (userId) {
        // If ID is provided, fetch a specific user by ID
        const userAssignment = await UserAssign.findOne({ user: userId });

        if (!userAssignment) {
            return res.status(404).json({ message: 'UserAssign not found' });
        }

        return res.json(userAssignment);
    } else {
        // If no ID is provided, fetch all users
        const users = await UserAssign.find();
        return res.json(users);
    }
} catch (err: any) {
    return res.status(500).json({ message: err.message });
}
};
export const createUserAssign = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, role } = req.body;
        // Perform validation if needed

        const newUserAssign: UserAssignDocument = await UserAssign.create({ user, role });
        res.status(201).json(newUserAssign);
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};

export const updateUserAssign = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { user, role } = req.body;
        const updated_at = Date.now();

        // Perform validation if needed
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const updatedUserAssign: UserAssignDocument | null = await UserAssign.findByIdAndUpdate(
            id,
            { user, role, updated_at },
            { new: true }
        );

        if (!updatedUserAssign) {
            return res.status(404).json({ message: 'UserAssign not found' });
        }

        res.json(updatedUserAssign);
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};
