import User from '../database/schemas/User';
import {NextFunction, Request, Response} from "express";
import {errorHandler} from "./todoController"; // Import your User model

// Example of using the User model to create a new user
export const registerUser = async (req: Request, res: Response,next: NextFunction) => {

    try {
      if (!req || !req.body || !req.body.username || !req.body.password) {
        res.status(400).json({ message: 'Username and Password required' });
        return;
      }
  
      req.body.username_case = req.body.username;
      req.body.username = req.body.username.toLowerCase();
      console.log(req.body)
      const { username } = req.body;
      const existingUser = await User.findOne({ username :{ $eq: username }});
  
      if (existingUser) {
        res.status(400).json({ message: 'Username exists' });
        return;
      }
  
      const newUser = new User(req.body);
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
      errorHandler(err, req, res, next);
    }
  };
   