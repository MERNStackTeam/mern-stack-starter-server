import { Request, Response, NextFunction } from 'express';
import Roles, {RoleDocument} from '../database/schemas/Roles';
//import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import {errorHandler} from "../handlers/errorHandler";



//export const errorHandler: ErrorRequestHandler = (err, req, res, next: NextFunction) => {
//    res.status(500).json({ message: (err as Error).message });
//};

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const Role = await Roles.find();
        res.json(Role);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const createRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = req.body;
        // Perform validation if needed

        const newRole = await Roles.create({role});
        res.status(201).json(newRole);
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};

export const updateRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { role} = req.body;
        const updated_at = Date.now();
        // Perform validation and sanitize if needed
        const isValidObjectId = mongoose.isValidObjectId(id);
        if (!isValidObjectId) {
        return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Convert the string ID to a valid ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

        const updatedRole: RoleDocument | null = await Roles.findOneAndUpdate(
                { _id: objectId }, // Assuming objectId is a valid ObjectId
                { $set: {role, updated_at} },
            { new: true }
        );       
        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.json(updatedRole);
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};

export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        console.log(req)
        // Perform validation if needed
        const isValidObjectId = mongoose.isValidObjectId(id);
        if (!isValidObjectId) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Convert the string ID to a valid ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

        const result = await Roles.findByIdAndDelete(objectId);
        if (!result) {
            return res.status(404).json({ message: 'Role not found' });
        }

        // Check if result is an instance of RoleDocument
        const deletedRole: RoleDocument | null = result instanceof Roles ? result : null;

        if (!deletedRole) {
            return res.status(500).json({ message: 'Error deleting role' });
        }

        res.json({ message: 'Role deleted successfully' });
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};
