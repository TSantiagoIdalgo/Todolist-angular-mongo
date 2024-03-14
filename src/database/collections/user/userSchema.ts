import { Schema } from 'mongoose';
import { IUser } from '@/types/user/user';
import mongoose from 'mongoose';

const userSchema = new Schema<IUser>({
  userName: {
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true
  },
  password: {
    type: String, 
    required: true 
  },
  verify: {
    type: Boolean, 
    required: true,
    default: false
  },
  image: {
    type: String,
    required: false,
  }
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;