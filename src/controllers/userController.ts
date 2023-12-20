import User from '../database/schemas/User';
import {NextFunction, Request, Response} from "express";
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
        // Perform validation if needed
        console.log(req.body)
        const updatedUser = await User.findByIdAndUpdate(id, { email,password,username,username_case,profile_pic,first_name,middle_name,
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
        console.log(req.query)
        const id = req.query.id; // Assuming the user ID is in the request parameters

        if (id) {
            // If ID is provided, fetch a specific user by ID
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json(user);
        } else {
            // If no ID is provided, fetch all users
            const users = await User.find();
            return res.json(users);
        }
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

