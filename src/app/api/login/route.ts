import md5 from 'md5'
import connectToDb from '../db/connectToDb'
import User from '../models/User'
import { resp, respM } from '../utils/resp'
import { sign } from '../utils/jwt'

const userService = new User()

connectToDb()

export async function POST(req: Request) {
  const body = await req.json()
  if (!body.email || !body.password)
    return respM(400, 'send valids email and password fields')

  const user = await userService.findOne({
    ...body,
    password: md5(body.password),
  })

  if (!user) return respM(404, 'user not found')

  const { _id, email, name, location } = user

  const token = sign({ id: _id, email })

  return resp(200, {
    id: _id,
    email,
    name,
    location,
    token,
  })
}
