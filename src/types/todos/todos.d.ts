import { Document } from 'mongoose';

export interface TODOsDocument extends Document {
    name: string;
    description?: string;
    status: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}