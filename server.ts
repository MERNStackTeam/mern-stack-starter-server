// server.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import todoRoutes from './src/routes/todoRoutes';
import './infra/mongodb/db'; // Import MongoDB connection

const app: Application = express();
const PORT: number = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!');
});

app.use('/api', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
