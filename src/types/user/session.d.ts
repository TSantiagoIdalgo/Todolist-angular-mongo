import mongoose, { Document } from 'mongoose';

export interface SessionDocument extends Document {
  user: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
}
