// server.ts
import * as bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan'; // Import morgan for request logging
import cors from 'cors';

import { Request, Response } from 'express';
import environment from './environment';
import todoRoutes from './src/routes/todoRoutes';
import userRoutes from './src/routes/userRoutes';
import roleRoutes from './src/routes/roleRoutes';
import userAssignRoutes from './src/routes/userAssignRoutes';
import authRoutes from './src/routes/authRoutes';
import './infra/mongodb/db'; // Import MongoDB connection

const {PORT, ORIGIN} = environment;
const app = express();

// Use morgan middleware for logging requests to the console
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: ORIGIN, // Use ORIGIN variable from environment for CORS origin
}));

app.get('/', (_req: Request, res: Response) => {
    res.send('Server is running!');
});

app.use('/api', todoRoutes);
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', userAssignRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

