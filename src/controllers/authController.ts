// authController.ts
import express, { Request, Response,NextFunction } from 'express';
import passport from 'passport';
import jwt, { VerifyErrors } from 'jsonwebtoken'; // Import VerifyErrors
import bcrypt from 'bcrypt';
import {errorHandler} from "../handlers/errorHandler";
import User, { UserDocument } from '../models/User'; // Import your user model

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({message: 'Username is already taken'});
        }
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user document in MongoDB
        const newUser = new User({
            username,
            password: hashedPassword,
        });
        // Save the user to the database
        await newUser.save();
        // Create and sign a JWT token
        const token = jwt.sign({sub: newUser._id, username}, 'your_jwt_secret_here', {expiresIn: '1h'});
        return res.json({token});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
});

router.post('/login', (req: Request, res: Response, next) => {
    passport.authenticate('local', { session: false }, async (err: Error, user: UserDocument | undefined) => {
        try {
            if (err || !user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // If authentication is successful, create and sign an access token
            const accessToken = jwt.sign({ sub: user._id, username: user.username }, 'your_jwt_secret_here', { expiresIn: '1h' });

            // Create and sign a refresh token
            const refreshToken = jwt.sign({ sub: user._id, username: user.username }, 'your_refresh_token_secret_here', { expiresIn: '7d' });

            return res.json({ accessToken, refreshToken });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.post('/refresh-token', async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken;

    // Verify the refresh token
    jwt.verify(refreshToken, 'your_refresh_token_secret_here', async (err: VerifyErrors | null, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // Check if the user exists (you may want to add additional checks)
        const user = await User.findById(decoded.sub);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // If the refresh token is valid, issue a new access token
        const accessToken = jwt.sign({ sub: user._id, username: user.username }, 'your_jwt_secret_here', { expiresIn: '1h' });

        // Return the new access token to the client
        return res.json({ accessToken });
    });
});

router.post('/forgotpassword', async (req: Request, res: Response,next: NextFunction) => {
    try {
         const { username, password } = req.body;
         // Validate username
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        // Validate password
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
         const hashedPassword = await bcrypt.hash(password, 10);
         console.log(hashedPassword)
         // Update the user's password
        const updatedUser = await User.findOneAndUpdate(
            { username: username },
             { $set: { password:hashedPassword, updated_at: Date.now() } },
             { new: true }
        );
 
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
         }
 
         // Respond with the updated user
         res.json(updatedUser);
     } catch (err) {
         // Handle other errors
        errorHandler(err, req, res,next);
     }
 });

export default router;
