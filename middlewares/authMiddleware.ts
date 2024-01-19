import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

interface User {
  id: number; // Adjust the properties based on your actual user model
  username: string;
  // Add any other properties your user model might have
}

const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: User | null) => {
    // Explicitly define the type of the 'err' and 'user' parameters
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

export default isAuthenticated;
