import { Schema } from 'mongoose'
import Abstract from './Abstract'

export interface IUser {
  id?: string
  _id?: string
  token?: string
  name: string
  email: string
  password: string
  location: {
    neighborhood: string
    city: string
    state: string
    country: string
  }
}

export default class User extends Abstract<IUser> {
  constructor() {
    super(
      new Schema<IUser>({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        location: {
          type: {
            neighborhood: String,
            city: String,
            state: String,
            country: String,
          },
          required: true,
        },
      }),
      'User',
    )
  }
}
