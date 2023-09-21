import jwt, { SignOptions } from 'jsonwebtoken'
import 'dotenv/config'
import connectToDb from '../db/connectToDb'
import User, { IUser } from '../models/User'

const userService = new User()

connectToDb()

const secret = process.env.JWT_SECRET as string

export interface IPayload {
  id: string
  email: string
}

const sign = (payload: IPayload, expiresIn = '5d') => {
  const options: SignOptions = {
    algorithm: 'HS256',
    expiresIn,
  }

  return jwt.sign(payload, secret, options)
}

const verifyToken = async (req: Request): Promise<IUser | null> => {
  try {
    const token = req.headers.get('Authorization') || ''
    const decoded = jwt.verify(token, secret) as IPayload
    const user = await userService.findById(decoded.id)
    if (!user) throw Error('user not found')
    return { ...user.toJSON(), id: String(user._id) }
  } catch (error) {
    return null
  }
}

export { sign, verifyToken }
