// server.ts
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import environment from './environment';
import todoRoutes from './src/routes/todoRoutes';
import userRoutes from './src/routes/userRoutes';
import roleRoutes from './src/routes/roleRoutes';
import userAssignRoutes from './src/routes/userAssignRoutes';
import authRoutes from './src/routes/authRoutes';
import exportcsvRoutes from './src/routes/exportcsvRoutes';
import rateLimit from 'express-rate-limit';
import './infra/mongodb/db'; // Import MongoDB connection
import './src/config/passport-config'; // Import your Passport.js configuration file
import isAuthenticated from './middlewares/authMiddleware'; // Import the authentication middleware
const {PORT, ORIGIN} = environment;
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

// Define rate limiting options
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
  });

// Routes
app.get('/', (_req: Request, res: Response) => {
    res.send('Server is running!');
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Apply the authentication middleware only to routes that require authentication
app.use('/api/todos', isAuthenticated, todoRoutes);
app.use('/api/users', isAuthenticated, userRoutes);
app.use('/api/roles', isAuthenticated, roleRoutes);
app.use('/api/user-assign', isAuthenticated, userAssignRoutes);
app.use('/api/export-csv',limiter, isAuthenticated, exportcsvRoutes);


// Server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
