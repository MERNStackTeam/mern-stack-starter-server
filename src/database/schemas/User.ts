import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt'; // For hashing passwords

// Define the User schema
export interface UserDocument extends Document {
    email: string;
    password: string;
    // Define other properties here if needed
}

const userSchema = new Schema<UserDocument>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add other properties as needed
});

// Hash the password before saving to the database
userSchema.pre<UserDocument>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

// Define a method to validate password
userSchema.methods.validatePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
