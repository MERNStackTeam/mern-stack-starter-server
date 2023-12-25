import User from '../database/schemas/User';
import {NextFunction, Request, Response} from "express";
import mongoose from 'mongoose';
import {errorHandler} from "./todoController"; // Import your User model

// Example of using the User model to create a new user
export const createUser =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email,password,username,username_case,profile_pic,first_name,middle_name,
            last_name,bio,created_at,updated_at } = req.body;
        // Perform validation if needed

        const newUser = await User.create({ email,password,username,username_case,profile_pic,first_name,middle_name,
            last_name,bio,created_at,updated_at });
        res.status(201).json(newUser);
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        
        const {email,password,username,username_case,profile_pic,first_name,middle_name,
            last_name,bio } = req.body;
        const updated_at = Date.now();
        console.log(updated_at)
        // Perform validation and sanitize if needed
        const isValidObjectId = mongoose.isValidObjectId(id);
        if (!isValidObjectId) {
        return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Convert the string ID to a valid ObjectId
        const objectId = new mongoose.Types.ObjectId(id);
        const updatedUser = await User.findByIdAndUpdate( { _id: objectId }, // Assuming objectId is a valid ObjectId
        { $set:email,password,username,username_case,profile_pic,first_name,middle_name,
            last_name,bio,updated_at}, { new: true });
        console.log(updatedUser)
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        errorHandler(err, req, res, next);
    }
};

//export const getAllUsers = async (req: Request, res: Response) => {
//    try {
//        const todos = await User.find();
//        res.json(todos);
//    } catch (err: any) {
//        res.status(500).json({ message: err.message });
//    }
//};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const id = req.query.id;

        if (!id) {
            // If no ID is provided, fetch all users
            const users = await User.find();
            return res.json(users);
        }

        // Validate and sanitize the provided ID
        if (!mongoose.isValidObjectId(id as string)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Convert the string ID to a valid ObjectId
        const objectId = new mongoose.Types.ObjectId(id as string);

        // Fetch a specific user by ID using $eq for explicitness
        const user = await User.findById(objectId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user as an array with a single element
        return res.json([user]);
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};
