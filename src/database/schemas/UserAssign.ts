import mongoose, { Schema, Document } from 'mongoose';

// Define the UserAssign schema
export interface UserAssignDocument extends Document {
    user: mongoose.Types.ObjectId; // Reference to User model
    role: mongoose.Types.ObjectId; // Reference to Roles model
    created_at: Date;
    updated_at: Date;
}

const userAssignSchema = new Schema<UserAssignDocument>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Roles', required: true },
    created_at: { type: Date, default: Date.now, immutable: true },
    updated_at: { type: Date, default: Date.now },
});

// Update the updated_at field before saving
userAssignSchema.pre<UserAssignDocument>('save', function (next) {
    this.updated_at = new Date();
    next();
});


// Create and export the UserAssign model
const UserAssign = mongoose.model<UserAssignDocument>('UserAssign', userAssignSchema);
export default UserAssign;
