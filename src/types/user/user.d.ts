import { Document } from 'mongoose';

export interface IUser extends Document {
    userName: string
    email: string
    password: string
    verify: boolean
    image: string | null
    token?: string
}

export interface IUserLogin {
    name: string, 
    email: string, 
    csrfToken: string
}