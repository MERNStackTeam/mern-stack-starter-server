// db.ts
import mongoose from 'mongoose';


// mongodb+srv://mongodb1:<password>@cluster0.ins7jpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb://localhost:27017/mern-stack-server

mongoose.connect('mongodb+srv://mongodb1:mongodb1@cluster0.ins7jpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
