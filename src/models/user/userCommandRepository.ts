import { sendVerifyMail } from '../../mailService/mail/mail.services';
import { API_SECRET } from '../../config/api';
import { IUser } from '@/types/user/user';
import UserModel from '../../database/collections/user/userSchema';
import SessionModel from '../../database/collections/user/sessionSchema';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import HandleError from '../../helpers/error';

export default class UserCommandRepository {
  public async create (userName: string, email: string, password: string, image?: string) {
    const userFind = await UserModel.findOne({ email });
    if (userFind) throw new Error('User already exists');
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      userName,
      email,
      password: passwordHash,
      verify: false,
      image: image ? image : null
    });

    const token = Jwt.sign({ email }, API_SECRET);
    await sendVerifyMail(email, userName, token);

    return newUser;
  }

  public async update (userId: string, user: IUser) {
    const userFind = await UserModel.findOneAndUpdate(
      { email: userId },
      { user },
      { new: true }
    );
    if (!userFind) throw new HandleError(404, 'BAD_REQUEST', { reason: 'User not found' });

    return userFind;
  }

  public delete (userId: string) {
    return UserModel.findOneAndDelete({ email: userId }, { returnOriginal: true });
  }

  public async verify (token: string) {
    const user = Jwt.verify(token, API_SECRET) as IUser;

    if (!user) throw new HandleError(500, 'UNAUTHENTICATED', { reason: 'Invalid token' });
    const userFind = await UserModel.findOne({ email: user.email });

    if (!userFind) throw new HandleError(500, 'UNAUTHENTICATED', { reason: 'Invalid token' });

    userFind.verify = true;
    userFind.save();

    return userFind;
  }

  public async saveSession (csrf: string, userId: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await SessionModel.create({ user: userId, token: csrf, expiresAt: expiresAt });
  }
}