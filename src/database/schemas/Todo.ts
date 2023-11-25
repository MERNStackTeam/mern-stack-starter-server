// Todo.ts
import { Schema, model, Document } from 'mongoose';

export interface Todo extends Document {
    title: string;
    completed: boolean;
}

const todoSchema = new Schema<Todo>({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

export default model<Todo>('Todo', todoSchema);
