import { Document } from 'mongoose';

export interface TODOsDocument extends Document {
    name: string;
    description?: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}