import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt'; // For hashing passwords

// Define the Role schema
export interface RoleDocument extends Document {
    role: string;
    created_at:Date;
    updated_at:Date;

    // Define other properties here if needed
}

const roleSchema = new Schema<RoleDocument>({
    role: { type: String, maxlength: 20 },
    created_at: { type: Date, default: Date.now, immutable: true },
    updated_at: { type: Date },

    // Add other properties as needed
});

// Create and export the Role model
const Roles = mongoose.model<RoleDocument>('Roles', roleSchema);
export default Roles;
