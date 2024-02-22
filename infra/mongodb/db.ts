// db.ts
import mongoose from 'mongoose';

//mongoose.connect('mongodb://localhost:27017/mern-stack-server')
mongoose.connect('mongodb+srv://shilpa:9lCdA9w4aFHvgryM@cluster0.rzc6tjh.mongodb.net/?retryWrites=true&w=majority')

    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
