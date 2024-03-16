import mongoose, { Schema } from 'mongoose';
import { TODOsDocument } from '@/types/todos/todos';

const TODOsSchema = new Schema<TODOsDocument>({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: false
  },
  status: { 
    type: Boolean, 
    required: true,
    default: true
  },
  userId: {
    type: String,
    required: true
  }
}, { timestamps: true });

const TODOsModel = mongoose.model<TODOsDocument>('TODOs', TODOsSchema);

export default TODOsModel;