import connectToDb from '../db/connectToDb'
import Pet from '../models/Pet'
import User from '../models/User'
import { verifyToken } from '../utils/jwt'
import { resp, respM } from '../utils/resp'
import { petSchema } from '../validations/schema'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dcwse2hbu',
  api_key: '864356754141683',
  api_secret: 'hRPCbx0oEwh84MjYoWRQrx2vbms',
})

const petService = new Pet()

connectToDb()

export async function POST(req: Request) {
  const decoded = await verifyToken(req)
  if (!decoded) return respM(401, 'unauthorized')

  const body = await req.json()
  body.ownerId = decoded.id

  const { error } = petSchema.validate(body)
  if (error) return respM(400, error.message)

  try {
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      transformation: [{ width: 500, height: 500, crop: 'scale' }],
    }
    const { secure_url } = await cloudinary.uploader.upload(body.image, options)
    const newPet = await petService.create({ ...body, image: secure_url })
    return resp(201, newPet)
  } catch (error: any) {
    return respM(500, error.message)
  }
}

export async function GET() {
  return resp(200, await petService.find())
}
