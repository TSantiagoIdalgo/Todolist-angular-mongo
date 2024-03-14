import mongoose, { Schema } from 'mongoose';
import { SessionDocument } from '@/types/user/session';

const sessionSchema = new Schema<SessionDocument>({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true
  },
  token: { 
    type: String, 
    required: true,
    unique: true, 
  },
  expiresAt: { 
    type: Date, 
    default: Date.now, 
    index: { 
      expires: '1d' 
    } 
  }
});

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;