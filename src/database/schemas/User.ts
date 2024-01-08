import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt'; // For hashing passwords

// Define the User schema
export interface UserDocument extends Document {
    email: string;
    password: string;
    username:string;
    username_case:string;
    profile_pic:string;
    first_name:string;
    middle_name:string;
    last_name:string;
    bio:string;
    created_at:Date;
    updated_at:Date;

    // Define other properties here if needed
}

const userSchema = new Schema<UserDocument>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: {
      type: String, lowercase: true, required: true, unique: true, immutable: true,
    },
    username_case: { type: String, required: true },
    profile_pic: { type: String },
    first_name: { type: String, maxlength: 20 },
    middle_name: { type: String, maxlength: 20 },
    last_name: { type: String, maxlength: 20 },
    bio: { type: String, maxlength: 240 },
    created_at: { type: Date, default: Date.now, immutable: true },
    updated_at: { type: Date }
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

// Remove the password field from the response
userSchema.methods.hideSensitiveInfo = function () {
    const user = this.toObject();
    delete user.password; // Remove the password field from the response
    return user;
  };

// Create and export the User model
const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
