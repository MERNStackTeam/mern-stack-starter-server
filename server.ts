// server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import environment from './environment';
import todoRoutes from './src/routes/todoRoutes';
import userRoutes from './src/routes/userRoutes';
import roleRoutes from './src/routes/roleRoutes';
import userAssignRoutes from './src/routes/userAssignRoutes';
import authRoutes from './src/routes/authRoutes';
import './infra/mongodb/db'; // Import MongoDB connection

import isAuthenticated from './middlewares/authMiddleware'; // Import the authentication middleware

const { PORT, ORIGIN } = environment;

// Passport configuration
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret_here',
};

passport.use(new JwtStrategy(jwtOptions, (payload: any, done: (error: any, user?: any) => void) => {
    // Your user retrieval logic here
    // e.g., find user by ID in the database
    const user = { id: payload.sub, username: payload.username };

    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

// Express app configuration
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: ORIGIN, // Use ORIGIN variable from environment for CORS origin
}));
app.use(passport.initialize());

// Routes
app.get('/', (_req: Request, res: Response) => {
    res.send('Server is running!');
});

// Apply the authentication middleware only to routes that require authentication
app.use('/api/todos', isAuthenticated, todoRoutes);
app.use('/api/users', isAuthenticated, userRoutes);
app.use('/api/roles', isAuthenticated, roleRoutes);
app.use('/api/user-assign', isAuthenticated, userAssignRoutes);
app.use('/api/auth', authRoutes);

// Server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
