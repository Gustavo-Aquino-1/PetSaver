import { Params } from '../../comment/[id]/route'
import connectToDb from '../../db/connectToDb'
import Comment from '../../models/Comment'
import Pet from '../../models/Pet'
import { resp, respM } from '../../utils/resp'

const petService = new Pet()
const commentService = new Comment()

connectToDb()

export async function GET(req: Request, { params: { id } }: Params) {
  const pet = await petService.findById(id)
  if (!pet) return respM(404, 'pet not found')

  const comments = await commentService.find({ petId: String(id) })

  return resp(200, { ...pet.toJSON(), comments })
}
