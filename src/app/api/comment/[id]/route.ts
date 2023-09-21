import connectToDb from '../../db/connectToDb'
import Comment from '../../models/Comment'
import Pet from '../../models/Pet'
import { verifyToken } from '../../utils/jwt'
import { resp, respM } from '../../utils/resp'

const petService = new Pet()
const commentService = new Comment()

connectToDb()

export type Params = {
  params: {
    id: string
  }
}

export async function POST(req: Request, { params: { id } }: Params) {
  const decoded = await verifyToken(req)
  if (!decoded) return respM(401, 'unauthorized')

  const body = await req.json()

  if (!body.text || typeof body.text != 'string')
    return respM(400, 'send the field text correctly')

  const pet = await petService.findById(id)
  if (!pet) return respM(404, 'pet not found')

  const newComment = await commentService.create({
    ...body,
    userId: decoded._id,
    petId: id,
  })

  return resp(201, newComment)
}

export async function GET(req: Request, { params: { id } }: Params) {
  return resp(200, await commentService.find({ petId: String(id) }))
}
