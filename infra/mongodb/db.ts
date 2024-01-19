// db.ts
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/mern-stack-server')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
