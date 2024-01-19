// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    _id: string;
    username: string;
    password: string;
    // ... other fields
}

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    // ... other fields
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
