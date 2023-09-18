import md5 from 'md5'
import connectToDb from '../db/connectToDb'
import User from '../models/User'
import { resp, respM } from '../utils/resp'
import { userSchema } from '../validations/schema'

const userService = new User()

connectToDb()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { error } = userSchema.validate(body)
    if (error) return respM(400, error.message)
    const newUser = await userService.create({
      ...body,
      password: md5(body.password),
    })
    return resp(201, newUser)
  } catch (error: any) {
    return respM(500, error.message)
  }
}

export async function GET(req: Request) {
  return resp(200, await userService.find())
}
